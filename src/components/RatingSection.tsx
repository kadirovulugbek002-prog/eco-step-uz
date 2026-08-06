import { leaderboard } from "../data/content";

export default function RatingSection() {
  return (
    <section id="reyting" className="bg-canvas-2 py-[76px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-7 lg:grid-cols-2">
        <div>
          <span className="mb-2.5 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">Gamifikatsiya</span>
          <h2 className="heading text-[28px] leading-[1.02] sm:text-[36px] lg:text-[40px]">Mahallalar bir-biri bilan raqobatlashadi</h2>
          <p className="mt-3.5 text-base text-ink-soft">
            Har bir mahalla o'z natijasini ko'radi. Reyting aholi jon boshiga saralangan chiqindi asosida hisoblanadi — kichik mahalla ham g'olib chiqishi mumkin.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-2">
          {leaderboard.map((entry) => (
            <div key={entry.rank} className="mb-1 last:mb-0">
              <div className={`grid grid-cols-[28px_1fr_60px] items-center gap-3 rounded-[10px] px-3.5 py-3 ${entry.rank === 1 ? "bg-canvas-2" : ""}`}>
                <span className={`font-mono text-[13px] font-bold ${entry.rank === 1 ? "text-primary-deep" : "text-ink-soft"}`}>
                  {String(entry.rank).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-ink">{entry.mahalla}</span>
                <span className="text-right font-mono text-[13px] text-ink-soft">{entry.scoreTons} t</span>
              </div>
              <div className="mb-1 mt-[-4px] h-[5px] overflow-hidden rounded-full bg-canvas-2">
                <div className="h-full rounded-full bg-primary" style={{ width: `${entry.progressPct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}