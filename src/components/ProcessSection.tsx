import { processSteps } from "../data/content";

export default function ProcessSection() {
  return (
    <section id="qanday" className="border-t border-line py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="mb-11 max-w-[600px]">
          <span className="mb-2.5 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">Jarayon</span>
          <h2 className="heading mb-3.5 text-[28px] leading-[1.02] sm:text-[36px] lg:text-[40px]">Uch qadam, aniq natija</h2>
          <p className="text-base text-ink-soft">Murakkab emas — chiqindini tashlaysiz, tizim qolganini qiladi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <div key={step.num} className={`p-7 ${i < processSteps.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""} border-line`}>
              <div className="mb-3.5 font-mono text-[13px] font-bold text-primary">{step.num}</div>
              <h3 className="mb-2.5 text-[22px] font-bold normal-case tracking-normal text-ink">{step.title}</h3>
              <p className="text-[14.5px] text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}