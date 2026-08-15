import { createFileRoute, Link } from "@tanstack/react-router";
import { Recycle, Coins, Wind, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEco, type ActivityStatus } from "@/lib/eco-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoStep — Toshkentning yashil platformasi" },
      {
        name: "description",
        content:
          "Chiqindini qayta ishlang, Eco-Ballar to‘plang va sayyorani toza saqlashga hissa qo‘shing.",
      },
    ],
  }),
  component: Dashboard,
});

const statusVariant: Record<ActivityStatus, string> = {
  Bajarildi: "bg-[var(--emerald)]/15 text-[var(--emerald)] border-[var(--emerald)]/30",
  Tekshirilmoqda: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  "Rad etildi": "bg-destructive/15 text-destructive border-destructive/30",
};

function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  accent,
}: {
  label: string;
  value: string | number;
  unit: string;
  icon: typeof Recycle;
  trend: string;
  accent: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-border/60 p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-eco)]">
      <div
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-4xl font-bold tracking-tight text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--emerald)]">
            <TrendingUp className="h-3.5 w-3.5" />
            {trend}
          </div>
        </div>
        <div
          className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground shadow-[var(--shadow-eco)]"
          style={{ background: accent }}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  const { totalKg, points, co2Saved, activities, dailyGoal, weeklyGoal, dailyProgress, weeklyProgress } = useEco();
  const dailyPct = Math.min(100, (dailyProgress / dailyGoal) * 100);
  const weeklyPct = Math.min(100, (weeklyProgress / weeklyGoal) * 100);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-10">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-[var(--gradient-hero)] p-8 text-primary-foreground shadow-[var(--shadow-eco)]">
        <div className="absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="border-white/30 bg-white/15 text-primary-foreground backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" />
              Yashil hayot
            </Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Assalomu alaykum!</h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/90 md:text-base">
              Bugun ham sayyoramizni toza saqlashga hissa qo‘shamizmi? Quyida sizning ekologik ta’siringizni ko‘rishingiz mumkin.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="shadow-lg">
            <Link to="/topshirish">
              Chiqindi topshirish <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Qayta ishlangan chiqindi" value={totalKg} unit="kg" icon={Recycle} trend="Ekologik ta’sir" accent="linear-gradient(135deg, oklch(0.62 0.17 152), oklch(0.72 0.18 162))" />
        <StatCard label="To‘plangan Eco-Ballar" value={points.toLocaleString()} unit="ball" icon={Coins} trend="Faollik davom etmoqda" accent="linear-gradient(135deg, oklch(0.72 0.18 165), oklch(0.78 0.16 145))" />
        <StatCard label="Kamaytirilgan CO₂" value={co2Saved} unit="kg" icon={Wind} trend="Tabiatga foyda" accent="linear-gradient(135deg, oklch(0.55 0.12 180), oklch(0.62 0.17 152))" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Kunlik maqsad</h3>
              <p className="text-xs text-muted-foreground">Har kuni kichik qadam — katta o‘zgarish</p>
            </div>
            <span className="text-2xl font-bold text-[var(--emerald)]">{Math.round(dailyPct)}%</span>
          </div>
          <Progress value={dailyPct} className="h-3" />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{dailyProgress} kg topshirildi</span>
            <span>Maqsad: {dailyGoal} kg</span>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const h = Math.max(8, Math.round(20 + Math.sin(i * 1.3) * 30 + i * 6));
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-full rounded-md bg-[var(--gradient-primary)] transition-all hover:opacity-80" style={{ height: `${h}px` }} />
                  <span className="text-[10px] text-muted-foreground">{["D", "S", "Ch", "P", "J", "Sh", "Y"][i]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Haftalik maqsad</h3>
              <p className="text-xs text-muted-foreground">Sayyoramiz uchun haftalik missiya</p>
            </div>
            <span className="text-2xl font-bold text-[var(--emerald)]">{Math.round(weeklyPct)}%</span>
          </div>
          <div className="relative mx-auto my-6 grid h-44 w-44 place-items-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
              <circle cx="60" cy="60" r="50" stroke="var(--muted)" strokeWidth="10" fill="none" />
              <circle cx="60" cy="60" r="50" stroke="url(#g1)" strokeWidth="10" strokeLinecap="round" fill="none" strokeDasharray={`${(weeklyPct / 100) * 314} 314`} className="transition-all duration-700" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.17 152)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.16 145)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center"><div className="text-3xl font-bold">{weeklyProgress}</div><div className="text-xs text-muted-foreground">/ {weeklyGoal} kg</div></div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-border/60 p-6">
          <div><h3 className="text-lg font-semibold">So‘nggi faoliyat</h3><p className="text-xs text-muted-foreground">Sizning oxirgi topshiriqlaringiz</p></div>
          <Button asChild variant="outline" size="sm"><Link to="/topshirish">Yangi topshirish</Link></Button>
        </div>
        <div className="divide-y divide-border/60">
          {activities.slice(0, 6).map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/40">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--emerald)]/10 text-[var(--emerald)]"><Recycle className="h-5 w-5" /></div>
              <div className="flex-1"><div className="font-medium">{a.type}</div><div className="text-xs text-muted-foreground">{a.date} · {a.weight} kg</div></div>
              <div className="text-sm font-semibold text-[var(--emerald)]">+{a.points} ball</div>
              <Badge variant="outline" className={statusVariant[a.status]}>{a.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
