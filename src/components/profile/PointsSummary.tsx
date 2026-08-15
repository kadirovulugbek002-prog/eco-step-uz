import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import type { DbProfile } from "../../lib/auth";

interface Props {
  profile: DbProfile;
}

export default function PointsSummary({ profile }: Props) {
  const { t } = useLanguage();

  return (
    <div className="rounded-[18px] bg-ink p-6">
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
        {t("profile_balance")}
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-[40px] font-semibold text-white">
          {profile.points.toLocaleString("uz-UZ")}
        </span>
        <span className="text-[15px] font-semibold text-white/60">
          {t("coupons_pointsSuffix")}
        </span>
      </div>

      <div className="mt-5 flex gap-2.5">
        <Link
          to="/kuponlar"
          className="flex-1 rounded-[9px] bg-accent py-3 text-center text-[14px] font-bold text-ink transition-colors hover:bg-[#F0B858]"
        >
          {t("profile_redeemBtn")}
        </Link>
        <Link
          to="/kuponlar"
          className="flex-1 rounded-[9px] border border-white/20 py-3 text-center text-[14px] font-bold text-white transition-colors hover:bg-white/10"
        >
          {t("profile_transferBtn")}
        </Link>
      </div>
    </div>
  );
}