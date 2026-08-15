import { containers } from "../../data/content";
import { useLanguage } from "../../context/useLanguage";
import type { OverallStatus } from "../../types";
import type { TranslationKey } from "../../i18n/translations";

const STATUS_KEY: Record<OverallStatus, TranslationKey> = {
  bosh: "status_bosh",
  yarim: "status_yarim",
  tola: "status_tola",
};

const STATUS_CLASSES: Record<OverallStatus, string> = {
  bosh: "text-[#1F6F4A] bg-primary/12",
  yarim: "text-accent bg-accent/14",
  tola: "text-[#C1502E] bg-[#C1502E]/12",
};

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ContainerList({ selectedId, onSelect }: Props) {
  const { t } = useLanguage();
  const sorted = [...containers].sort((a, b) => a.distanceM - b.distanceM);

  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-white">
      {sorted.map((c, i) => {
        const active = c.id === selectedId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors ${
              i !== sorted.length - 1 ? "border-b border-line" : ""
            } ${active ? "bg-canvas-2" : "hover:bg-canvas-2"}`}
          >
            <div>
              <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
              <p className="mt-0.5 text-[12px] text-ink-soft">
                {c.distanceM} {t("map_distanceSuffix")}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold ${STATUS_CLASSES[c.overallStatus]}`}
            >
              {t(STATUS_KEY[c.overallStatus])}
            </span>
          </button>
        );
      })}
    </div>
  );
}