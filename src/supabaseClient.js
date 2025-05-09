// filepath: c:\Users\USER\pfe-pro\src\supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko';
export const supabase = createClient(supabaseUrl, supabaseKey);