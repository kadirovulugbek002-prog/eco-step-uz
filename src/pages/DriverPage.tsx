import { useMemo, useState } from "react";
import { containers } from "../data/content";
import DailyStats from "../components/driver/DailyStats";
import RouteMap from "../components/driver/RouteMap";
import TaskQueue from "../components/driver/TaskQueue";
import type { OverallStatus } from "../types";

const PRIORITY: Record<OverallStatus, number> = { tola: 0, yarim: 1, bosh: 2 };

export default function DriverPage() {
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());

  const ordered = useMemo(() => {
    return [...containers].sort((a, b) => {
      const pDiff = PRIORITY[a.overallStatus] - PRIORITY[b.overallStatus];
      if (pDiff !== 0) return pDiff;
      return a.distanceM - b.distanceM;
    });
  }, []);

  const target = ordered.find((c) => !collectedIds.has(c.id)) ?? null;

  function toggle(id: string) {
    setCollectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto w-full max-w-[560px] px-6 py-10">
        <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Haydovchi paneli
        </span>
        <h1 className="heading mb-1 text-[24px]">Bugungi yo'nalish</h1>
        <p className="mb-6 text-[14px] text-ink-soft">
          Chilonzor-9 mahallasi — eng to'la konteynerlardan boshlang.
        </p>

        <div className="mb-6">
          <DailyStats total={ordered.length} collected={collectedIds.size} />
        </div>

        {target && (
          <div className="mb-3 rounded-[12px] border border-[#C1502E]/30 bg-[#C1502E]/6 px-4 py-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#C1502E]">
              Keyingi manzil
            </p>
            <p className="mt-0.5 text-[15px] font-bold text-ink">
              {target.name} · {target.distanceM} m
            </p>
          </div>
        )}

        <RouteMap collectedIds={collectedIds} targetId={target?.id ?? null} />

        <div className="mt-6">
          <h2 className="mb-3.5 text-[15px] font-bold text-ink">
            Navbat (ustuvorlik bo'yicha)
          </h2>
          <TaskQueue
            ordered={ordered}
            collectedIds={collectedIds}
            onToggle={toggle}
          />
        </div>
      </div>
    </div>
  );
}