import type { RewardCategory } from "../../types";

interface Props {
  active: RewardCategory | "hammasi";
  onChange: (value: RewardCategory | "hammasi") => void;
}

const OPTIONS: Array<{ id: RewardCategory | "hammasi"; label: string }> = [
  { id: "hammasi", label: "Barchasi" },
  { id: "chegirma", label: "Chegirmalar" },
  { id: "transport", label: "Transport" },
  { id: "kommunal", label: "Kommunal" },
  { id: "katta", label: "Katta sovg'alar" },
];

export default function RewardFilter({ active, onChange }: Props) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex-none rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
            active === opt.id
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-ink-soft hover:border-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}