import { useEffect, useState } from "react";
import TabBar from "../components/TabBar";
import { fetchMahallaList } from "../lib/mahallas";
import type { MahallaListItem } from "../lib/mahallas";

export default function RankingPage() {
  const [mahallas, setMahallas] = useState<MahallaListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMahallaList()
      .then(setMahallas)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[560px] flex-1 px-6 py-10">
        <h1 className="heading mb-1 text-[24px]">Mahallalar</h1>
        <p className="mb-6 text-[14px] text-ink-soft">
          Tizimga ulangan mahallalar ro'yxati.
        </p>

        <div className="mb-5 rounded-[12px] border border-line bg-white p-4">
          <p className="text-[12.5px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Reyting hali mavjud emas.</span>{" "}
            Fuqarolar chiqindi topshira boshlagach, mahallalar aholi jon
            boshiga saralangan chiqindi asosida solishtiriladi.
          </p>
        </div>

        {loading && (
          <p className="text-[13.5px] text-ink-soft">Yuklanmoqda...</p>
        )}

        {error && (
          <p className="rounded-[10px] bg-alert/10 p-3 text-[13px] font-medium text-alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-[14px] border border-line bg-white">
            {mahallas.map((m, i) => (
              <div
                key={m.id}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i !== mahallas.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="text-[13.5px] font-semibold text-ink">
                  {m.name}
                </span>
                <span className="font-mono text-[12px] text-ink-soft">
                  {m.residentCount.toLocaleString("uz-UZ")} kishi
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-[68px]" />
      <TabBar />
    </div>
  );
}