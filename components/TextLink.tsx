// Text-style CTA: grey hairline underline, an ink line draws over it on hover.
// Renders <a> by default; pass as="button" for in-page actions.
type Props = {as?: React.ElementType; href?: string; external?: boolean; icon?: string; className?: string; children: React.ReactNode; download?: boolean;} & React.HTMLAttributes<HTMLElement>;
export default function TextLink({
  as: Tag = 'a',
  href,
  external = false,
  icon = '→',
  className = '',
  children,
  ...rest
}: Props) {
  const linkProps =
    Tag === 'a'
      ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
      : { type: 'button' };

  return (
    <Tag
      {...linkProps}
      {...rest}
      className={`group inline-flex items-center gap-2 text-sm text-ink ${className}`}
    >
      <span className="relative pb-0.5">
        {children}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-0 group-hover:origin-right motion-reduce:transition-none"
        />
      </span>
      {icon && (
        <span
          aria-hidden="true"
          className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          {icon}
        </span>
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </Tag>
  );
}
