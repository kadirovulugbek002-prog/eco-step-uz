import { supabase } from "./supabaseClient";
import type { ContainerLocation, OverallStatus } from "../types";

const CATEGORY_META: Record<string, { name: string; colorVar: string }> = {
  qogoz: { name: "Qog'oz", colorVar: "paper" },
  plastik: { name: "Plastik", colorVar: "plastic" },
  shisha: { name: "Shisha", colorVar: "glass" },
  rezina: { name: "Rezina", colorVar: "rezina" },
  organik: { name: "Organik", colorVar: "organik" },
  metall: { name: "Metall", colorVar: "metall" },
};

function overallFrom(levels: number[]): OverallStatus {
  const max = Math.max(0, ...levels);
  if (max >= 80) return "tola";
  if (max >= 40) return "yarim";
  return "bosh";
}

function haversineMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function fetchContainersForMahalla(
  mahallaId: string
): Promise<ContainerLocation[]> {
  const { data: containers, error: cErr } = await supabase
    .from("containers")
    .select("id, name, latitude, longitude")
    .eq("mahalla_id", mahallaId);

  if (cErr) throw cErr;
  if (!containers || containers.length === 0) return [];

  const ids = containers.map((c) => c.id);

  const { data: readings, error: rErr } = await supabase
    .from("bin_readings")
    .select("container_id, category, level_pct")
    .in("container_id", ids);

  if (rErr) throw rErr;

  const lats = containers.map((c) => c.latitude);
  const lngs = containers.map((c) => c.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  const centroidLat = lats.reduce((a, b) => a + b, 0) / lats.length;
  const centroidLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;

  return containers.map((c) => {
    const bins = (readings ?? [])
      .filter((r) => r.container_id === c.id)
      .map((r) => {
        const meta = CATEGORY_META[r.category] ?? {
          name: r.category,
          colorVar: r.category,
        };
        return {
          id: r.category,
          name: meta.name,
          colorVar: meta.colorVar,
          levelPct: r.level_pct,
        };
      });

    const x = 10 + ((c.longitude - minLng) / lngRange) * 80;
    const y = 10 + ((maxLat - c.latitude) / latRange) * 80;

    const distanceM = Math.round(
      haversineMeters(centroidLat, centroidLng, c.latitude, c.longitude)
    );

    return {
      id: c.id,
      name: c.name,
      x,
      y,
      distanceM,
      overallStatus: overallFrom(bins.map((b) => b.levelPct)),
      bins,
    } satisfies ContainerLocation;
  });
}