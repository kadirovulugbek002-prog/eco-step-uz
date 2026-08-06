import { wasteCategories, COLOR_HEX } from "../data/content";

export default function CategoriesSection() {
  return (
    <section id="turlar" className="bg-canvas-2 py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="mb-11 max-w-[600px]">
          <span className="mb-2.5 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">6 bo'lim</span>
          <h2 className="heading mb-3.5 text-[28px] leading-[1.02] sm:text-[36px] lg:text-[40px]">Har bir chiqindi — o'z joyida</h2>
          <p className="text-base text-ink-soft">Konteyner rasm va yozuv bilan belgilangan, adashish qiyin.</p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {wasteCategories.map((cat) => {
            const hex = COLOR_HEX[cat.colorVar];
            return (
              <div key={cat.id} className="flex flex-col gap-3.5 rounded-[14px] border border-line bg-white p-[22px] transition-all hover:-translate-y-[3px] hover:border-ink">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px]" style={{ backgroundColor: `${hex}29` }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={hex} strokeWidth={2} className="h-[22px] w-[22px]">
                    <path d={cat.iconPath} />
                  </svg>
                </div>
                <h3 className="text-[17px] font-bold normal-case tracking-normal text-ink">{cat.name}</h3>
                <p className="text-[13.5px] text-ink-soft">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}