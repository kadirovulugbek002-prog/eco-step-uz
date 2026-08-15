import { useState } from "react";
import { formatUzPhone, isValidUzPhone } from "../../utils/phone";
import { sendOtp } from "../../lib/auth";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  onSubmit: (phone: string) => void;
}

export default function PhoneStep({ onSubmit }: Props) {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const valid = isValidUzPhone(raw);
  const { t } = useLanguage();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRaw(e.target.value.replace(/\D/g, "").slice(0, 9));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;

    setLoading(true);
    setError("");
    try {
      await sendOtp(raw);
      onSubmit(raw);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kod yuborishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        {t("phone_title")}
      </h1>
      <p className="mb-7 text-[15px] text-ink-soft">{t("phone_subtitle")}</p>

      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        {t("phone_label")}
      </label>
      <div className="mb-3 flex items-center rounded-[10px] border border-line bg-white focus-within:border-ink">
        <span className="border-r border-line px-4 py-3.5 font-mono text-[15px] text-ink-soft">
          +998
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoFocus
          placeholder="90 123 45 67"
          value={formatUzPhone(raw)}
          onChange={handleChange}
          className="w-full bg-transparent px-4 py-3.5 font-mono text-[15px] text-ink outline-none placeholder:text-line"
        />
      </div>

      {error && (
        <p className="mb-4 text-[13px] font-medium text-alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={!valid || loading}
        className="w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-35"
      >
        {loading ? "Yuborilmoqda..." : t("phone_submit")}
      </button>
    </form>
  );
}