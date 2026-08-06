import type {
  BinReading,
  WasteCategory,
  LeaderboardEntry,
  ProcessStep,
  StatItem,
} from "../types";

export const COLOR_HEX: Record<string, string> = {
  paper: "#C7A96B",
  plastic: "#3F8FB0",
  glass: "#5F9E6B",
  rezina: "#4A4642",
  organik: "#8B6F47",
  metall: "#8D97A1",
};

export const binReadings: BinReading[] = [
  { id: "qogoz", name: "Qog'oz", colorVar: "paper", levelPct: 88 },
  { id: "plastik", name: "Plastik", colorVar: "plastic", levelPct: 34 },
  { id: "shisha", name: "Shisha", colorVar: "glass", levelPct: 61 },
  { id: "rezina", name: "Rezina", colorVar: "rezina", levelPct: 15 },
  { id: "organik", name: "Organik", colorVar: "organik", levelPct: 95 },
  { id: "metall", name: "Metall", colorVar: "metall", levelPct: 47 },
];

export const wasteCategories: WasteCategory[] = [
  {
    id: "qogoz",
    name: "Qog'oz",
    description: "Gazeta, karton, ofis qog'ozlari",
    colorVar: "paper",
    iconPath: "M4 4h16v16H4z M4 9h16M9 4v16",
  },
  {
    id: "plastik",
    name: "Plastik",
    description: "Butilka, paket, idishlar",
    colorVar: "plastic",
    iconPath: "M8 3h8l1 5H7l1-5Z M7 8h10l-1 13H8L7 8Z",
  },
  {
    id: "shisha",
    name: "Shisha",
    description: "Butilka va shisha idishlar",
    colorVar: "glass",
    iconPath: "M9 2h6v6l3 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2l3-12V2Z",
  },
  {
    id: "rezina",
    name: "Rezina",
    description: "Shina va rezina mahsulotlar",
    colorVar: "rezina",
    iconPath: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0 M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  },
  {
    id: "organik",
    name: "Organik",
    description: "Sabzavot po'stlog'i va shu kabilar",
    colorVar: "organik",
    iconPath: "M12 3c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9Z",
  },
  {
    id: "metall",
    name: "Metall",
    description: "Bankalar va konserva idishlari",
    colorVar: "metall",
    iconPath: "M4 7l8-4 8 4v10l-8 4-8-4V7Z M4 7l8 4 8-4M12 11v10",
  },
];

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Saralang va tashlang",
    description: "Chiqindini to'g'ri bo'limga tashlaysiz — qog'oz, plastik, shisha, rezina, organik yoki metall.",
  },
  {
    num: "02",
    title: "Sensor aniqlaydi",
    description: "Konteyner og'irlikni o'lchaydi, hisobingizga ball yozadi va to'lganda mashinaga signal beradi.",
  },
  {
    num: "03",
    title: "Ballarni ishlating",
    description: "Kuponga almashtiring yoki to'g'ridan-to'g'ri elektr, gaz to'lovingizga yo'naltiring.",
  },
];

export const stats: StatItem[] = [
  { value: "14,8", unit: "mln t", label: "2024-yilda yuzaga kelgan maishiy chiqindi hajmi" },
  { value: "6,1", unit: "%", label: "Shundan qayta ishlangan ulush — o'sish uchun katta imkoniyat" },
  { value: "2", unit: "trln so'm", label: "So'nggi 3 yilda sohaga yo'naltirilgan davlat mablag'i" },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, mahalla: "Chilonzor-9", scoreTons: 842, progressPct: 92 },
  { rank: 2, mahalla: "Yunusobod-11", scoreTons: 761, progressPct: 80 },
  { rank: 3, mahalla: "Sergeli-4", scoreTons: 690, progressPct: 71 },
];