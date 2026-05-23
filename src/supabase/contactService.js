import { DEMO_CONTACT } from '../data/demoContact'
import { supabase, isSupabaseConfigured } from './client'

function mapContactFromDb(row) {
  if (!row) return null

  const socialLinks = Array.isArray(row.social_links) ? row.social_links : []

  return {
    email: row.email,
    phone: row.phone,
    address: row.address,
    socialLinks: socialLinks.map((link) => ({
      platform: link.platform ?? '',
      url: link.url ?? '#',
      label: link.label ?? link.platform ?? 'Social',
    })),
  }
}

export async function fetchContactInfo() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: DEMO_CONTACT, error: null, usingDemo: true }
  }

  const { data, error } = await supabase.from('contact_info').select('*').eq('id', 1).maybeSingle()

  if (error) {
    return { data: DEMO_CONTACT, error, usingDemo: true }
  }

  if (!data) {
    return { data: DEMO_CONTACT, error: null, usingDemo: true }
  }

  return { data: mapContactFromDb(data), error: null, usingDemo: false }
}
