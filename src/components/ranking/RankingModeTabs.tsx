import type { RankingMode } from "../../types";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  mode: RankingMode;
  onChange: (mode: RankingMode) => void;
}

export default function RankingModeTabs({ mode, onChange }: Props) {
  const { t } = useLanguage();

  return (
    <div className="mb-5 flex rounded-[10px] border border-line bg-white p-1">
      <button
        onClick={() => onChange("umumiy")}
        className={`flex-1 rounded-[7px] py-2 text-[13px] font-semibold transition-colors ${
          mode === "umumiy"
            ? "bg-ink text-white"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        {t("ranking_tabOverall")}
      </button>
      <button
        onClick={() => onChange("osish")}
        className={`flex-1 rounded-[7px] py-2 text-[13px] font-semibold transition-colors ${
          mode === "osish"
            ? "bg-ink text-white"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        {t("ranking_tabGrowth")}
      </button>
    </div>
  );
}