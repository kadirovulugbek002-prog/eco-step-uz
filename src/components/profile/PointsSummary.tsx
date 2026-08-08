import { Link } from "react-router-dom";
import { profileUser } from "../../data/content";

export default function PointsSummary() {
  return (
    <div className="rounded-[18px] bg-ink p-6">
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
        Joriy balans
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-[40px] font-semibold text-white">
          {profileUser.points.toLocaleString("uz-UZ")}
        </span>
        <span className="text-[15px] font-semibold text-white/60">ball</span>
      </div>
      <p className="mt-1 text-[13px] text-white/50">
        Mahallada #{profileUser.rankInMahalla}-o'rindasiz
      </p>

      <div className="mt-5 flex gap-2.5">
        <Link
          to="/kuponlar"
          className="flex-1 rounded-[9px] bg-accent py-3 text-center text-[14px] font-bold text-ink transition-colors hover:bg-[#F0B858]"
        >
          Kuponga almashtirish
        </Link>
        <Link
          to="/kuponlar"
          className="flex-1 rounded-[9px] border border-white/20 py-3 text-center text-[14px] font-bold text-white transition-colors hover:bg-white/10"
        >
          To'lovga o'tkazish
        </Link>
      </div>
    </div>
  );
}