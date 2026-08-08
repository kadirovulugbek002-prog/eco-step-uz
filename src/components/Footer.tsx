import { Link } from "react-router-dom";

export default function Footer() {
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
            Haydovchimisiz? Panelga kirish →
          </Link>
          <div className="text-[13px] text-ink-soft">
            © 2026 · Chiqindini qayta ishlash loyihasi
          </div>
        </div>
      </div>
    </footer>
  );
}