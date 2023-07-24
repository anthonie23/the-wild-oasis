import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mxrucoxrcnsdqobnhdjf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cnVjb3hyY25zZHFvYm5oZGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyMzAyOTQsImV4cCI6MjAwNDgwNjI5NH0.65nHrMHU308HJ26bDADkSweLybx1XXi4bkEuAeAwgqk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
