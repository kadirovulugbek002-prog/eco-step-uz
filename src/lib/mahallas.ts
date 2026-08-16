import { supabase } from "./supabaseClient";

export interface MahallaListItem {
  id: string;
  name: string;
  residentCount: number;
}

export async function fetchMahallaList(): Promise<MahallaListItem[]> {
  const { data, error } = await supabase
    .from("mahallas")
    .select("id, name, resident_count")
    .order("name");

  if (error) throw error;

  return (data ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    residentCount: m.resident_count,
  }));
}