import Image from "next/image";

type Props = { src?: string; alt?: string };

// Fills its parent (the parent must be `relative`). Use a transparent greyscale PNG.
export default function HeroImage({ src, alt = "" }: Props) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label="Image placeholder"
        className="absolute inset-6 flex items-center justify-center border border-dashed border-mute/60 p-4"
      >
        <p className="text-center text-[11px] uppercase tracking-label text-mute">
          Placeholder
          <br />
          your portrait
          <br />
          (transparent PNG)
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      loading="eager"
      fetchPriority="high"
      className="object-contain object-bottom md:origin-bottom md:scale-125"
    />
  );
}