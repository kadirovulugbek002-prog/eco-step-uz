import { Link, useParams, Navigate } from "react-router-dom";
import { wasteCategories, COLOR_HEX } from "../data/content";
import { useLanguage } from "../context/useLanguage";

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const category = wasteCategories.find((c) => c.id === id);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const hex = COLOR_HEX[category.colorVar];

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto w-full max-w-[640px] px-6 py-10">
        <Link
          to="/#turlar"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Chiqindi turlariga qaytish
        </Link>

        <div className="mb-6 flex items-center gap-4">
          <div
            className="flex h-16 w-16 flex-none items-center justify-center rounded-[16px]"
            style={{ backgroundColor: `${hex}29` }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={hex} strokeWidth={2} className="h-8 w-8">
              <path d={category.iconPath} />
            </svg>
          </div>
          <div>
            <h1 className="heading text-[28px] leading-none">{category.name}</h1>
            <p className="mt-1.5 text-[14px] text-ink-soft">{category.description}</p>
          </div>
        </div>

        <div className="mb-5 rounded-[16px] bg-ink p-6">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
            Har kilogramm uchun
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-[36px] font-semibold text-white">
              {category.pointsPerKg}
            </span>
            <span className="text-[15px] font-semibold text-white/60">
              {t("coupons_pointsSuffix")} / kg
            </span>
          </div>
          <p className="mt-2 text-[13px] text-white/60">
            Masalan, 10 kg {category.name.toLowerCase()} topshirsangiz —{" "}
            <span className="font-semibold text-white">
              {category.pointsPerKg * 10} ball
            </span>{" "}
            ishlab olasiz.
          </p>
        </div>

        <h2 className="mb-3.5 text-[15px] font-bold text-ink">
          Necha kilo yig'sangiz, nimalarga yetadi?
        </h2>
        <div className="mb-5 overflow-hidden rounded-[14px] border border-line bg-white">
          {category.milestones.map((m, i) => (
            <div
              key={m.kg}
              className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
                i !== category.milestones.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full font-mono text-[12px] font-bold text-white"
                  style={{ backgroundColor: hex }}
                >
                  {m.kg}
                </div>
                <span className="text-[13.5px] text-ink-soft">kg</span>
              </div>
              <span className="text-right text-[13.5px] font-semibold text-ink">
                {m.reward}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-[14px] border border-line bg-white p-4">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-primary">
            Bilasizmi?
          </p>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            {category.funFact}
          </p>
        </div>

        <Link
          to="/royxat"
          className="block w-full rounded-[10px] bg-ink py-3.5 text-center text-[15px] font-bold text-white transition-colors hover:bg-primary-deep"
        >
          {t("hero_btnJoin")}
        </Link>
      </div>
    </div>
  );
}