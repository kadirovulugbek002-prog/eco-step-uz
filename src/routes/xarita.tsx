import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MapPin, Clock, Navigation, X, Recycle } from "lucide-react";
import type { WasteType } from "@/lib/eco-context";

export const Route = createFileRoute("/xarita")({
  head: () => ({ meta: [{ title: "Eko-Xarita — EcoStep" }] }),
  component: MapPage,
});

interface Point {
  id: string;
  name: string;
  district: string;
  address: string;
  hours: string;
  types: WasteType[];
  x: number; // %
  y: number; // %
  distance: number; // km
}

const points: Point[] = [
  { id: "1", name: "EcoHub Yunusobod", district: "Yunusobod", address: "Amir Temur 108", hours: "08:00 - 20:00", types: ["Plastik", "Qog'oz", "Shisha"], x: 38, y: 22, distance: 2.3 },
  { id: "2", name: "Green Point Chilonzor", district: "Chilonzor", address: "Bunyodkor 12", hours: "09:00 - 21:00", types: ["Plastik", "Elektronika"], x: 22, y: 65, distance: 5.8 },
  { id: "3", name: "Toza Mirzo Ulug'bek", district: "Mirzo Ulug'bek", address: "Mustaqillik 45", hours: "07:00 - 19:00", types: ["Qog'oz", "Metall"], x: 68, y: 40, distance: 4.1 },
  { id: "4", name: "EcoBox Sergeli", district: "Sergeli", address: "Sergeli 7-mavze", hours: "10:00 - 22:00", types: ["Plastik", "Shisha", "Metall"], x: 48, y: 88, distance: 9.2 },
  { id: "5", name: "Recycle Mirobod", district: "Mirobod", address: "Shota Rustaveli 14", hours: "08:30 - 20:30", types: ["Elektronika", "Metall"], x: 52, y: 52, distance: 1.5 },
  { id: "6", name: "EcoStation Yakkasaroy", district: "Yakkasaroy", address: "Glinka 8", hours: "09:00 - 18:00", types: ["Plastik", "Qog'oz"], x: 40, y: 60, distance: 3.7 },
  { id: "7", name: "Green Yashnobod", district: "Yashnobod", address: "Olmazor 22", hours: "08:00 - 20:00", types: ["Shisha", "Metall", "Elektronika"], x: 78, y: 60, distance: 7.2 },
  { id: "8", name: "EcoCenter Shayxontohur", district: "Shayxontohur", address: "Navoiy 1", hours: "07:00 - 21:00", types: ["Plastik", "Qog'oz", "Shisha", "Metall"], x: 32, y: 44, distance: 2.9 },
];

const allTypes: WasteType[] = ["Plastik", "Qog'oz", "Shisha", "Elektronika", "Metall"];

function MapPage() {
  const [filter, setFilter] = useState<WasteType | null>(null);
  const [selected, setSelected] = useState<Point | null>(null);
  const [routing, setRouting] = useState(false);

  const visible = filter ? points.filter((p) => p.types.includes(filter)) : points;

  const getRoute = (p: Point) => {
    setRouting(true);
    toast.loading("Yo'nalish hisoblanmoqda...", { id: "route" });
    setTimeout(() => {
      toast.success(`Yo'nalish tayyor!`, {
        id: "route",
        description: `${p.name}gacha ${p.distance} km · taxminan ${Math.round(p.distance * 4)} daqiqa`,
      });
      setRouting(false);
    }, 1400);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Eko-Xarita</h1>
        <p className="mt-1 text-muted-foreground">Toshkentdagi {points.length} ta chiqindi yig'ish punkti</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
            !filter ? "border-[var(--emerald)] bg-[var(--emerald)] text-primary-foreground" : "border-border hover:border-[var(--emerald)]/40"
          }`}
        >
          Barchasi ({points.length})
        </button>
        {allTypes.map((t) => {
          const count = points.filter((p) => p.types.includes(t)).length;
          const active = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(active ? null : t)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                active ? "border-[var(--emerald)] bg-[var(--emerald)] text-primary-foreground shadow-[var(--shadow-eco)]" : "border-border hover:border-[var(--emerald)]/40"
              }`}
            >
              {t} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Map mockup */}
        <Card className="relative h-[560px] overflow-hidden border-border/60 shadow-[var(--shadow-card)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.96 0.03 150), oklch(0.92 0.04 165))",
            }}
          >
            {/* Grid lines */}
            <svg className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.62 0.17 152 / 0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Decorative river */}
              <path d="M 0 200 Q 200 150 400 250 T 800 200" stroke="oklch(0.7 0.1 220 / 0.4)" strokeWidth="20" fill="none" strokeLinecap="round" />
              {/* Roads */}
              <path d="M 0 300 L 800 300" stroke="oklch(0.85 0.02 150)" strokeWidth="3" fill="none" />
              <path d="M 400 0 L 400 600" stroke="oklch(0.85 0.02 150)" strokeWidth="3" fill="none" />
              {routing && selected && (
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${selected.x}%`}
                  y2={`${selected.y}%`}
                  stroke="oklch(0.62 0.17 152)"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* User location */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-5 w-5 place-items-center rounded-full bg-blue-500 ring-4 ring-blue-500/30 animate-[pulse-glow_2s_ease-in-out_infinite]" />
              <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                Siz shu yerda
              </div>
            </div>

            {/* Markers */}
            {visible.map((p) => {
              const sel = selected?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <div
                    className={`relative grid h-10 w-10 place-items-center rounded-full text-primary-foreground shadow-lg transition-all ${
                      sel ? "scale-125 ring-4 ring-[var(--emerald)]/40" : ""
                    }`}
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Recycle className="h-5 w-5" />
                  </div>
                  <div
                    className="mx-auto h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent"
                    style={{ borderTopColor: "oklch(0.62 0.17 152)" }}
                  />
                </button>
              );
            })}
          </div>
          <div className="absolute bottom-3 right-3 rounded-md bg-background/90 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
            EcoStep Map · Toshkent
          </div>
        </Card>

        {/* Side panel */}
        <Card className="h-[560px] overflow-hidden p-0 shadow-[var(--shadow-card)]">
          {selected ? (
            <div className="flex h-full flex-col">
              <div className="relative bg-[var(--gradient-hero)] p-5 text-primary-foreground">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/20 hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <Badge className="border-white/30 bg-white/20">{selected.district}</Badge>
                <h3 className="mt-2 text-xl font-bold">{selected.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-sm opacity-90">
                  <MapPin className="h-3.5 w-3.5" /> {selected.address}
                </div>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-[var(--emerald)]" />
                  <span className="text-muted-foreground">Ish vaqti:</span>
                  <span className="font-medium">{selected.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="h-4 w-4 text-[var(--emerald)]" />
                  <span className="text-muted-foreground">Masofa:</span>
                  <span className="font-medium">{selected.distance} km</span>
                </div>
                <div>
                  <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Qabul qilinadi</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.types.map((t) => (
                      <Badge key={t} variant="outline" className="border-[var(--emerald)]/30 bg-[var(--emerald)]/10 text-[var(--emerald)]">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-border/60 p-4">
                <Button
                  onClick={() => getRoute(selected)}
                  disabled={routing}
                  className="w-full bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)] hover:opacity-90"
                >
                  <Navigation className="mr-1 h-4 w-4" />
                  {routing ? "Hisoblanmoqda..." : "Yo'nalish olish"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <div className="border-b border-border/60 p-4">
                <h3 className="font-semibold">Yaqin punktlar</h3>
                <p className="text-xs text-muted-foreground">Markerni bosing yoki tanlang</p>
              </div>
              <div className="flex-1 divide-y divide-border/60 overflow-y-auto">
                {visible.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--emerald)]/10 text-[var(--emerald)]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.distance} km · {p.district}</div>
                    </div>
                  </button>
                ))}
                {visible.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">Filtr bo'yicha punkt topilmadi</div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}