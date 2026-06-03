import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  LayoutDashboard, CalendarDays, Users, Clock,
  Image, MessageSquare, BookOpen, BarChart3, Gift, Settings, LogOut,
} from 'lucide-react'

const LINKS = [
  { to: '/admin',                  label: 'Dashboard',     icon: LayoutDashboard, exact: true },
  { to: '/admin/bookings',         label: 'Bookings',      icon: CalendarDays },
  { to: '/admin/customers',        label: 'Customers',     icon: Users },
  { to: '/admin/waitlist',         label: 'Waitlist',      icon: Clock },
  { to: '/admin/gallery',          label: 'Gallery',       icon: Image },
  { to: '/admin/testimonials',     label: 'Reviews',       icon: MessageSquare },
  { to: '/admin/blog',             label: 'Blog',          icon: BookOpen },
  { to: '/admin/analytics',        label: 'Analytics',     icon: BarChart3 },
  { to: '/admin/vouchers',         label: 'Vouchers',      icon: Gift },
  { to: '/admin/settings',         label: 'Settings',      icon: Settings },
]

export default function AdminSidebar() {
  const { signOut } = useAuth()
  const navigate    = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const linkStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
    borderRadius: 8, textDecoration: 'none', fontFamily: '"DM Sans"', fontSize: 13,
    background: isActive ? 'rgba(181,147,90,0.15)' : 'transparent',
    color: isActive ? '#B5935A' : 'rgba(250,247,242,0.7)',
    transition: 'all 0.2s ease',
    marginBottom: 2,
  })

  return (
    <aside style={{ width: 220, background: '#1A0F07', height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', padding: '24px 12px', flexShrink: 0, overflowY: 'auto' }}>
      {/* Logo */}
      <div style={{ padding: '0 8px 24px', borderBottom: '1px solid rgba(250,247,242,0.08)', marginBottom: 16 }}>
        <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 16, color: '#FAF7F2', fontWeight: 600 }}>YourBusiness</div>
        <div style={{ fontFamily: '"DM Sans"', fontSize: 10, color: 'rgba(250,247,242,0.4)', marginTop: 2, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin Portal</div>
      </div>

      {/* Links */}
      <nav style={{ flex: 1 }}>
        {LINKS.map(({ to, label, icon: Icon, exact }) => (
          <NavLink key={to} to={to} end={exact}>
            {({ isActive }) => (
              <div style={linkStyle(isActive)}>
                <Icon size={16} />
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sign out */}
      <button onClick={handleSignOut}
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: '"DM Sans"', fontSize: 13, background: 'transparent', color: 'rgba(250,247,242,0.4)', width: '100%' }}>
        <LogOut size={16} /> Sign Out
      </button>
    </aside>
  )
}
