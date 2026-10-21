import { createClient, type Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

// Publishable key is meant to ship in the app; row-level security (supabase/setup.sql) protects the data.
export const supabase = createClient(
  'https://smbywxloqusoasormzgg.supabase.co',
  'sb_publishable_AhuEVlFhU_I2fmgSX3DQuw_FpKD4g1p',
)

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  return session
}
