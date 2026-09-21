import { Link, useParams } from 'react-router-dom'
import { photographyPackages, formatVnd } from '../constants/photography'

export default function PhotographyDetail() {
  const { slug } = useParams()
  const packageItem = photographyPackages.find((item) => item.slug === slug)

  if (!packageItem) {
    return (
      <div className="page-shell">
        <div className="container-wide section-pad page-content">
          <div className="info-card">
            <p className="eyebrow-dark">Chụp hình</p>
            <h1 className="page-title">Không tìm thấy gói chụp</h1>
            <p className="page-copy">Gói chụp hình bạn muốn xem không tồn tại hoặc đã thay đổi.</p>
            <Link to="/photography" className="btn btn-primary">Quay lại danh sách</Link>
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
          <Link to="/photography">Chụp hình</Link>
          <span>/</span>
          <span>{packageItem.name}</span>
        </div>

        <div className="detail-hero">
          <img src={packageItem.image} alt={packageItem.name} />
          <div className="detail-copy">
            <p className="eyebrow eyebrow-dark">{packageItem.category}</p>
            <h1 className="page-title">{packageItem.name}</h1>
            <p className="page-copy">{packageItem.description}</p>

            <div className="detail-meta">
              <div>
                <span>Giá từ</span>
                <strong>{formatVnd(packageItem.priceFrom)}</strong>
              </div>
              <div>
                <span>Thời lượng</span>
                <strong>{packageItem.duration}</strong>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/book" className="btn btn-primary">Đặt dịch vụ</Link>
              <Link to="/photography" className="btn btn-ghost">Quay lại</Link>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>Gói bàn giao</h2>
          <ul className="feature-list">
            {packageItem.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
