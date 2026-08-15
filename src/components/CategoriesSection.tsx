import { Link } from "react-router-dom";
import { wasteCategories, COLOR_HEX } from "../data/content";
import { useLanguage } from "../context/useLanguage";

export default function CategoriesSection() {
  const { t } = useLanguage();

  return (
    <section id="turlar" className="bg-canvas-2 py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="mb-11 max-w-[600px]">
          <span className="mb-2.5 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {t("categories_label")}
          </span>
          <h2 className="heading mb-3.5 text-[28px] leading-[1.02] sm:text-[36px] lg:text-[40px]">
            {t("categories_title")}
          </h2>
          <p className="text-base text-ink-soft">{t("categories_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {wasteCategories.map((cat) => {
            const hex = COLOR_HEX[cat.colorVar];
            return (
              <Link
                key={cat.id}
                to={`/turlar/${cat.id}`}
                className="flex flex-col gap-3.5 rounded-[14px] border border-line bg-white p-[22px] transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_16px_32px_-16px_rgba(28,38,32,0.22)]"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: `${hex}29` }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={hex}
                    strokeWidth={2}
                    className="h-[22px] w-[22px]"
                  >
                    <path d={cat.iconPath} />
                  </svg>
                </div>
                <h3 className="text-[17px] font-bold normal-case tracking-normal text-ink">
                  {cat.name}
                </h3>
                <p className="text-[13.5px] text-ink-soft">
                  {cat.description}
                </p>
                <span className="mt-auto flex items-center gap-1 pt-1 text-[12.5px] font-semibold text-primary">
                  Batafsil
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="h-3.5 w-3.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}