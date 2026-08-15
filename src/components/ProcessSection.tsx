import { useLanguage } from "../context/useLanguage";

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    { num: "01", title: t("process_step1_title"), description: t("process_step1_desc") },
    { num: "02", title: t("process_step2_title"), description: t("process_step2_desc") },
    { num: "03", title: t("process_step3_title"), description: t("process_step3_desc") },
  ];

  return (
    <section id="qanday" className="border-t border-line py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="mb-11 max-w-[600px]">
          <span className="mb-2.5 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {t("process_label")}
          </span>
          <h2 className="heading mb-3.5 text-[28px] leading-[1.02] sm:text-[36px] lg:text-[40px]">
            {t("process_title")}
          </h2>
          <p className="text-base text-ink-soft">{t("process_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`p-7 ${
                i < steps.length - 1
                  ? "border-b border-line md:border-b-0 md:border-r"
                  : ""
              } border-line`}
            >
              <div className="mb-3.5 font-mono text-[13px] font-bold text-primary">
                {step.num}
              </div>
              <h3 className="mb-2.5 text-[22px] font-bold normal-case tracking-normal text-ink">
                {step.title}
              </h3>
              <p className="text-[14.5px] text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}