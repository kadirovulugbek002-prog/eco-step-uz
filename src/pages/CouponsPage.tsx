import { useMemo, useState } from "react";
import { rewardItems, profileUser } from "../data/content";
import RewardFilter from "../components/rewards/RewardFilter";
import RewardCard from "../components/rewards/RewardCard";
import RedeemSuccessModal from "../components/rewards/RedeemSuccessModal";
import TabBar from "../components/TabBar";
import { useLanguage } from "../context/useLanguage";
import type { RewardCategory, RewardItem } from "../types";

export default function CouponsPage() {
  const [category, setCategory] = useState<RewardCategory | "hammasi">(
    "hammasi"
  );
  const [points, setPoints] = useState(profileUser.points);
  const [redeemed, setRedeemed] = useState<RewardItem | null>(null);
  const { t } = useLanguage();

  const filtered = useMemo(
    () =>
      category === "hammasi"
        ? rewardItems
        : rewardItems.filter((r) => r.category === category),
    [category]
  );

  function handleRedeem(reward: RewardItem) {
    if (points < reward.costPoints) return;
    setPoints((p) => p - reward.costPoints);
    setRedeemed(reward);
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[640px] flex-1 px-6 py-10">
        <h1 className="heading mb-1 text-[24px]">{t("coupons_title")}</h1>
        <p className="mb-5 text-[14px] text-ink-soft">
          {t("coupons_subtitle")}
        </p>

        <div className="mb-6 rounded-[14px] bg-ink px-5 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
            {t("coupons_balance")}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-[28px] font-semibold text-white">
              {points.toLocaleString("uz-UZ")}
            </span>
            <span className="text-[14px] font-semibold text-white/60">
              {t("coupons_pointsSuffix")}
            </span>
          </div>
        </div>

        <RewardFilter active={category} onChange={setCategory} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={points}
              onRedeem={handleRedeem}
            />
          ))}
        </div>
      </div>

      <div className="h-[68px]" />
      <TabBar />

      {redeemed && (
        <RedeemSuccessModal
          reward={redeemed}
          onClose={() => setRedeemed(null)}
        />
      )}
    </div>
  );
}