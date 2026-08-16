import type { ContainerLocation, OverallStatus } from "../../types";

const STATUS_COLOR: Record<OverallStatus, string> = {
  bosh: "#1F6F4A",
  yarim: "#E8A33D",
  tola: "#C1502E",
};

interface Props {
  containers: ContainerLocation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function NeighborhoodMap({ containers, selectedId, onSelect }: Props) {
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
      </svg>

      {containers.map((c) => {
        const active = c.id === selectedId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            aria-label={c.name}
          >
            <span
              className={`block rounded-full border-2 border-white shadow-md transition-all ${
                active ? "h-6 w-6" : "h-4 w-4"
              }`}
              style={{ backgroundColor: STATUS_COLOR[c.overallStatus] }}
            />
            {active && (
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-white">
                {c.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}