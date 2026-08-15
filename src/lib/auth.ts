import { supabase } from "./supabaseClient";

export interface MahallaOption {
  id: string;
  name: string;
}

export interface DbProfile {
  id: string;
  full_name: string;
  email: string;
  mahalla_id: string;
  points: number;
  role: string;
  created_at: string;
}

/* =========================
   REGISTER
========================= */

export async function registerUser(
  email: string,
  password: string
): Promise<void> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (!data.user) {
    throw new Error("Foydalanuvchi yaratilmadi.");
  }
}

/* =========================
   LOGIN
========================= */

export async function loginUser(
  email: string,
  password: string
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}

/* =========================
   LOGOUT
========================= */

export async function logoutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

/* =========================
   CURRENT USER
========================= */

export async function getMyProfile(): Promise<DbProfile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, mahalla_id, points, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

/* =========================
   CREATE PROFILE
========================= */

export async function createProfile(
  fullName: string,
  mahallaId: string
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Foydalanuvchi tizimga kirmagan.");
  }

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    full_name: fullName,
    email: user.email,
    mahalla_id: mahallaId,
    points: 0,
  });

  if (error) throw error;
}

/* =========================
   MAHALLALAR
========================= */

export async function fetchMahallas(): Promise<MahallaOption[]> {
  const { data, error } = await supabase
    .from("mahallas")
    .select("id, name")
    .order("name");

  if (error) throw error;

  return data ?? [];
}

/* =========================
   BITTA MAHALLA NOMI
========================= */

export async function fetchMahallaName(mahallaId: string): Promise<string> {
  const { data, error } = await supabase
    .from("mahallas")
    .select("name")
    .eq("id", mahallaId)
    .maybeSingle();

  if (error) throw error;
  return data?.name ?? "";
}