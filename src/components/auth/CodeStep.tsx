import { useEffect, useRef, useState } from "react";
import { verifyOtp, sendOtp } from "../../lib/auth";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  phone: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
}

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function CodeStep({ phone, onSubmit, onBack }: Props) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { t } = useLanguage();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const code = digits.join("");
  const complete = code.length === CODE_LENGTH;

  function updateDigit(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete || loading) return;

    setLoading(true);
    setError("");
    try {
      await verifyOtp(phone, code);
      onSubmit(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kod noto'g'ri yoki muddati o'tgan.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (secondsLeft > 0) return;
    setError("");
    try {
      await sendOtp(phone);
      setSecondsLeft(RESEND_SECONDS);
      setDigits(Array(CODE_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kodni qayta yuborib bo'lmadi.");
    }
  }

  const formattedPhone =
    phone.length === 9
      ? `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 7)} ${phone.slice(7, 9)}`
      : phone;

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 text-[13px] font-semibold text-ink-soft hover:text-ink"
      >
        {t("code_back")}
      </button>

      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        {t("code_title")}
      </h1>
      <p className="mb-7 text-[15px] text-ink-soft">
        {t("code_subtitlePrefix")} {formattedPhone} {t("code_subtitleSuffix")}
      </p>

      <div className="mb-3 flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-14 w-full max-w-[46px] rounded-[10px] border border-line bg-white text-center font-mono text-xl text-ink outline-none focus:border-ink"
          />
        ))}
      </div>

      {error && (
        <p className="mb-4 text-[13px] font-medium text-alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={!complete || loading}
        className="mb-4 w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-35"
      >
        {loading ? "Tekshirilmoqda..." : t("code_submit")}
      </button>

      <button
        type="button"
        onClick={handleResend}
        disabled={secondsLeft > 0}
        className="w-full text-center text-[13px] font-semibold text-primary enabled:hover:text-primary-deep disabled:text-ink-soft"
      >
        {secondsLeft > 0
          ? `${t("code_resend")} (${secondsLeft}s)`
          : t("code_resend")}
      </button>
    </form>
  );
}