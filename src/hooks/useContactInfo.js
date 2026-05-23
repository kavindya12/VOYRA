import { useEffect, useState } from 'react'
import { fetchContactInfo } from '../supabase/contactService'

export function useContactInfo() {
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      const { data, usingDemo: demo } = await fetchContactInfo()
      if (!cancelled) {
        setContact(data)
        setUsingDemo(demo)
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { contact, loading, usingDemo }
}
