import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-7">
        <div className="heading flex items-center gap-2.5 text-xl">
          <span className="relative h-[30px] w-[30px] flex-none rounded-[7px] bg-primary">
            <span className="absolute left-2 top-[9px] h-[3px] w-3.5 bg-accent" />
            <span className="absolute left-2 top-4 h-[3px] w-2 bg-accent" />
          </span>
          Toza Mahalla
        </div>

        <div className="hidden gap-8 text-sm font-semibold text-ink-soft md:flex">
          <a href="#qanday" className="hover:text-primary-deep">Qanday ishlaydi</a>
          <a href="#turlar" className="hover:text-primary-deep">Chiqindi turlari</a>
          <a href="#reyting" className="hover:text-primary-deep">Mahalla reytingi</a>
        </div>

        <Link
          to="/auth"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep"
        >
          Mahallamni qo'shish
        </Link>
      </div>
    </nav>
  );
}