import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Trang chủ' },
    { to: '/services', label: 'Dịch vụ' },
    { to: '/restaurants', label: 'Nhà hàng' },
    { to: '/photography', label: 'Chụp hình' },
    { to: '/gallery', label: 'Thư viện' },
    { to: '/about', label: 'Về chúng tôi' },
    { to: '/guide', label: 'Hướng dẫn' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Liên hệ' },
  ]

  return (
    <header
      className="site-header"
      style={{
        background: scrolled || pathname !== '/' ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.7)',
        borderBottom: '1px solid rgba(228,234,229,0.9)',
      }}
    >
      <div className="container-wide site-header-inner">
        <Link to="/" className="brand-mark" aria-label="UnAm Booking">
          <div className="brand-badge">U</div>
          <div>
            <div className="brand-name">UnAm Booking</div>
            <div className="brand-subtitle">Event &amp; Lifestyle Services</div>
          </div>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={pathname === link.to ? 'nav-link active' : 'nav-link'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/book" className="btn btn-primary nav-cta">
            Đặt dịch vụ
          </Link>
          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-panel">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={pathname === link.to ? 'mobile-nav-link active' : 'mobile-nav-link'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/book" className="btn btn-primary mobile-cta" onClick={() => setOpen(false)}>
            Đặt dịch vụ
          </Link>
        </div>
      )}
    </header>
  )
}
