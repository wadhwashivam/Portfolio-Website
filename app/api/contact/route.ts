import { Resend } from "resend";
import { z } from "zod";

// ---- Validation ------------------------------------------------------------

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Name is too long (100 characters max)."),
  email: z
    .string()
    .trim()
    .max(254, "Email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short (10 characters min).")
    .max(5000, "Message is too long (5000 characters max)."),
  // Honeypot: hidden in the form, real people never fill it in.
  website: z.string().optional(),
});

// ---- Best-effort rate limiting ---------------------------------------------
// In-memory, so it resets on cold starts and isn't shared across serverless
// instances. It only slows down bursts; it is not real protection.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SENDS_PER_WINDOW = 5;
const sends = new Map<string, number[]>();

function recentSends(ip: string): number[] {
  const now = Date.now();
  const recent = (sends.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length > 0) sends.set(ip, recent);
  else sends.delete(ip);
  return recent;
}

function isRateLimited(ip: string): boolean {
  return recentSends(ip).length >= MAX_SENDS_PER_WINDOW;
}

function recordSend(ip: string): void {
  sends.set(ip, [...recentSends(ip), Date.now()]);
}

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

// ---- Route -----------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const ip = getIp(request);

    if (isRateLimited(ip)) {
      return Response.json(
        { message: "Too many messages. Please try again later." },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ message: "Invalid request." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { message: parsed.error.issues[0]?.message ?? "Invalid input." },
        { status: 400 },
      );
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot filled: pretend it worked so the bot learns nothing.
    if (website && website.trim() !== "") {
      return Response.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      console.error("Contact route: missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
      return Response.json(
        { message: "Something went wrong. Please try again later." },
        { status: 500 },
      );
    }

    // Count this attempt before sending, so failed sends can't be spammed either.
    recordSend(ip);

    // Strip line breaks so the name can't inject extra headers into the subject.
    const safeName = name.replace(/[\r\n]+/g, " ");

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio contact <${from}>`,
      to,
      replyTo: email,
      subject: `New message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { message: "Something went wrong. Please try again later." },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return Response.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}