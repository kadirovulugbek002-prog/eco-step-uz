import type { MahallaRanking, RankingMode } from "../../types";

interface Props {
  entries: MahallaRanking[];
  mode: RankingMode;
}

export default function RankingList({ entries, mode }: Props) {
  const rest = entries.slice(3);
  const maxValue = Math.max(
    ...entries.map((e) => (mode === "umumiy" ? e.perCapitaKg : e.growthPct))
  );

  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-white">
      {rest.map((m, i) => {
        const value = mode === "umumiy" ? m.perCapitaKg : m.growthPct;
        const widthPct = Math.max(6, (Math.abs(value) / maxValue) * 100);
        return (
          <div
            key={m.id}
            className={`px-4 py-3.5 ${
              i !== rest.length - 1 ? "border-b border-line" : ""
            } ${m.isUser ? "bg-primary/6" : ""}`}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[13px] font-bold text-ink-soft">
                  {String(i + 4).padStart(2, "0")}
                </span>
                <span className="text-[13.5px] font-semibold text-ink">
                  {m.name}
                  {m.isUser && (
                    <span className="ml-1.5 text-[11px] font-normal text-primary">
                      (siz)
                    </span>
                  )}
                </span>
              </div>
              <span className="font-mono text-[13px] text-ink-soft">
                {mode === "umumiy" ? `${value} kg` : `${value > 0 ? "+" : ""}${value}%`}
              </span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-canvas-2">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${widthPct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}