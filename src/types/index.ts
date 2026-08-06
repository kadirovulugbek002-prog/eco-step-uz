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