import { COLOR_HEX } from "../../data/content";
import type { ContainerLocation } from "../../types";

const STATUS_LABEL: Record<string, { label: string; classes: string }> = {
  bosh: { label: "Bo'sh", classes: "text-[#1F6F4A] bg-primary/12" },
  yarim: { label: "Yarim", classes: "text-accent bg-accent/14" },
  tola: { label: "To'la", classes: "text-[#C1502E] bg-[#C1502E]/12" },
};

interface Props {
  container: ContainerLocation;
}

export default function ContainerDetailCard({ container }: Props) {
  const overall = STATUS_LABEL[container.overallStatus];

  return (
    <div className="rounded-[16px] border border-line bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-ink">{container.name}</h3>
          <p className="mt-0.5 text-[13px] text-ink-soft">
            {container.distanceM} m masofada
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold ${overall.classes}`}
        >
          {overall.label}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {container.bins.map((bin) => {
          const hex = COLOR_HEX[bin.colorVar];
          return (
            <div key={bin.id} className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 flex-none rounded-[3px]"
                style={{ backgroundColor: hex }}
              />
              <span className="w-16 flex-none text-[12.5px] font-medium text-ink">
                {bin.name}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas-2">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${bin.levelPct}%`, backgroundColor: hex }}
                />
              </div>
              <span className="w-9 flex-none text-right font-mono text-[11.5px] text-ink-soft">
                {bin.levelPct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}