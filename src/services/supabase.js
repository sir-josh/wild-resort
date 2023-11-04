import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qujwpovtobfewqhbslpa.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
