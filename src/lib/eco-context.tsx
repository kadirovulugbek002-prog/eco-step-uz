import { createContext, useContext, useState, type ReactNode } from "react";

export type WasteType = "Plastik" | "Qog'oz" | "Shisha" | "Elektronika" | "Metall";
export type ActivityStatus = "Bajarildi" | "Tekshirilmoqda" | "Rad etildi";

export interface Activity {
  id: string;
  type: WasteType;
  weight: number;
  points: number;
  status: ActivityStatus;
  date: string;
}

export interface Voucher {
  id: string;
  productName: string;
  code: string;
  date: string;
}

interface EcoContextValue {
  points: number;
  totalKg: number;
  co2Saved: number;
  activities: Activity[];
  vouchers: Voucher[];
  addActivity: (type: WasteType, weight: number) => Activity;
  purchase: (productName: string, cost: number) => Voucher | null;
  dailyGoal: number;
  weeklyGoal: number;
  dailyProgress: number;
  weeklyProgress: number;
}

const EcoContext = createContext<EcoContextValue | null>(null);

export const POINTS_PER_KG: Record<WasteType, number> = {
  Plastik: 15,
  "Qog'oz": 8,
  Shisha: 10,
  Elektronika: 35,
  Metall: 20,
};

const CO2_PER_KG = 1.8;

const seedActivities: Activity[] = [
  { id: "a1", type: "Plastik", weight: 3.2, points: 48, status: "Bajarildi", date: "2026-06-04" },
  { id: "a2", type: "Qog'oz", weight: 5.0, points: 40, status: "Bajarildi", date: "2026-06-03" },
  { id: "a3", type: "Elektronika", weight: 1.5, points: 53, status: "Tekshirilmoqda", date: "2026-06-02" },
  { id: "a4", type: "Shisha", weight: 4.8, points: 48, status: "Bajarildi", date: "2026-06-01" },
  { id: "a5", type: "Plastik", weight: 0.6, points: 9, status: "Rad etildi", date: "2026-05-30" },
];

export function EcoProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(seedActivities);
  const [points, setPoints] = useState(820);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  const totalKg = activities
    .filter((a) => a.status === "Bajarildi")
    .reduce((s, a) => s + a.weight, 0);
  const co2Saved = Math.round(totalKg * CO2_PER_KG * 10) / 10;

  const dailyGoal = 5;
  const weeklyGoal = 25;
  const today = new Date().toISOString().slice(0, 10);
  const dailyProgress = activities
    .filter((a) => a.date === today && a.status !== "Rad etildi")
    .reduce((s, a) => s + a.weight, 0);
  const weeklyProgress = Math.min(totalKg, weeklyGoal);

  const addActivity = (type: WasteType, weight: number): Activity => {
    const earned = Math.round(weight * POINTS_PER_KG[type]);
    const activity: Activity = {
      id: `a${Date.now()}`,
      type,
      weight,
      points: earned,
      status: "Tekshirilmoqda",
      date: new Date().toISOString().slice(0, 10),
    };
    setActivities((p) => [activity, ...p]);
    // Auto approve after 3s
    setTimeout(() => {
      setActivities((p) =>
        p.map((a) => (a.id === activity.id ? { ...a, status: "Bajarildi" } : a))
      );
      setPoints((p) => p + earned);
    }, 3000);
    return activity;
  };

  const purchase = (productName: string, cost: number): Voucher | null => {
    if (points < cost) return null;
    setPoints((p) => p - cost);
    const voucher: Voucher = {
      id: `v${Date.now()}`,
      productName,
      code: `ECO-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    setVouchers((v) => [voucher, ...v]);
    return voucher;
  };

  return (
    <EcoContext.Provider
      value={{
        points,
        totalKg: Math.round(totalKg * 10) / 10,
        co2Saved,
        activities,
        vouchers,
        addActivity,
        purchase,
        dailyGoal,
        weeklyGoal,
        dailyProgress: Math.round(dailyProgress * 10) / 10,
        weeklyProgress: Math.round(weeklyProgress * 10) / 10,
      }}
    >
      {children}
    </EcoContext.Provider>
  );
}

export function useEco() {
  const ctx = useContext(EcoContext);
  if (!ctx) throw new Error("useEco must be used within EcoProvider");
  return ctx;
}