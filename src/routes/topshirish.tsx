import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useEco, POINTS_PER_KG, type WasteType } from "@/lib/eco-context";
import { Package, Newspaper, Wine, Cpu, Wrench, Check, MapPin, Truck, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/topshirish")({
  head: () => ({ meta: [{ title: "Chiqindi topshirish — EcoStep" }] }),
  component: SubmitPage,
});

const wasteTypes: { type: WasteType; icon: typeof Package; color: string }[] = [
  { type: "Plastik", icon: Package, color: "oklch(0.62 0.17 152)" },
  { type: "Qog'oz", icon: Newspaper, color: "oklch(0.72 0.18 165)" },
  { type: "Shisha", icon: Wine, color: "oklch(0.55 0.12 180)" },
  { type: "Elektronika", icon: Cpu, color: "oklch(0.78 0.16 145)" },
  { type: "Metall", icon: Wrench, color: "oklch(0.45 0.1 160)" },
];

function SubmitPage() {
  const { addActivity } = useEco();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<WasteType | null>(null);
  const [weight, setWeight] = useState<number>(2);
  const [method, setMethod] = useState<"pickup" | "dropoff">("pickup");
  const [address, setAddress] = useState("Toshkent, Yunusobod tumani, 19-kvartal");
  const [note, setNote] = useState("");

  const points = type ? Math.round(weight * POINTS_PER_KG[type]) : 0;

  const submit = () => {
    if (!type) return;
    addActivity(type, weight);
    toast.success("Topshiriq qabul qilindi!", {
      description: `${weight} kg ${type} · +${points} Eco-Ball (tekshiruvdan keyin)`,
    });
    setStep(1);
    setType(null);
    setWeight(2);
    setNote("");
  };

  const stepLabels = ["Chiqindi turi", "Miqdor", "Yetkazib berish", "Tasdiqlash"];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chiqindi topshirish</h1>
        <p className="mt-1 text-muted-foreground">4 ta oddiy qadamda Eco-Ballarni qo'lga kiriting</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {stepLabels.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-all ${
                  done
                    ? "bg-[var(--emerald)] text-primary-foreground"
                    : active
                    ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-eco)]"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <div className={`hidden text-xs font-medium md:block ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </div>
              {n < stepLabels.length && <div className={`h-px flex-1 ${done ? "bg-[var(--emerald)]" : "bg-border"}`} />}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-6 shadow-[var(--shadow-card)] animate-[slide-up_0.4s_ease-out]">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Chiqindi turini tanlang</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {wasteTypes.map((w) => {
                  const selected = type === w.type;
                  return (
                    <button
                      key={w.type}
                      onClick={() => setType(w.type)}
                      className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all hover:-translate-y-0.5 ${
                        selected
                          ? "border-[var(--emerald)] bg-[var(--emerald)]/5 shadow-[var(--shadow-eco)]"
                          : "border-border hover:border-[var(--emerald)]/40"
                      }`}
                    >
                      <div
                        className="mb-3 grid h-12 w-12 place-items-center rounded-xl text-primary-foreground"
                        style={{ background: w.color }}
                      >
                        <w.icon className="h-6 w-6" />
                      </div>
                      <div className="font-semibold">{w.type}</div>
                      <div className="text-xs text-muted-foreground">{POINTS_PER_KG[w.type]} ball / kg</div>
                      {selected && (
                        <div className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-[var(--emerald)] text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Taxminiy og'irlikni kiriting</h2>
              <div className="rounded-2xl bg-[var(--gradient-hero)] p-6 text-center text-primary-foreground shadow-[var(--shadow-eco)]">
                <div className="text-xs uppercase tracking-widest opacity-80">Tanlangan miqdor</div>
                <div className="mt-2 text-6xl font-bold">{weight.toFixed(1)}</div>
                <div className="text-sm opacity-90">kilogramm</div>
              </div>
              <input
                type="range"
                min={0.5}
                max={50}
                step={0.5}
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-[var(--emerald)]"
              />
              <div className="grid grid-cols-4 gap-2">
                {[1, 5, 10, 20].map((v) => (
                  <Button key={v} variant="outline" size="sm" onClick={() => setWeight(v)}>
                    {v} kg
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Yetkazib berish usuli</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <button
                  onClick={() => setMethod("pickup")}
                  className={`rounded-2xl border-2 p-5 text-left transition-all ${
                    method === "pickup" ? "border-[var(--emerald)] bg-[var(--emerald)]/5" : "border-border"
                  }`}
                >
                  <Truck className="mb-2 h-6 w-6 text-[var(--emerald)]" />
                  <div className="font-semibold">Olib ketish xizmati</div>
                  <div className="text-xs text-muted-foreground">Manzilingizga keling, biz olib ketamiz</div>
                </button>
                <button
                  onClick={() => setMethod("dropoff")}
                  className={`rounded-2xl border-2 p-5 text-left transition-all ${
                    method === "dropoff" ? "border-[var(--emerald)] bg-[var(--emerald)]/5" : "border-border"
                  }`}
                >
                  <MapPin className="mb-2 h-6 w-6 text-[var(--emerald)]" />
                  <div className="font-semibold">O'zim olib boraman</div>
                  <div className="text-xs text-muted-foreground">Eng yaqin yig'ish punktiga</div>
                </button>
              </div>
              {method === "pickup" && (
                <div className="space-y-2">
                  <Label>Manzil</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              )}
              <div className="space-y-2">
                <Label>Izoh (ixtiyoriy)</Label>
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Masalan: ikkinchi qavat, 12-xonadon" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Topshiriqni tasdiqlang</h2>
              <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <Row label="Chiqindi turi" value={type ?? "-"} />
                <Row label="Og'irlik" value={`${weight.toFixed(1)} kg`} />
                <Row label="Usul" value={method === "pickup" ? "Olib ketish" : "O'zim topshiraman"} />
                {method === "pickup" && <Row label="Manzil" value={address} />}
                <div className="border-t border-border/60 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Kutilayotgan mukofot</span>
                    <span className="text-2xl font-bold text-[var(--emerald)]">+{points} ball</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Orqaga
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && !type}
                className="bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)] hover:opacity-90"
              >
                Davom etish <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submit} className="bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)] hover:opacity-90">
                Yuborish <Check className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>

        <Card className="h-fit p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Hisob-kitob</h3>
          <div className="my-4 rounded-2xl border border-border/60 p-4">
            <div className="text-xs text-muted-foreground">Tanlangan tur</div>
            <div className="font-semibold">{type ?? "—"}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Og'irlik</span><span className="font-medium">{weight.toFixed(1)} kg</span></div>
            <div className="flex justify-between"><span>Tarif</span><span className="font-medium">{type ? POINTS_PER_KG[type] : 0} / kg</span></div>
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Eco-Ballar</span>
            <Badge className="bg-[var(--emerald)] text-primary-foreground text-base">+{points}</Badge>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            * Ballar tekshiruvdan o'tgach hisobingizga qo'shiladi.
          </p>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}