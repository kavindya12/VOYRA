import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  ''
).trim()

const PLACEHOLDER_PATTERN = /your-project|your-publishable|your-anon|example\.com/i

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    !PLACEHOLDER_PATTERN.test(supabaseUrl) &&
    !PLACEHOLDER_PATTERN.test(supabaseKey)
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null
