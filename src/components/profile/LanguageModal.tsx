import { LANG_LABELS } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  onClose: () => void;
}

const LANGS: Lang[] = ["uz", "ru", "en"];

export default function LanguageModal({ onClose }: Props) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="w-full max-w-[340px] rounded-2xl bg-white p-6">
        <h2 className="heading mb-4 text-[18px]">
          {t("settings_chooseLanguage")}
        </h2>

        <div className="mb-5 flex flex-col gap-2">
          {LANGS.map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex items-center justify-between rounded-[10px] border px-4 py-3 text-[14px] font-semibold transition-colors ${
                lang === code
                  ? "border-ink bg-canvas-2 text-ink"
                  : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {LANG_LABELS[code]}
              {lang === code && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="h-4 w-4"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-[9px] bg-ink py-3 text-[14px] font-bold text-white transition-colors hover:bg-primary-deep"
        >
          {t("settings_done")}
        </button>
      </div>
    </div>
  );
}