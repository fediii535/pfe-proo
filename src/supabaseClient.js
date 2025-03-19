// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqsmncnionhuabpchxve.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxc21uY25pb25odWFicGNoeHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTQxNjAsImV4cCI6MjA1Nzg3MDE2MH0.FfggXHDx6CiflJpnZhtf4NjeWEIiELIErK4GunWeEbU';
export const supabase = createClient(supabaseUrl, supabaseKey);