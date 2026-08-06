import { pointsHistory } from "../../data/content";

export default function PointsHistory() {
  return (
    <div>
      <h2 className="mb-3.5 text-[15px] font-bold text-ink">
        So'nggi harakatlar
      </h2>
      <div className="overflow-hidden rounded-[14px] border border-line bg-white">
        {pointsHistory.map((tx, i) => (
          <div
            key={tx.id}
            className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
              i !== pointsHistory.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${
                  tx.kind === "topup"
                    ? "bg-primary/12 text-primary"
                    : "bg-[#F0876B]/14 text-[#C1502E]"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  {tx.kind === "topup" ? (
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  ) : (
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  )}
                </svg>
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-ink">
                  {tx.label}
                </p>
                <p className="mt-0.5 text-[12px] text-ink-soft">{tx.date}</p>
              </div>
            </div>
            <span
              className={`font-mono text-[14px] font-semibold ${
                tx.kind === "topup" ? "text-primary-deep" : "text-[#C1502E]"
              }`}
            >
              {tx.points > 0 ? "+" : ""}
              {tx.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}