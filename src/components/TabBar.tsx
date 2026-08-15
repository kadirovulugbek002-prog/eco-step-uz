import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";

export default function TabBar() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const TABS = [
    { path: "/", label: t("tab_home") },
    { path: "/xarita", label: t("tab_map") },
    { path: "/reyting", label: t("tab_ranking") },
    { path: "/profil", label: t("tab_profile") },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-sm">
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