import { Link, useNavigate } from "react-router-dom";
import SensorPanel from "./SensorPanel";
import { useLanguage } from "../context/useLanguage";
import { supabase } from "../lib/supabaseClient";

export default function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  async function handleJoinMahalla() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Foydalanuvchi ro'yxatdan o'tgan
      navigate("/profil");
    } else {
      // Foydalanuvchi ro'yxatdan o'tmagan
      navigate("/royxat");
    }
  }

  return (
    <header className="overflow-hidden pt-[88px] pb-[60px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-14 px-7 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary-deep">
            <span className="h-[7px] w-[7px] animate-pulse-soft rounded-full bg-accent" />
            {t("hero_eyebrow")}
          </div>

          <h1 className="heading mb-5 text-[38px] leading-[0.98] sm:text-[48px] lg:text-[64px]">
            {t("hero_title1")}
            <br />
            {t("hero_title2")}
            <br />
            <span className="text-primary">
              {t("hero_title3")}
            </span>
          </h1>

          <p className="mb-8 max-w-[480px] text-[17px] text-ink-soft">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-wrap gap-3.5">
            <a
              href="#qanday"
              className="rounded-[9px] bg-ink px-[26px] py-[15px] text-[15px] font-bold text-white transition-all hover:-translate-y-px hover:bg-primary-deep"
            >
              {t("hero_btnHow")}
            </a>

            <button
              type="button"
              onClick={handleJoinMahalla}
              className="rounded-[9px] border-[1.5px] border-line px-[26px] py-[15px] text-[15px] font-bold text-ink transition-colors hover:border-ink"
            >
              {t("hero_btnJoin")}
            </button>
          </div>
        </div>

        <SensorPanel />
      </div>
    </header>
  );
}