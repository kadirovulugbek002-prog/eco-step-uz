export type BinStatus = "bosh" | "yarim" | "tola";

export interface BinReading {
  id: string;
  name: string;
  colorVar: string;
  levelPct: number;
}

export interface WasteCategory {
  id: string;
  name: string;
  description: string;
  colorVar: string;
  iconPath: string;
}

export interface LeaderboardEntry {
  rank: number;
  mahalla: string;
  scoreTons: number;
  progressPct: number;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  unit: string;
  label: string;
}

export type AuthStep = "phone" | "code" | "success";

export interface ProfileUser {
  name: string;
  phone: string;
  mahalla: string;
  memberSince: string;
  points: number;
  rankInMahalla: number;
}

export type TransactionKind = "topup" | "redeem";

export interface PointsTransaction {
  id: string;
  kind: TransactionKind;
  label: string;
  points: number;
  date: string;
}

export interface SettingsItem {
  id: string;
  label: string;
  value?: string;
  type: "link" | "toggle";
}

export type OverallStatus = "bosh" | "yarim" | "tola";

export interface ContainerLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  distanceM: number;
  overallStatus: OverallStatus;
  bins: BinReading[];
}

export type RankingMode = "umumiy" | "osish";

export interface MahallaRanking {
  id: string;
  name: string;
  perCapitaKg: number;
  growthPct: number;
  isUser?: boolean;
}

export type RewardCategory = "chegirma" | "transport" | "kommunal" | "katta";

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  costPoints: number;
  category: RewardCategory;
  emoji: string;
}