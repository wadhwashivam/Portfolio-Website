import Link from "next/link";
import { site, nav } from "../data/site";

function monogram(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return `<${initials}/>`;
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[52px] max-w-page items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" aria-label="Home" className="text-[13px] font-semibold tracking-[-0.02em]">
          {monogram(site.name)}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex gap-4 sm:gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[11px] text-mute transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/#contact"
className="hidden border-b border-accent pb-px text-[11px] text-accent transition-colors hover:border-ink hover:text-ink sm:inline"        >
          Get in touch ↗
        </Link>
      </div>
    </header>
  );
}