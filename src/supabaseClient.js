// filepath: c:\Users\USER\pfe-pro\src\supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rtwjvcszpujrevxutmbz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0d2p2Y3N6cHVqcmV2eHV0bWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Njg3NzUsImV4cCI6MjA1ODA0NDc3NX0.dZHWLUpqced-jtLnmjB4Kj9-zzTZZLy_48iF25jibDw';
export const supabase = createClient(supabaseUrl, supabaseKey);