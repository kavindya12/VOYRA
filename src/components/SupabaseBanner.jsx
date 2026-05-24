import { isSupabaseConfigured } from '../supabase/client'

export default function SupabaseBanner() {
  if (isSupabaseConfigured) return null

  const isProd = import.meta.env.PROD

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center text-sm text-amber-900">
      <strong>Supabase not configured.</strong>{' '}
      {isProd ? (
        <>
          Add <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">VITE_SUPABASE_URL</code> and{' '}
          <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">VITE_SUPABASE_PUBLISHABLE_KEY</code> in
          your host&apos;s environment settings (Vercel → Project → Settings → Environment Variables), then{' '}
          <strong>redeploy</strong>. See{' '}
          <a href="https://github.com/kavindya12/VOYRA/blob/main/README.md" className="font-semibold underline">
            README
          </a>
          .
        </>
      ) : (
        <>
          Copy <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env.example</code> to{' '}
          <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env</code>, add your Supabase URL and
          anon/publishable key from{' '}
          <a
            href="https://supabase.com/dashboard/project/_/settings/api"
            className="font-semibold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase → Settings → API
          </a>
          , then restart <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">npm run dev</code>.
        </>
      )}
    </div>
  )
}
