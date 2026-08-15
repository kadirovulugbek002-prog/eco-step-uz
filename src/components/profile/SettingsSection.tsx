import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import { LANG_LABELS } from "../../i18n/translations";
import { logoutUser } from "../../lib/auth";
import LanguageModal from "./LanguageModal";

export default function SettingsSection() {
  const [notifOn, setNotifOn] = useState(true);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logoutUser();
      navigate("/");
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <div>
      <h2 className="mb-3.5 text-[15px] font-bold text-ink">
        {t("settings_title")}
      </h2>
      <div className="overflow-hidden rounded-[14px] border border-line bg-white">
        <button
          onClick={() => setLangModalOpen(true)}
          className="flex w-full items-center justify-between border-b border-line px-4 py-3.5 text-left"
        >
          <span className="text-[14px] font-medium text-ink">
            {t("settings_language")}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] text-ink-soft">
            {LANG_LABELS[lang]}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-3.5 w-3.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>

        <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
          <span className="text-[14px] font-medium text-ink">
            {t("settings_notifications")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={notifOn}
            onClick={() => setNotifOn((v) => !v)}
            className={`h-6 w-11 rounded-full transition-colors ${
              notifOn ? "bg-primary" : "bg-line"
            }`}
          >
            <span
              className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform ${
                notifOn ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <button className="flex w-full items-center justify-between border-b border-line px-4 py-3.5 text-left">
          <span className="text-[14px] font-medium text-ink">
            {t("settings_changeMahalla")}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5 text-ink-soft"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <button className="flex w-full items-center justify-between px-4 py-3.5 text-left">
          <span className="text-[14px] font-medium text-ink">
            {t("settings_help")}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5 text-ink-soft"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="mt-4 w-full rounded-[10px] border border-line py-3 text-[13.5px] font-semibold text-alert transition-colors hover:border-alert disabled:opacity-50"
      >
        {loggingOut ? "Chiqilmoqda..." : t("settings_logout")}
      </button>

      {langModalOpen && (
        <LanguageModal onClose={() => setLangModalOpen(false)} />
      )}
    </div>
  );
}