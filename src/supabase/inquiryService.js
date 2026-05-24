import { getDemoTourById, mergeWithDemoDetails, normalizeTourId } from '../data/demoTours'
import { supabase, isSupabaseConfigured } from './client'
import { mapTourFromDb } from './tourMapper'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function submitInquiry(payload) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add credentials to your .env file.')
  }

  const { error } = await supabase.from('inquiries').insert([payload])
  if (error) throw error
}

export async function fetchTours({ limit } = {}) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: [], error: new Error('Supabase is not configured. Add credentials to your .env file.') }
  }

  let query = supabase.from('tours').select('*').order('title')
  if (limit) query = query.limit(limit)

  const { data, error } = await query
  const tours = (data ?? []).map(mapTourFromDb).filter(Boolean)
  return { data: tours, error }
}

async function fetchTourRowByIdOrSlug(id) {
  const { data: bySlug, error: slugError } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', id)
    .maybeSingle()

  if (bySlug) return { data: bySlug, error: null }
  if (slugError) return { data: null, error: slugError }

  if (UUID_REGEX.test(id)) {
    const { data, error } = await supabase.from('tours').select('*').eq('id', id).maybeSingle()
    return { data, error }
  }

  return { data: null, error: null }
}

export async function fetchTourById(id) {
  const tourId = normalizeTourId(id)
  if (!tourId) {
    return { data: null, error: new Error('Invalid tour id') }
  }

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await fetchTourRowByIdOrSlug(tourId)
    if (data) {
      const mapped = mapTourFromDb(data)
      return { data: mergeWithDemoDetails(mapped), error: null }
    }
    // On Supabase errors (bad key, RLS, network), still try demo data so the site works
    if (error) {
      console.warn('[Voyra] fetchTourById:', error.message)
    }
  }

  const demoTour = getDemoTourById(tourId)
  if (demoTour) {
    return { data: mergeWithDemoDetails(demoTour), error: null }
  }

  return { data: null, error: new Error('Tour not found') }
}
