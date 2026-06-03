import { useState, useEffect } from 'react'
import { supabase, isOffline } from '../lib/supabase'

export function useAuth() {
  const [session, setSession]   = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const localSession = localStorage.getItem('app_mock_session')
    if (localSession) {
      setSession(JSON.parse(localSession))
      setLoading(false)
      return
    }

    if (isOffline) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (isOffline) {
      // Mock login for development/offline mode
      // Replace with your own admin email to test locally
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
      if (email === adminEmail) {
        const mockSession = { user: { email } }
        localStorage.setItem('app_mock_session', JSON.stringify(mockSession))
        setSession(mockSession)
        return { data: { session: mockSession }, error: null }
      } else {
        return { data: null, error: new Error('Invalid credentials') }
      }
    }

    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    localStorage.removeItem('app_mock_session')
    setSession(null)

    if (isOffline) {
      return { error: null }
    }
    return supabase.auth.signOut()
  }

  return { session, loading, signIn, signOut, isAdmin: !!session }
}
