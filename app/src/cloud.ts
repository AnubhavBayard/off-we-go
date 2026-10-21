import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { createClient, type Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

// Publishable key is meant to ship in the app; row-level security (supabase/setup.sql) protects the data.
export const supabase = createClient(
  'https://smbywxloqusoasormzgg.supabase.co',
  'sb_publishable_AhuEVlFhU_I2fmgSX3DQuw_FpKD4g1p',
  { auth: { flowType: 'pkce', detectSessionInUrl: !Capacitor.isNativePlatform() } },
)

// Email login link lands here; the Android manifest routes this scheme back into the app.
// ponytail: link must be opened on the same phone that asked for it (PKCE verifier lives there).
export const LOGIN_REDIRECT = Capacitor.isNativePlatform() ? 'com.offwego.app://login' : location.origin

export function listenForLoginLinks(onDone: (error: string | null) => void) {
  if (!Capacitor.isNativePlatform()) return
  App.addListener('appUrlOpen', async ({ url }) => {
    if (!url.startsWith(LOGIN_REDIRECT)) return
    const params = new URL(url).searchParams
    const code = params.get('code')
    if (!code) return onDone(params.get('error_description') ?? 'Login link was invalid or expired.')
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    onDone(error?.message ?? null)
  })
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  return session
}
