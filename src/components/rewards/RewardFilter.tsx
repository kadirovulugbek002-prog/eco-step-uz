import type { RewardCategory } from "../../types";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  active: RewardCategory | "hammasi";
  onChange: (value: RewardCategory | "hammasi") => void;
}

export default function RewardFilter({ active, onChange }: Props) {
  const { t } = useLanguage();

  const options: Array<{ id: RewardCategory | "hammasi"; label: string }> = [
    { id: "hammasi", label: t("coupons_filterAll") },
    { id: "chegirma", label: t("coupons_filterDiscount") },
    { id: "transport", label: t("coupons_filterTransport") },
    { id: "kommunal", label: t("coupons_filterUtility") },
    { id: "katta", label: t("coupons_filterBig") },
  ];

  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex-none rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
            active === opt.id
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-ink-soft hover:border-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}