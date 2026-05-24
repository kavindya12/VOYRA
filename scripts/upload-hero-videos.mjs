/**
 * Upload hero MP4s to Supabase Storage (run once from project root).
 *
 * Requires in .env:
 *   VITE_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...  (Settings → API → service_role — keep secret)
 *
 * Usage: node scripts/upload-hero-videos.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const videosDir = join(root, 'public', 'videos')
const bucket = 'hero-videos'
const files = ['hero-1.mp4', 'hero-2.mp4', 'hero-3.mp4']

function loadEnv() {
  const envPath = join(root, '.env')
  if (!existsSync(envPath)) {
    console.error('Missing .env — add VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }
  const text = readFileSync(envPath, 'utf8')
  const env = {}
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
  }
  return env
}

const env = loadEnv()
const url = env.VITE_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

for (const name of files) {
  const path = join(videosDir, name)
  if (!existsSync(path)) {
    console.warn(`Skip (not found): ${name}`)
    continue
  }

  const body = readFileSync(path)
  console.log(`Uploading ${name} (${(body.length / 1024 / 1024).toFixed(1)} MB)...`)

  const { error } = await supabase.storage.from(bucket).upload(name, body, {
    contentType: 'video/mp4',
    upsert: true,
  })

  if (error) {
    console.error(`Failed ${name}:`, error.message)
  } else {
    const publicUrl = `${url}/storage/v1/object/public/${bucket}/${name}`
    console.log(`OK: ${publicUrl}`)
  }
}

console.log('Done. Restart npm run dev and hard-refresh the homepage.')
