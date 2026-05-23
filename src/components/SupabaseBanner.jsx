import { isSupabaseConfigured } from '../supabase/client'

export default function SupabaseBanner() {
  if (isSupabaseConfigured) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center text-sm text-amber-900">
      <strong>Supabase not configured.</strong> Copy <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env.example</code> to{' '}
      <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env</code> and add your project URL and publishable key. See README for setup steps.
    </div>
  )
}
