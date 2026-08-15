import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  name?: string;
}

export default function SuccessStep({ name }: Props) {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/12">
        <svg viewBox="0 0 24 24" fill="none" stroke="#1F6F4A" strokeWidth={2.5} className="h-6 w-6">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        {name ? `${t("success_welcomePrefix")} ${name.split(" ")[0]}!` : t("success_verifiedTitle")}
      </h1>
      <p className="mb-7 text-[15px] text-ink-soft">
        {name ? t("success_registeredDesc") : t("success_verifiedDesc")}
      </p>

      <Link
        to="/profil"
        className="block w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-primary-deep"
      >
        {t("success_continue")}
      </Link>
    </div>
  );
}