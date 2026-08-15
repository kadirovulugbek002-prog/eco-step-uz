import type { RewardItem } from "../../types";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  reward: RewardItem;
  onClose: () => void;
}

export default function RedeemSuccessModal({ reward, onClose }: Props) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="w-full max-w-[360px] rounded-2xl bg-white p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-2xl">
          {reward.emoji}
        </div>
        <h2 className="heading mb-1.5 text-[20px]">{t("coupons_modalTitle")}</h2>
        <p className="mb-6 text-[14px] text-ink-soft">
          <span className="font-semibold text-ink">{reward.name}</span>{" "}
          {t("coupons_modalBodySuffix")}{" "}
          {reward.costPoints.toLocaleString("uz-UZ")} {t("coupons_modalBodyEnd")}
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-[9px] bg-ink py-3 text-[14px] font-bold text-white transition-colors hover:bg-primary-deep"
        >
          {t("coupons_modalClose")}
        </button>
      </div>
    </div>
  );
}