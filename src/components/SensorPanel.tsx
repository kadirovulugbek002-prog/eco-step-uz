import { useEffect, useState } from "react";
import { binReadings, COLOR_HEX } from "../data/content";
import type { BinStatus } from "../types";

function statusFor(pct: number): { label: string; classes: string } {
  if (pct >= 80) return { label: "To'la", classes: "text-[#F0876B] bg-[#F0876B]/14" };
  if (pct >= 40) return { label: "Yarim", classes: "text-accent bg-accent/14" };
  return { label: "Bo'sh", classes: "text-[#8FE3B4] bg-[#8FE3B4]/12" };
}

export default function SensorPanel() {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rounded-[20px] bg-ink p-6 shadow-[0_30px_60px_-25px_rgba(18,63,42,0.45)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
          Konteyner №14 · Chilonzor-9
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#8FE3B4]">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-[#8FE3B4]" />
          JONLI
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {binReadings.map((bin) => {
          const st = statusFor(bin.levelPct);
          const hex = COLOR_HEX[bin.colorVar];
          return (
            <div key={bin.id} className="rounded-[10px] bg-[#26332B] p-3">
              <div className="grid grid-cols-[20px_1fr_68px_74px] items-center gap-3">
                <span className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: hex }} />
                <span className="text-[13px] font-semibold text-[#EDEFEB]">{bin.name}</span>
                <span className="text-right font-mono text-xs text-[#B9C2B7]">{bin.levelPct}%</span>
                <span className={`rounded-full px-2 py-[3px] text-center font-mono text-[11px] font-semibold ${st.classes}`}>
                  {st.label}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1A241E]">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{ width: filled ? `${bin.levelPct}%` : "0%", backgroundColor: hex }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type { BinStatus };