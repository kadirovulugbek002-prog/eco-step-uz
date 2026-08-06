import { stats } from "../data/content";

export default function StatsSection() {
  return (
    <section className="py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="mb-11 max-w-[600px]">
          <span className="mb-2.5 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">Nega bu muhim</span>
          <h2 className="heading text-[28px] leading-[1.02] sm:text-[36px] lg:text-[40px]">Raqamlar o'zi gapiradi</h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-8">
              <div className="font-mono text-[38px] font-semibold text-primary-deep">
                {stat.value} <span className="text-xl">{stat.unit}</span>
              </div>
              <div className="mt-2 text-[13.5px] text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}