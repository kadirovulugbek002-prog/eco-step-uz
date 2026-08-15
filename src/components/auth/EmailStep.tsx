import { useState } from "react";
import { loginUser, registerUser } from "../../lib/auth";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  mode: "login" | "register";
  onSubmit: () => void;
}

export default function EmailStep({ mode, onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { t } = useLanguage();

  const valid =
    email.trim().length > 3 &&
    email.includes("@") &&
    password.length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!valid || loading) return;

    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await loginUser(email.trim(), password);
      } else {
        await registerUser(email.trim(), password);
      }

      onSubmit();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : mode === "login"
            ? "Kirishda xatolik yuz berdi."
            : "Ro'yxatdan o'tishda xatolik yuz berdi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        {mode === "login" ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
      </h1>

      <p className="mb-7 text-[15px] text-ink-soft">
        {mode === "login"
          ? "Email va parolingizni kiriting."
          : "Email va parol orqali akkaunt yarating."}
      </p>

      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        Email
      </label>

      <input
        type="email"
        autoFocus
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-5 w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-line focus:border-ink"
      />

      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        Parol
      </label>

      <input
        type="password"
        placeholder="Kamida 6 ta belgi"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-line focus:border-ink"
      />

      {error && (
        <p className="mb-4 rounded-[10px] bg-alert/10 p-3 text-[13px] font-medium text-alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!valid || loading}
        className="w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-35"
      >
        {loading
          ? mode === "login"
            ? "Kirilmoqda..."
            : "Yaratilmoqda..."
          : mode === "login"
            ? "Kirish"
            : "Akkaunt yaratish"}
      </button>
    </form>
  );
}