import { containers } from "../../data/content";
import type { OverallStatus } from "../../types";

const STATUS_COLOR: Record<OverallStatus, string> = {
  bosh: "#1F6F4A",
  yarim: "#E8A33D",
  tola: "#C1502E",
};

interface Props {
  collectedIds: Set<string>;
  targetId: string | null;
}

export default function RouteMap({ collectedIds, targetId }: Props) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-line bg-[#EAE8DE]">
      <svg
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <line x1="0" y1="20" x2="100" y2="16" stroke="#D8D3C3" strokeWidth="1.4" />
        <line x1="0" y1="45" x2="100" y2="50" stroke="#D8D3C3" strokeWidth="1.4" />
        <line x1="25" y1="0" x2="20" y2="75" stroke="#D8D3C3" strokeWidth="1.4" />
        <line x1="65" y1="0" x2="70" y2="75" stroke="#D8D3C3" strokeWidth="1.4" />
        <rect x="30" y="30" width="16" height="12" rx="1.5" fill="#DEDBCE" />
        <rect x="52" y="14" width="14" height="10" rx="1.5" fill="#DEDBCE" />
        <rect x="10" y="52" width="14" height="14" rx="1.5" fill="#DEDBCE" />
      </svg>

      {containers.map((c) => {
        const done = collectedIds.has(c.id);
        const isTarget = c.id === targetId;
        return (
          <div
            key={c.id}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            {isTarget && (
              <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#C1502E]/40" />
            )}
            <span
              className={`relative block rounded-full border-2 border-white shadow-md ${
                isTarget ? "h-6 w-6" : "h-4 w-4"
              }`}
              style={{
                backgroundColor: done ? "#B9C2B7" : STATUS_COLOR[c.overallStatus],
              }}
            />
            {isTarget && (
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-white">
                {c.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}