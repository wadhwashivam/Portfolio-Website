import Reveal from './Reveal';

type Props = {index :string; id: string; title: string; note?: string};

export default function SectionHeader({ index, title, id, note }: Props) {
  return (
    <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex items-baseline gap-4">
        <span className="text-xs tabular-nums text-mute">{index}</span>
        <h2 id={id} className="text-4xl font-light italic tracking-tightest md:text-6xl">
          {title}
        </h2>
      </div>
      {note && <p className="max-w-xs text-xs text-mute md:text-right">{note}</p>}
    </Reveal>
  );
}
