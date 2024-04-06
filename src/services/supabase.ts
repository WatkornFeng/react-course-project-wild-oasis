import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ivcvrytmvpnedlgtbghz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2Y3ZyeXRtdnBuZWRsZ3RiZ2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1Njc4MjIsImV4cCI6MjAxNDE0MzgyMn0.UNCee5oyMavlK2yJ_UsA0eRRtozJHmCrzROP9s0-b3Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
