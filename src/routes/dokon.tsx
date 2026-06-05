import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useEco } from "@/lib/eco-context";
import { toast } from "sonner";
import { Bus, TreePine, ShoppingBag, Coffee, Ticket, Gift, Coins, Check, Copy } from "lucide-react";

export const Route = createFileRoute("/dokon")({
  head: () => ({ meta: [{ title: "Eco-Do'kon — EcoStep" }] }),
  component: StorePage,
});

const products = [
  { id: "p1", name: "Metro chiptasi (10 ta)", category: "Transport", cost: 200, icon: Bus, color: "oklch(0.62 0.17 152)", desc: "Toshkent metrosi uchun 10 ta yo'l chiptasi" },
  { id: "p2", name: "Daraxt ekish sertifikati", category: "Ekologiya", cost: 500, icon: TreePine, color: "oklch(0.55 0.18 158)", desc: "Sizning nomingizdan 1 daraxt ekiladi" },
  { id: "p3", name: "Bambuk shchotka", category: "Mahsulot", cost: 350, icon: ShoppingBag, color: "oklch(0.72 0.18 165)", desc: "Tabiiy bambukdan tish shchotka" },
  { id: "p4", name: "Organik kofe (250g)", category: "Oziq-ovqat", cost: 800, icon: Coffee, color: "oklch(0.45 0.1 160)", desc: "Adolatli savdo organik kofe donalari" },
  { id: "p5", name: "Eko-bog' chiptasi", category: "Sayohat", cost: 450, icon: Ticket, color: "oklch(0.78 0.16 145)", desc: "Botanika bog'iga 2 kishilik kirish" },
  { id: "p6", name: "Qayta ishlangan sumka", category: "Mahsulot", cost: 300, icon: Gift, color: "oklch(0.55 0.12 180)", desc: "100% qayta ishlangan materialdan sumka" },
];

const categories = ["Barchasi", "Transport", "Ekologiya", "Mahsulot", "Oziq-ovqat", "Sayohat"];

function StorePage() {
  const { points, purchase, vouchers } = useEco();
  const [filter, setFilter] = useState("Barchasi");
  const [voucher, setVoucher] = useState<{ code: string; name: string } | null>(null);

  const filtered = filter === "Barchasi" ? products : products.filter((p) => p.category === filter);

  const handleBuy = (productName: string, cost: number) => {
    const v = purchase(productName, cost);
    if (!v) {
      toast.error("Ballar yetarli emas", { description: `Sizga yana ${cost - points} ball kerak` });
      return;
    }
    setVoucher({ code: v.code, name: v.productName });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eco-Do'kon</h1>
          <p className="mt-1 text-muted-foreground">Ekologik harakatlaringizni mukofotga aylantiring</p>
        </div>
        <Card className="flex items-center gap-3 border-[var(--emerald)]/30 bg-[var(--emerald)]/5 px-5 py-3">
          <Coins className="h-6 w-6 text-[var(--emerald)]" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sizning balansingiz</div>
            <div className="text-2xl font-bold text-[var(--emerald)]">{points.toLocaleString()} ball</div>
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              filter === c
                ? "border-[var(--emerald)] bg-[var(--emerald)] text-primary-foreground shadow-[var(--shadow-eco)]"
                : "border-border bg-background hover:border-[var(--emerald)]/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const can = points >= p.cost;
          return (
            <Card
              key={p.id}
              className="group overflow-hidden border-border/60 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-eco)]"
            >
              <div
                className="relative h-40 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.color}, oklch(0.95 0.02 150))` }}
              >
                <div className="absolute inset-0 grid place-items-center">
                  <p.icon className="h-20 w-20 text-primary-foreground/90 transition-transform group-hover:scale-110" />
                </div>
                <Badge className="absolute right-3 top-3 border-white/30 bg-white/20 text-primary-foreground backdrop-blur">
                  {p.category}
                </Badge>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <Coins className="h-4 w-4 text-[var(--emerald)]" />
                    <span className="text-xl font-bold">{p.cost}</span>
                    <span className="text-xs text-muted-foreground">ball</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBuy(p.name, p.cost)}
                    disabled={!can}
                    className="bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)] hover:opacity-90 disabled:opacity-50"
                  >
                    {can ? "Sotib olish" : "Ball yetmaydi"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {vouchers.length > 0 && (
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-lg font-semibold">Mening vaucherlarim</h3>
          <div className="space-y-2">
            {vouchers.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-xl border border-dashed border-[var(--emerald)]/40 bg-[var(--emerald)]/5 p-3">
                <div>
                  <div className="font-medium">{v.productName}</div>
                  <div className="text-xs text-muted-foreground">{v.date}</div>
                </div>
                <code className="rounded-md bg-background px-3 py-1.5 font-mono text-sm font-semibold text-[var(--emerald)]">{v.code}</code>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Dialog open={!!voucher} onOpenChange={(o) => !o && setVoucher(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)]">
              <Check className="h-7 w-7 text-primary-foreground" />
            </div>
            <DialogTitle className="text-center">Xarid muvaffaqiyatli!</DialogTitle>
            <DialogDescription className="text-center">
              {voucher?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl border-2 border-dashed border-[var(--emerald)]/40 bg-[var(--emerald)]/5 p-5 text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Vaucher kodi</div>
            <div className="my-2 font-mono text-2xl font-bold tracking-wider text-[var(--emerald)]">{voucher?.code}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (voucher) {
                  navigator.clipboard?.writeText(voucher.code);
                  toast.success("Kod nusxalandi");
                }
              }}
            >
              <Copy className="mr-1 h-3.5 w-3.5" /> Nusxalash
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setVoucher(null)} className="w-full bg-[var(--gradient-primary)]">Yopish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}