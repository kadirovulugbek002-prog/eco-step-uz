import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import { supabase } from "../lib/supabaseClient";

export default function CtaSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  async function handleJoinMahalla() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Foydalanuvchi allaqachon ro'yxatdan o'tgan
      navigate("/profil");
    } else {
      // Foydalanuvchi hali ro'yxatdan o'tmagan
      navigate("/royxat");
    }
  }

  return (
    <section id="boshlash" className="py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="rounded-3xl bg-ink px-11 py-14 text-center">
          <h2 className="heading mb-3.5 text-[28px] text-white sm:text-[36px] lg:text-[42px]">
            {t("cta_title")}
          </h2>

          <p className="mx-auto mb-[30px] max-w-[480px] text-base text-[#B9C2B7]">
            {t("cta_subtitle")}
          </p>

          <button
            type="button"
            onClick={handleJoinMahalla}
            className="inline-block rounded-[9px] bg-accent px-[26px] py-[15px] text-[15px] font-bold text-ink transition-colors hover:bg-[#F0B858]"
          >
            {t("cta_button")}
          </button>
        </div>
      </div>
    </section>
  );
}