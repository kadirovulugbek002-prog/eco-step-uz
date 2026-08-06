import { useState } from "react";
import { formatUzPhone, isValidUzPhone } from "../../utils/phone";

interface Props {
  onSubmit: (phone: string) => void;
}

export default function PhoneStep({ onSubmit }: Props) {
  const [raw, setRaw] = useState("");
  const valid = isValidUzPhone(raw);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRaw(e.target.value.replace(/\D/g, "").slice(0, 9));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (valid) onSubmit(raw);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        Telefon raqamingiz
      </h1>
      <p className="mb-7 text-[15px] text-ink-soft">
        Tasdiqlash kodi shu raqamga SMS orqali yuboriladi.
      </p>

      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        Telefon raqam
      </label>
      <div className="mb-7 flex items-center rounded-[10px] border border-line bg-white focus-within:border-ink">
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

      <button
        type="submit"
        disabled={!valid}
        className="w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-35"
      >
        Kod yuborish
      </button>
    </form>
  );
}