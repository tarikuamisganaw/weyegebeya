
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfvcmxwvvqvmnpikczag.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdmNteHd2dnF2bW5waWtjemFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4NjcwMTksImV4cCI6MjAwNTQ0MzAxOX0._WxJB6PfZOegJ4ZZUUTjHiw89Pzz8X0acMHfCMEJp0c'
export  const supabase = createClient(supabaseUrl, supabaseKey)