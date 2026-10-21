import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_REDIRECT, supabase, useSession } from '../cloud'
import { syncMemories, useMemories } from '../memories'

export default function Account() {
  const session = useSession()
  const memories = useMemories()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  async function run(fn: () => Promise<string | null | undefined>) {
    setBusy(true)
    setMsg('')
    try {
      setMsg((await fn()) ?? '')
    } finally {
      setBusy(false)
    }
  }

  const sendLink = () =>
    run(async () => {
      const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: LOGIN_REDIRECT } })
      if (error) return error.message
      setSent(true)
      return null
    })

  const unsynced = memories?.filter((m) => !m.synced).length ?? 0

  return (
    <div className="page">
      <Link to="/memories" className="back">← Memories</Link>
      <h1>Back up memories</h1>

      {session ? (
        <>
          <p>Signed in as <b>{session.user.email}</b></p>
          <p className="muted">{unsynced === 0 ? 'All memories are backed up.' : `${unsynced} memor${unsynced === 1 ? 'y' : 'ies'} waiting to upload.`}</p>
          <div className="row">
            <button className="btn" disabled={busy} onClick={() => run(async () => (await syncMemories()) ?? 'Synced.')}>Sync now</button>
            <button className="btn" disabled={busy} onClick={() => run(async () => (await supabase.auth.signOut()).error?.message)}>Sign out</button>
          </div>
        </>
      ) : (
        <>
          <p className="muted">Sign in with your email to keep your photos safe if you lose or change your phone.</p>
          <label className="field">
            Email
            <input className="search" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={sent} />
          </label>
          {!sent ? (
            <button className="btn primary" disabled={busy || !email.includes('@')} onClick={sendLink}>Send login link</button>
          ) : (
            <>
              <p>Login link sent to <b>{email.trim()}</b>. Open that email <b>on this phone</b> and tap the link. It brings you back here signed in.</p>
              <p className="muted small">Not there? Check spam. You can request a new link after a few minutes.</p>
              <button className="btn" disabled={busy} onClick={() => setSent(false)}>Use a different email</button>
            </>
          )}
        </>
      )}
      {msg && <p className="muted">{msg}</p>}
    </div>
  )
}
