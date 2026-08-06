import { useEffect, useRef, useState } from "react";

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
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (complete) onSubmit(code);
  }

  function handleResend() {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 text-[13px] font-semibold text-ink-soft hover:text-ink"
      >
        ← Raqamni o'zgartirish
      </button>

      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        Kodni kiriting
      </h1>
      <p className="mb-7 text-[15px] text-ink-soft">
        +998 {phone.length === 9
          ? `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 7)} ${phone.slice(7, 9)}`
          : phone}{" "}
        raqamiga 6 xonali kod yuborildi.
      </p>

      <div className="mb-7 flex justify-between gap-2">
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

      <button
        type="submit"
        disabled={!complete}
        className="mb-4 w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-35"
      >
        Tasdiqlash
      </button>

      <button
        type="button"
        onClick={handleResend}
        disabled={secondsLeft > 0}
        className="w-full text-center text-[13px] font-semibold text-primary enabled:hover:text-primary-deep disabled:text-ink-soft"
      >
        {secondsLeft > 0
          ? `Kodni qayta yuborish (${secondsLeft}s)`
          : "Kodni qayta yuborish"}
      </button>
    </form>
  );
}