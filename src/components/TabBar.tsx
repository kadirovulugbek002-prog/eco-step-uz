import { Link, useLocation } from "react-router-dom";

const TABS = [
  { path: "/", label: "Bosh sahifa" },
  { path: "/profil", label: "Profil" },
];

export default function TabBar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1120px] justify-center gap-8 px-7 py-3">
        {TABS.map((tab) => {
          const active = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`text-[13px] font-semibold ${
                active ? "text-primary-deep" : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}