
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qophnwtcfpoifnqrhiqm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcGhud3RjZnBvaWZucXJoaXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NzA4NTgsImV4cCI6MjAwNTQ0Njg1OH0.ZOml3KwvlzL-av4kP7fNHSOQhQIEsRRiYZXKrta2bFM'
export const SupabaseClient = createClient(supabaseUrl, supabaseKey)