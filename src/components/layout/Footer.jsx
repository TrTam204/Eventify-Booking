import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@unambooking.com'
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || '+84 000 000 000'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-badge footer-badge">U</div>
            <div>
              <p className="footer-name">UnAm Booking</p>
              <p className="footer-tag">Tiệc cưới • Sinh nhật • Makeup • Chụp hình • Nhà hàng</p>
            </div>
          </div>

          <div className="footer-col">
            <span className="col-head">Dịch vụ</span>
            <Link to="/services">Tiệc cưới</Link>
            <Link to="/services">Sinh nhật</Link>
            <Link to="/services">Makeup</Link>
            <Link to="/photography">Chụp hình</Link>
            <Link to="/restaurants">Nhà hàng</Link>
          </div>

          <div className="footer-col">
            <span className="col-head">Hỗ trợ</span>
            <Link to="/guide">Hướng dẫn đặt dịch vụ</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Liên hệ</Link>
          </div>

          <div className="footer-col">
            <span className="col-head">Thông tin</span>
            <Link to="/about">Về chúng tôi</Link>
            <Link to="/gallery">Thư viện</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={13} /> {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE}`}>
              <Phone size={13} /> {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 UnAm Booking. All rights reserved.</span>
          <Link to="/admin/login" className="admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
