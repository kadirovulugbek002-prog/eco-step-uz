import { Link } from "react-router-dom";
import SensorPanel from "./SensorPanel";

export default function Hero() {
  return (
    <header className="overflow-hidden pt-[88px] pb-[60px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-14 px-7 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary-deep">
            <span className="h-[7px] w-[7px] animate-pulse-soft rounded-full bg-accent" />
            Mahalla uchun aqlli tizim
          </div>

          <h1 className="heading mb-5 text-[38px] leading-[0.98] sm:text-[48px] lg:text-[64px]">
            Chiqindi<br />
            qayerga tushishi<br />
            <span className="text-primary">o'zi biladi.</span>
          </h1>

          <p className="mb-8 max-w-[480px] text-[17px] text-ink-soft">
            Har bir mahallada — 6 turga ajratilgan, holatini o'zi bildiradigan konteyner. Siz saralaysiz, tizim sanaydi, mahallangiz g'olib chiqadi.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <a href="#qanday" className="rounded-[9px] bg-ink px-[26px] py-[15px] text-[15px] font-bold text-white transition-all hover:-translate-y-px hover:bg-primary-deep">
              Qanday ishlashini ko'rish
            </a>
            <Link
              to="/auth"
              className="rounded-[9px] border-[1.5px] border-line px-[26px] py-[15px] text-[15px] font-bold text-ink transition-colors hover:border-ink"
            >
              Mahallamni qo'shish
            </Link>
          </div>
        </div>

        <SensorPanel />
      </div>
    </header>
  );
}