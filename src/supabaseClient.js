import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vauphdrnqjzfxxcvmiiz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdXBoZHJucWp6Znh4Y3ZtaWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Mjc3NzAsImV4cCI6MjA1NjUwMzc3MH0.QYCeGe3TX3Ej3vhzHhIz8aHed_s5p7T3XVy4xCMnEdE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
