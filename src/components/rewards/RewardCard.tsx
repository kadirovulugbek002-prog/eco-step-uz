import type { RewardItem } from "../../types";
import { useLanguage } from "../../context/useLanguage";
import type { TranslationKey } from "../../i18n/translations";

interface Props {
  reward: RewardItem;
  userPoints: number;
  onRedeem: (reward: RewardItem) => void;
}

const CATEGORY_KEY: Record<string, TranslationKey> = {
  chegirma: "coupons_tagDiscount",
  transport: "coupons_tagTransport",
  kommunal: "coupons_tagUtility",
  katta: "coupons_tagBig",
};

export default function RewardCard({ reward, userPoints, onRedeem }: Props) {
  const { t } = useLanguage();
  const affordable = userPoints >= reward.costPoints;

  return (
    <div className="flex flex-col rounded-[14px] border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(28,38,32,0.22)]">
      <div className="mb-3 flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-canvas-2 text-xl">
          {reward.emoji}
        </span>
        <span className="rounded-full bg-canvas-2 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
          {t(CATEGORY_KEY[reward.category])}
        </span>
      </div>

      <h3 className="text-[14px] font-bold leading-snug text-ink">
        {reward.name}
      </h3>
      <p className="mt-1 flex-1 text-[12.5px] text-ink-soft">
        {reward.description}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[14px] font-semibold text-primary-deep">
          {reward.costPoints.toLocaleString("uz-UZ")} {t("coupons_pointsSuffix")}
        </span>
        <button
          onClick={() => onRedeem(reward)}
          disabled={!affordable}
          className="rounded-[8px] bg-ink px-3 py-1.5 text-[12.5px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-30"
        >
          {t("coupons_redeemBtn")}
        </button>
      </div>
    </div>
  );
}