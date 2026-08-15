import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase sozlamalari topilmadi. Loyiha papkasida .env faylini yarating " +
      "(.env.example'dan nusxa oling) va VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY " +
      "qiymatlarini Lovable/Supabase loyihangizdan qo'ying."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);