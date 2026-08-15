import { supabase } from "./supabaseClient";
import type { ContainerLocation, ProfileUser } from "../types";

// MISOL 1 — Konteynerlarni Supabase'dan olish.
// Hozir src/data/content.ts dagi statik `containers` massivi ishlatilyapti.
// Backend tayyor bo'lgach, MapPage.tsx va DriverPage.tsx da shu funksiyani
// chaqirib, natijasini useState/useEffect bilan saqlaysiz.
export async function fetchContainers(mahallaId: string): Promise<ContainerLocation[]> {
  const { data: containers, error: containersError } = await supabase
    .from("containers")
    .select("id, name, latitude, longitude")
    .eq("mahalla_id", mahallaId);

  if (containersError) throw containersError;

  const { data: readings, error: readingsError } = await supabase
    .from("bin_readings")
    .select("container_id, category, level_pct");

  if (readingsError) throw readingsError;

  return (containers ?? []).map((c) => {
    const bins = (readings ?? [])
      .filter((r) => r.container_id === c.id)
      .map((r) => ({
        id: r.category,
        name: r.category,
        colorVar: r.category,
        levelPct: r.level_pct,
      }));
    const maxLevel = Math.max(0, ...bins.map((b) => b.levelPct));
    const overallStatus =
      maxLevel >= 80 ? "tola" : maxLevel >= 40 ? "yarim" : "bosh";

    return {
      id: c.id,
      name: c.name,
      x: 0,
      y: 0,
      distanceM: 0,
      overallStatus,
      bins,
    } satisfies ContainerLocation;
  });
}

// MISOL 2 — Joriy foydalanuvchi profilini olish.
// Hozir src/data/content.ts dagi statik `profileUser` ishlatilyapti.
export async function fetchMyProfile(): Promise<ProfileUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, phone, points, mahallas(name)")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    name: data.full_name,
    phone: data.phone,
    mahalla: "",
    memberSince: "",
    points: data.points,
    rankInMahalla: 0,
  };
}