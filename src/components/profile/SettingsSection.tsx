import { useState } from "react";
import { settingsItems } from "../../data/content";

export default function SettingsSection() {
  const [notifOn, setNotifOn] = useState(true);

  return (
    <div>
      <h2 className="mb-3.5 text-[15px] font-bold text-ink">Sozlamalar</h2>
      <div className="overflow-hidden rounded-[14px] border border-line bg-white">
        {settingsItems.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-center justify-between px-4 py-3.5 ${
              i !== settingsItems.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <span className="text-[14px] font-medium text-ink">
              {item.label}
            </span>

            {item.type === "link" && (
              <span className="flex items-center gap-1.5 text-[13px] text-ink-soft">
                {item.value}
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
            )}

            {item.type === "toggle" && (
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
            )}
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-[10px] border border-line py-3 text-[13.5px] font-semibold text-alert transition-colors hover:border-alert">
        Hisobdan chiqish
      </button>
    </div>
  );
}