import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn }            = useAuth()
  const navigate              = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) { toast.error('Invalid credentials'); return }
    navigate('/admin')
  }

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 6, border: '1.5px solid rgba(250,247,242,0.15)', fontFamily: '"DM Sans"', fontSize: 14, background: 'rgba(250,247,242,0.05)', color: '#FAF7F2', boxSizing: 'border-box', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'rgba(250,247,242,0.04)', border: '1px solid rgba(250,247,242,0.08)', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src="/assets/logo.png" alt="Logo" style={{ height: 44, marginBottom: 12 }} onError={e => e.target.style.display='none'} />
          <h1 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 28, color: '#FAF7F2' }}>Admin Portal</h1>
          <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: 'rgba(250,247,242,0.5)', marginTop: 6 }}>YourBusiness</p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn-gold" style={{ width: '100%', padding: 14, marginTop: 8 }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
