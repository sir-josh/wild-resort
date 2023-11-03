import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qujwpovtobfewqhbslpa.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabaseKey =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1andwb3Z0b2JmZXdxaGJzbHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjkwODQsImV4cCI6MjAxNDUwNTA4NH0._6aSkmrIOQM7TM1Kybjb3DJ0XT6SN1taixIkW_X0PIU";
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
