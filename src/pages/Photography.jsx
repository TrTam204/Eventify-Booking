import { Link } from 'react-router-dom'
import { photographyPackages, formatVnd } from '../constants/photography'

export default function Photography() {
  return (
    <div className="page-shell">
      <div className="container-wide section-pad page-content">
        <div className="page-hero">
          <p className="eyebrow-dark">Chụp hình</p>
          <h1 className="page-title">Gói chụp hình cho sự kiện, cưới hỏi và chân dung</h1>
          <p className="page-copy">
            Ghi lại khoảnh khắc đẹp bằng ánh sáng hợp lý, góc chụp tự nhiên và phong cách hiện đại cho mọi dịp đặc biệt.
          </p>
        </div>

        <div className="card-grid photography-grid">
          {photographyPackages.map((item) => (
            <article key={item.id} className="domain-card">
              <img src={item.image} alt={item.name} />
              <div className="domain-card-body">
                <span className="card-tag">{item.category}</span>
                <h2>{item.name}</h2>
                <p>{item.shortDescription}</p>
                <div className="card-meta-row">
                  <strong>{formatVnd(item.priceFrom)}</strong>
                  <span>{item.duration}</span>
                </div>
                <div className="card-actions">
                  <Link to={`/photography/${item.slug}`} className="btn btn-primary">Xem chi tiết</Link>
                  <Link to="/book" className="btn btn-ghost">Đặt ngay</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
