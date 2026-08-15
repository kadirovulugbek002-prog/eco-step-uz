import { useEffect, useState } from "react";
import { createProfile, fetchMahallas } from "../../lib/auth";
import type { MahallaOption } from "../../lib/auth";
import { useLanguage } from "../../context/useLanguage";

interface Props {
  onSubmit: (name: string) => void;
}

export default function RegisterDetailsStep({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [mahallaId, setMahallaId] = useState("");
  const [mahallas, setMahallas] = useState<MahallaOption[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    fetchMahallas()
      .then(setMahallas)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingList(false));
  }, []);

  const valid = name.trim().length >= 3 && mahallaId !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;

    setSubmitting(true);
    setError("");
    try {
      await createProfile(name.trim(), mahallaId);
      onSubmit(name.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profil yaratishda xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="heading mb-2 text-[26px] leading-[1.05] sm:text-[30px]">
        {t("details_title")}
      </h1>
      <p className="mb-7 text-[15px] text-ink-soft">{t("details_subtitle")}</p>

      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        {t("details_nameLabel")}
      </label>
      <input
        type="text"
        autoFocus
        placeholder={t("details_namePlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-5 w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-line focus:border-ink"
      />

      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        {t("details_mahallaLabel")}
      </label>
      <select
        value={mahallaId}
        onChange={(e) => setMahallaId(e.target.value)}
        disabled={loadingList}
        className="mb-3 w-full rounded-[10px] border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none focus:border-ink disabled:opacity-50"
      >
        <option value="" disabled>
          {loadingList ? "Yuklanmoqda..." : t("details_mahallaPlaceholder")}
        </option>
        {mahallas.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      {error && (
        <p className="mb-4 text-[13px] font-medium text-alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={!valid || submitting}
        className="w-full rounded-[9px] bg-ink py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-35"
      >
        {submitting ? "Yaratilmoqda..." : t("details_submit")}
      </button>
    </form>
  );
}