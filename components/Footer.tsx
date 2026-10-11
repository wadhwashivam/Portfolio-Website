import Link from "next/link";
import { links, nav } from "../data/site";

const linkClass = "text-[11px] text-dim transition-colors hover:text-paper focus-visible:outline-paper";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-page flex-wrap items-end justify-between gap-6 px-5 py-10 md:px-8">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${links.email}`}
          className="break-all text-[clamp(24px,4vw,40px)] font-light tracking-[-0.03em] transition-colors hover:text-dim focus-visible:outline-paper"
        >
          {links.email}
        </a>
      </div>
    </footer>
  );
}