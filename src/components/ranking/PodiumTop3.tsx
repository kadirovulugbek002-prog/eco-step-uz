import type { MahallaRanking, RankingMode } from "../../types";

interface Props {
  entries: MahallaRanking[];
  mode: RankingMode;
}

const MEDAL = ["#E8A33D", "#B9C2B7", "#C7A96B"];

export default function PodiumTop3({ entries, mode }: Props) {
  const top3 = entries.slice(0, 3);

  return (
    <div className="grid grid-cols-3 gap-3">
      {top3.map((m, i) => (
        <div
          key={m.id}
          className={`flex flex-col items-center rounded-[14px] border p-4 text-center ${
            m.isUser
              ? "border-primary bg-primary/6"
              : "border-line bg-white"
          }`}
        >
          <div
            className="mb-2 flex h-9 w-9 items-center justify-center rounded-full font-mono text-[13px] font-bold text-white"
            style={{ backgroundColor: MEDAL[i] }}
          >
            {i + 1}
          </div>
          <p className="text-[13px] font-bold leading-tight text-ink">
            {m.name}
          </p>
          <p className="mt-1 font-mono text-[15px] font-semibold text-primary-deep">
            {mode === "umumiy" ? `${m.perCapitaKg} kg` : `+${m.growthPct}%`}
          </p>
        </div>
      ))}
    </div>
  );
}