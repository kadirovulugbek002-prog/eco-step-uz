import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, Medal, Award, TrendingUp, Leaf, Recycle, Wind } from "lucide-react";
import { useEco } from "@/lib/eco-context";

export const Route = createFileRoute("/reyting")({
  head: () => ({ meta: [{ title: "Reyting va tahlil — EcoStep" }] }),
  component: LeaderboardPage,
});

const leaderboard = [
  { rank: 1, name: "Ibrohimov Abdullo", points: 8420, kg: 312, district: "Yunusobod" },
  { rank: 2, name: "Karimov Ulug'bek", points: 7180, kg: 268, district: "Mirzo Ulug'bek" },
  { rank: 3, name: "Saidov Mirolim", points: 6940, kg: 254, district: "Chilonzor" },
  { rank: 4, name: "Yusupova Madina", points: 5820, kg: 218, district: "Mirobod" },
  { rank: 5, name: "Rahmonov Javohir", points: 5210, kg: 198, district: "Yashnobod" },
  { rank: 6, name: "Tursunova Nilufar", points: 4690, kg: 176, district: "Yakkasaroy" },
  { rank: 7, name: "Olimov Behzod", points: 4120, kg: 158, district: "Sergeli" },
  { rank: 8, name: "Hamidova Zilola", points: 3850, kg: 142, district: "Shayxontohur" },
  { rank: 9, name: "Mirzayev Akmal", points: 3420, kg: 128, district: "Yunusobod" },
  { rank: 10, name: "Qodirova Dilnoza", points: 3180, kg: 119, district: "Chilonzor" },
];

const monthly = [
  { m: "Yan", v: 8 },
  { m: "Fev", v: 14 },
  { m: "Mar", v: 22 },
  { m: "Apr", v: 18 },
  { m: "May", v: 32 },
  { m: "Iyun", v: 45 },
  { m: "Iyul", v: 38 },
  { m: "Avg", v: 52 },
  { m: "Sen", v: 60 },
  { m: "Okt", v: 48 },
  { m: "Noy", v: 65 },
  { m: "Dek", v: 72 },
];

const byType = [
  { name: "Plastik", value: 42, color: "oklch(0.62 0.17 152)" },
  { name: "Qog'oz", value: 28, color: "oklch(0.72 0.18 165)" },
  { name: "Shisha", value: 18, color: "oklch(0.55 0.12 180)" },
  { name: "Metall", value: 8, color: "oklch(0.45 0.1 160)" },
  { name: "Elektronika", value: 4, color: "oklch(0.78 0.16 145)" },
];

const rankBadge = [
  { icon: Trophy, color: "from-amber-400 to-yellow-600", label: "Top 1" },
  { icon: Medal, color: "from-slate-300 to-slate-500", label: "Top 2" },
  { icon: Award, color: "from-orange-400 to-amber-700", label: "Top 3" },
];

function LeaderboardPage() {
  const { totalKg, points, co2Saved } = useEco();
  const [period, setPeriod] = useState("oy");

  const max = Math.max(...monthly.map((m) => m.v));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reyting va tahlil</h1>
        <p className="mt-1 text-muted-foreground">Eng faol eco-fuqarolar va sizning ta'siringiz</p>
      </div>

      {/* Podium */}
      <Card className="overflow-hidden border-border/60 bg-[var(--gradient-hero)] p-8 shadow-[var(--shadow-eco)]">
        <div className="grid items-end gap-4 sm:grid-cols-3">
          {[1, 0, 2].map((idx, pos) => {
            const p = leaderboard[idx];
            const heights = ["h-32", "h-44", "h-24"];
            const B = rankBadge[idx];
            return (
              <div key={p.rank} className="flex flex-col items-center">
                <div className="mb-3 grid h-16 w-16 place-items-center rounded-full bg-white text-2xl font-bold text-charcoal shadow-xl ring-4 ring-white/40">
                  {p.name.charAt(0)}
                </div>
                <div className="text-center text-primary-foreground">
                  <div className="font-bold">{p.name}</div>
                  <div className="text-xs opacity-90">{p.points.toLocaleString()} ball</div>
                </div>
                <div className={`mt-3 w-full ${heights[pos]} rounded-t-2xl bg-gradient-to-b ${B.color} shadow-inner`}>
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-primary-foreground">
                    <B.icon className="h-7 w-7" />
                    <div className="text-2xl font-bold">#{p.rank}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Tabs defaultValue="reyting">
        <TabsList>
          <TabsTrigger value="reyting">Reyting</TabsTrigger>
          <TabsTrigger value="tahlil">Mening tahlilim</TabsTrigger>
        </TabsList>

        <TabsContent value="reyting" className="mt-4">
          <Card className="overflow-hidden shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-[60px_1fr_100px_100px_120px] gap-4 border-b border-border/60 bg-muted/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <div>O'rin</div>
              <div>Ishtirokchi</div>
              <div className="text-right">Kg</div>
              <div className="text-right">Ballar</div>
              <div className="text-right">Tuman</div>
            </div>
            {leaderboard.map((p) => {
              const top = p.rank <= 3;
              return (
                <div
                  key={p.rank}
                  className="grid grid-cols-[60px_1fr_100px_100px_120px] gap-4 border-b border-border/60 px-6 py-4 text-sm transition-colors last:border-0 hover:bg-muted/40"
                >
                  <div>
                    {top ? (
                      <Badge className={`bg-gradient-to-r ${rankBadge[p.rank - 1].color} text-primary-foreground`}>
                        #{p.rank}
                      </Badge>
                    ) : (
                      <span className="font-semibold text-muted-foreground">#{p.rank}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--emerald)]/15 font-semibold text-[var(--emerald)]">
                      {p.name.charAt(0)}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <div className="text-right font-medium">{p.kg}</div>
                  <div className="text-right font-bold text-[var(--emerald)]">{p.points.toLocaleString()}</div>
                  <div className="text-right text-xs text-muted-foreground">{p.district}</div>
                </div>
              );
            })}
          </Card>
        </TabsContent>

        <TabsContent value="tahlil" className="mt-4 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <MiniStat icon={Recycle} label="Jami chiqindi" value={`${totalKg} kg`} />
            <MiniStat icon={Leaf} label="Eco-Ballar" value={points.toLocaleString()} />
            <MiniStat icon={Wind} label="CO₂ kamayishi" value={`${co2Saved} kg`} />
          </div>

          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Oylik ta'sir</h3>
                <p className="text-xs text-muted-foreground">Qayta ishlangan chiqindi (kg)</p>
              </div>
              <div className="flex gap-1 rounded-lg bg-muted p-1">
                {["hafta", "oy", "yil"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-all ${
                      period === p ? "bg-background shadow" : "text-muted-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex h-56 items-end justify-between gap-2">
              {monthly.map((m) => (
                <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)] transition-all hover:opacity-80"
                      style={{ height: `${(m.v / max) * 100}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-foreground opacity-0 transition-opacity hover:opacity-100">
                        {m.v}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">{m.m}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Chiqindi turlari bo'yicha</h3>
              <p className="text-xs text-muted-foreground">Yillik taqsimot (%)</p>
            </div>
            <div className="space-y-3">
              {byType.map((t) => (
                <div key={t.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted-foreground">{t.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${t.value}%`, background: t.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: string }) {
  return (
    <Card className="p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-eco)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="text-xl font-bold">{value}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-[var(--emerald)]">
        <TrendingUp className="h-3 w-3" /> +18% o'tgan oyga nisbatan
      </div>
    </Card>
  );
}