import { useMemo, useState } from "react";
import { mahallaRankings } from "../data/content";
import RankingModeTabs from "../components/ranking/RankingModeTabs";
import PodiumTop3 from "../components/ranking/PodiumTop3";
import RankingList from "../components/ranking/RankingList";
import TabBar from "../components/TabBar";
import { useLanguage } from "../context/useLanguage";
import type { RankingMode } from "../types";

export default function RankingPage() {
  const [mode, setMode] = useState<RankingMode>("umumiy");
  const { t } = useLanguage();

  const sorted = useMemo(() => {
    const copy = [...mahallaRankings];
    copy.sort((a, b) =>
      mode === "umumiy"
        ? b.perCapitaKg - a.perCapitaKg
        : b.growthPct - a.growthPct
    );
    return copy;
  }, [mode]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[560px] flex-1 px-6 py-10">
        <h1 className="heading mb-1 text-[24px]">{t("ranking_title")}</h1>
        <p className="mb-6 text-[14px] text-ink-soft">
          {t("ranking_subtitle")}
        </p>

        <RankingModeTabs mode={mode} onChange={setMode} />

        <PodiumTop3 entries={sorted} mode={mode} />

        <div className="mt-3">
          <RankingList entries={sorted} mode={mode} />
        </div>

        <div className="mt-5 rounded-[12px] border border-line bg-white p-4">
          <p className="text-[12.5px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">
              {t("ranking_noteTitle")}
            </span>{" "}
            {t("ranking_noteBody")}
          </p>
        </div>
      </div>

      <div className="h-[68px]" />
      <TabBar />
    </div>
  );
}