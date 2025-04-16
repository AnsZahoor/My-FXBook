import { createClient } from '@supabase/supabase-js'

// Validate URL format
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
  throw new Error(`
  Invalid Supabase URL format. 
  Must be: https://[project-ref].supabase.co
  Current value: ${supabaseUrl}
  `)
}

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseAnonKey) {
  throw new Error('Missing Supabase anon key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)