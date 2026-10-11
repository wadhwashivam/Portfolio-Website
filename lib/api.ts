export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot, must stay empty for real users
};

export async function submitContact(payload: ContactPayload): Promise<{ ok: true }> {
  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Couldn’t reach the server. Check your connection and try again.");
  }

  const data = (await res.json().catch(() => null)) as { message?: string } | null;

  if (!res.ok) {
    throw new Error(data?.message ?? "Something went wrong. Please try again.");
  }
  return { ok: true };
}