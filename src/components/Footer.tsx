import { Link } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-7">
        <div className="heading flex items-center gap-2.5 text-base">
          <span className="h-[22px] w-[22px] rounded-[7px] bg-primary" />
          Toza Mahalla
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/haydovchi"
            className="text-[12.5px] font-semibold text-ink-soft hover:text-ink"
          >
            {t("footer_driverLink")}
          </Link>
          <div className="text-[13px] text-ink-soft">
            {t("footer_copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}