import { Link, useParams } from 'react-router-dom'
import { eventServices, formatVnd } from '../constants/eventServices'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = eventServices.find((item) => item.slug === slug)

  if (!service) {
    return (
      <div className="page-shell">
        <div className="container-wide section-pad page-content">
          <div className="info-card">
            <p className="eyebrow-dark">Dịch vụ</p>
            <h1 className="page-title">Không tìm thấy dịch vụ</h1>
            <p className="page-copy">Dịch vụ bạn đang tìm không tồn tại hoặc đã được cập nhật.</p>
            <Link to="/services" className="btn btn-primary">Quay lại danh sách</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <div className="container-wide section-pad page-content detail-page">
        <div className="detail-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/services">Dịch vụ</Link>
          <span>/</span>
          <span>{service.name}</span>
        </div>

        <div className="detail-hero">
          <img src={service.image} alt={service.name} />
          <div className="detail-copy">
            <p className="eyebrow eyebrow-dark">{service.category}</p>
            <h1 className="page-title">{service.name}</h1>
            <p className="page-copy">{service.description}</p>

            <div className="detail-meta">
              <div>
                <span>Giá từ</span>
                <strong>{formatVnd(service.priceFrom)}</strong>
              </div>
              <div>
                <span>Thời lượng</span>
                <strong>{service.duration}</strong>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/book" className="btn btn-primary">Đặt dịch vụ</Link>
              <Link to="/services" className="btn btn-ghost">Quay lại</Link>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>Điểm nổi bật</h2>
          <ul className="feature-list">
            {service.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
