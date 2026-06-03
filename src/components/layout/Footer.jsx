import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail } from 'lucide-react'

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3"/>
  </svg>
)

const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

// Configure these values in your .env file
const CONTACT_EMAIL    = import.meta.env.VITE_CONTACT_EMAIL    || 'your@email.com'
const CONTACT_PHONE    = import.meta.env.VITE_CONTACT_PHONE    || '+1234567890'
const INSTAGRAM_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || 'your-business'
const FACEBOOK_HANDLE  = import.meta.env.VITE_FACEBOOK_HANDLE  || 'your-business'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <img
              src="/assets/logo.png"
              alt="YourBusiness"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="footer-name">{t('brand.name', 'YourBusiness')}</p>
              <p className="footer-tag">{t('footer.tagline')}</p>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <span className="col-head">{t('footer.explore', 'Explore')}</span>
            {[
              { to: '/',         label: t('nav.home')          },
              { to: '/gallery',  label: t('nav.gallery')       },
              { to: '/lookbook', label: t('nav.lookbook')      },
              { to: '/blog',     label: t('nav.blog')          },
              { to: '/book',     label: t('booking.title')     },
              { to: '/voucher',  label: t('voucher.nav_title', 'Gift vouchers') },
            ].map(l => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>

          {/* Connect */}
          <div className="footer-col">
            <span className="col-head">{t('footer.follow')}</span>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={13} /> {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={13} /> {CONTACT_PHONE}
            </a>
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '0.4rem' }}>
              <a
                href={`https://www.instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1px solid var(--line-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-soft)',
                  transition: 'border-color 0.3s var(--ease), color 0.3s var(--ease)',
                }}
              >
                <IconInstagram />
              </a>
              <a
                href={`https://www.facebook.com/${FACEBOOK_HANDLE}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1px solid var(--line-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-soft)',
                  transition: 'border-color 0.3s var(--ease), color 0.3s var(--ease)',
                }}
              >
                <IconFacebook />
              </a>
            </div>
          </div>

        </div>

        {/* Base row */}
        <div className="footer-base">
          <span>© {new Date().getFullYear()} · {t('footer.rights')}</span>
          <span className="footer-flourish">adornment</span>
          <Link
            to="/admin/login"
            style={{ fontSize: '0.66rem', letterSpacing: '0.1em', color: 'var(--text-dim)', opacity: 0.4, textDecoration: 'none' }}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
