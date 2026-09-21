import { Link } from 'react-router-dom'
import { eventServices, eventServiceCategories, formatVnd } from '../constants/eventServices'

const filters = ['Tất cả', ...eventServiceCategories]

export default function Services() {
  return (
    <div className="page-shell">
      <div className="container-wide section-pad page-content">
        <div className="page-hero">
          <p className="eyebrow-dark">Dịch vụ</p>
          <h1 className="page-title">Dịch vụ sự kiện cho mọi khoảnh khắc quan trọng</h1>
          <p className="page-copy">
            Từ tiệc cưới, sinh nhật đến makeup và trang trí sự kiện, UnAm Booking mang đến giải pháp chuyên nghiệp với phong cách tối giản, hiện đại và dễ đặt lịch.
          </p>
        </div>

        <div className="filter-bar">
          {filters.map((filter) => (
            <button key={filter} type="button" className="filter-pill">
              {filter}
            </button>
          ))}
        </div>

        <div className="card-grid service-grid">
          {eventServices.map((service) => (
            <article key={service.id} className="domain-card">
              <img src={service.image} alt={service.name} />
              <div className="domain-card-body">
                <span className="card-tag">{service.category}</span>
                <h2>{service.name}</h2>
                <p>{service.shortDescription}</p>
                <div className="card-meta-row">
                  <strong>{formatVnd(service.priceFrom)}</strong>
                  <span>{service.duration}</span>
                </div>
                <div className="card-actions">
                  <Link to={`/services/${service.slug}`} className="btn btn-primary">Xem chi tiết</Link>
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
