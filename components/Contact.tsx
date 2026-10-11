import { links } from '../data/site';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import TextLink from './TextLink';
import ContactForm from './ContactForm';

const channels = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}` },
  { label: 'GitHub', value: links.github.replace(/^https?:\/\//, ''), href: links.github, external: true },
  { label: 'LinkedIn', value: links.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: links.linkedin, external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <SectionHeader index="03" id="contact-title" title="Contact" />
        <div className="mt-12 grid gap-14 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5 md:col-start-2">
            <p className="text-3xl font-light italic tracking-tighter md:text-4xl">
              Have a project or a role in mind? Write to me.
            </p>
            <ul className="mt-10 border-t border-line">
              {channels.map((c) => (
                <li key={c.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3">
                  <span className="text-mute">{c.label}</span>
                  <TextLink href={c.href} external={c.external} icon={c.external ? '↗' : '→'} className="break-all">
                    {c.value}
                  </TextLink>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink href={links.resume} download icon="↓">Download resume (PDF)</TextLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5 md:col-start-8">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
