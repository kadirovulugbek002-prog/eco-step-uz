import type { ContainerLocation, OverallStatus } from "../../types";
import type { TranslationKey } from "../../i18n/translations";
import { useLanguage } from "../../context/useLanguage";

const STATUS_KEY: Record<OverallStatus, TranslationKey> = {
  tola: "status_tola",
  yarim: "status_yarim",
  bosh: "status_bosh",
};

const STATUS_CLASSES: Record<OverallStatus, string> = {
  tola: "text-[#C1502E] bg-[#C1502E]/12",
  yarim: "text-accent bg-accent/14",
  bosh: "text-[#1F6F4A] bg-primary/12",
};

interface Props {
  ordered: ContainerLocation[];
  collectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export default function TaskQueue({ ordered, collectedIds, onToggle }: Props) {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-white">
      {ordered.map((c, i) => {
        const done = collectedIds.has(c.id);
        return (
          <div
            key={c.id}
            className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
              i !== ordered.length - 1 ? "border-b border-line" : ""
            } ${done ? "opacity-50" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 flex-none font-mono text-[13px] font-bold text-ink-soft">
                {i + 1}
              </span>
              <div>
                <p
                  className={`text-[13.5px] font-semibold text-ink ${
                    done ? "line-through" : ""
                  }`}
                >
                  {c.name}
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${STATUS_CLASSES[c.overallStatus]}`}
                  >
                    {t(STATUS_KEY[c.overallStatus])}
                  </span>
                  <span className="text-[11.5px] text-ink-soft">
                    {c.distanceM} m
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggle(c.id)}
              className={`flex-none rounded-[8px] px-3 py-1.5 text-[12.5px] font-bold transition-colors ${
                done
                  ? "border border-line text-ink-soft hover:border-ink"
                  : "bg-ink text-white hover:bg-primary-deep"
              }`}
            >
              {done ? t("driver_undoBtn") : t("driver_collectBtn")}
            </button>
          </div>
        );
      })}
    </div>
  );
}