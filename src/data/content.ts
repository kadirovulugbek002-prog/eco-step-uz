import type {
  BinReading,
  WasteCategory,
  LeaderboardEntry,
  ProcessStep,
  StatItem,
  ProfileUser,
  PointsTransaction,
  SettingsItem,
  ContainerLocation,
  MahallaRanking,
  RewardItem,
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

export const profileUser: ProfileUser = {
  name: "Ulug'bek Qodirov",
  phone: "90 123 45 67",
  mahalla: "Chilonzor-9",
  memberSince: "Avgust 2026",
  points: 2450,
  rankInMahalla: 4,
};

export const pointsHistory: PointsTransaction[] = [
  {
    id: "t1",
    kind: "topup",
    label: "Qog'oz topshirildi — Konteyner №14",
    points: 120,
    date: "5-avgust",
  },
  {
    id: "t2",
    kind: "topup",
    label: "Plastik topshirildi — Konteyner №14",
    points: 80,
    date: "3-avgust",
  },
  {
    id: "t3",
    kind: "redeem",
    label: "Kupon: jamoat transporti",
    points: -300,
    date: "1-avgust",
  },
  {
    id: "t4",
    kind: "topup",
    label: "Organik chiqindi topshirildi",
    points: 60,
    date: "30-iyul",
  },
  {
    id: "t5",
    kind: "redeem",
    label: "Elektr to'lovi qarziga o'tkazildi",
    points: -500,
    date: "24-iyul",
  },
];

export const settingsItems: SettingsItem[] = [
  { id: "lang", label: "Til", value: "O'zbekcha", type: "link" },
  { id: "notif", label: "Bildirishnomalar", type: "toggle" },
  { id: "mahalla", label: "Mahallani o'zgartirish", type: "link" },
  { id: "help", label: "Yordam va aloqa", type: "link" },
];

function makeBins(levels: number[]): BinReading[] {
  const meta: Array<{ id: string; name: string; colorVar: string }> = [
    { id: "qogoz", name: "Qog'oz", colorVar: "paper" },
    { id: "plastik", name: "Plastik", colorVar: "plastic" },
    { id: "shisha", name: "Shisha", colorVar: "glass" },
    { id: "rezina", name: "Rezina", colorVar: "rezina" },
    { id: "organik", name: "Organik", colorVar: "organik" },
    { id: "metall", name: "Metall", colorVar: "metall" },
  ];
  return meta.map((m, i) => ({ ...m, levelPct: levels[i] }));
}

function overallFrom(bins: BinReading[]): "bosh" | "yarim" | "tola" {
  const max = Math.max(...bins.map((b) => b.levelPct));
  if (max >= 80) return "tola";
  if (max >= 40) return "yarim";
  return "bosh";
}

const containerBins: BinReading[][] = [
  makeBins([88, 34, 61, 15, 95, 47]),
  makeBins([22, 18, 40, 10, 35, 25]),
  makeBins([55, 60, 30, 20, 48, 38]),
  makeBins([12, 8, 15, 5, 20, 10]),
  makeBins([90, 85, 70, 12, 92, 65]),
];

export const containers: ContainerLocation[] = [
  {
    id: "c14",
    name: "Konteyner №14",
    x: 32,
    y: 28,
    distanceM: 180,
    overallStatus: overallFrom(containerBins[0]),
    bins: containerBins[0],
  },
  {
    id: "c15",
    name: "Konteyner №15",
    x: 68,
    y: 22,
    distanceM: 340,
    overallStatus: overallFrom(containerBins[1]),
    bins: containerBins[1],
  },
  {
    id: "c16",
    name: "Konteyner №16",
    x: 50,
    y: 55,
    distanceM: 420,
    overallStatus: overallFrom(containerBins[2]),
    bins: containerBins[2],
  },
  {
    id: "c17",
    name: "Konteyner №17",
    x: 22,
    y: 72,
    distanceM: 610,
    overallStatus: overallFrom(containerBins[3]),
    bins: containerBins[3],
  },
  {
    id: "c18",
    name: "Konteyner №18",
    x: 78,
    y: 68,
    distanceM: 730,
    overallStatus: overallFrom(containerBins[4]),
    bins: containerBins[4],
  },
];

export const mahallaRankings: MahallaRanking[] = [
  { id: "m1", name: "Chilonzor-9", perCapitaKg: 18.4, growthPct: 12, isUser: true },
  { id: "m2", name: "Yunusobod-11", perCapitaKg: 21.2, growthPct: 4 },
  { id: "m3", name: "Sergeli-4", perCapitaKg: 16.7, growthPct: 22 },
  { id: "m4", name: "Mirzo Ulug'bek-3", perCapitaKg: 14.9, growthPct: 8 },
  { id: "m5", name: "Shayxontohur-7", perCapitaKg: 13.1, growthPct: 31 },
  { id: "m6", name: "Yakkasaroy-2", perCapitaKg: 11.6, growthPct: -3 },
  { id: "m7", name: "Bektemir-5", perCapitaKg: 9.8, growthPct: 15 },
];

export const rewardItems: RewardItem[] = [
  {
    id: "r1",
    name: "Jamoat transporti — 1 chipta",
    description: "Metro yoki avtobusda bir martalik bepul yo'l",
    costPoints: 150,
    category: "transport",
    emoji: "🚌",
  },
  {
    id: "r2",
    name: "Mahalliy do'kon — 10% chegirma",
    description: "Hamkor oziq-ovqat do'konida bir martalik chegirma",
    costPoints: 200,
    category: "chegirma",
    emoji: "🏷️",
  },
  {
    id: "r3",
    name: "Non yopish sexi — chegirma kuponi",
    description: "Mahalladagi non yopish sexida 15% chegirma",
    costPoints: 180,
    category: "chegirma",
    emoji: "🍞",
  },
  {
    id: "r4",
    name: "Jamoat transporti — oylik chipta",
    description: "1 oylik cheksiz metro/avtobus chiptasi",
    costPoints: 1800,
    category: "transport",
    emoji: "🎫",
  },
  {
    id: "r5",
    name: "Elektr to'lovi — 20 000 so'm",
    description: "Ballar to'g'ridan-to'g'ri elektr hisobingizga o'tkaziladi",
    costPoints: 2000,
    category: "kommunal",
    emoji: "💡",
  },
  {
    id: "r6",
    name: "Gaz to'lovi — 20 000 so'm",
    description: "Ballar to'g'ridan-to'g'ri gaz hisobingizga o'tkaziladi",
    costPoints: 2000,
    category: "kommunal",
    emoji: "🔥",
  },
  {
    id: "r7",
    name: "Bolalar uchun — planshet",
    description: "Choraklik lotereya: eng faol 50 ishtirokchi orasida",
    costPoints: 5000,
    category: "katta",
    emoji: "📱",
  },
  {
    id: "r8",
    name: "Ayollar uchun — kosmetika to'plami",
    description: "Choraklik lotereya: eng faol 50 ishtirokchi orasida",
    costPoints: 4500,
    category: "katta",
    emoji: "💄",
  },
  {
    id: "r9",
    name: "Qariyalar uchun — ko'zoynak",
    description: "Choraklik lotereya: eng faol 50 ishtirokchi orasida",
    costPoints: 3500,
    category: "katta",
    emoji: "👓",
  },
];