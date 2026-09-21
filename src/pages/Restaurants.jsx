import { Link } from 'react-router-dom'
import { restaurants, formatVnd } from '../constants/restaurants'

export default function Restaurants() {
  return (
    <div className="page-shell">
      <div className="container-wide section-pad page-content">
        <div className="page-hero">
          <p className="eyebrow-dark">Nhà hàng</p>
          <h1 className="page-title">Không gian ẩm thực cho sự kiện đáng nhớ</h1>
          <p className="page-copy">
            Tìm địa điểm phù hợp với phong cách tiệc, số lượng khách và cảm giác mà bạn muốn tạo ra cho ngày trọng đại.
          </p>
        </div>

        <div className="card-grid restaurant-grid">
          {restaurants.map((restaurant) => (
            <article key={restaurant.id} className="domain-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="domain-card-body">
                <span className="card-tag">Sức chứa {restaurant.capacityMin}-{restaurant.capacityMax}</span>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.shortDescription}</p>
                <div className="restaurant-meta">
                  <span>{restaurant.address}</span>
                </div>
                <div className="card-meta-row">
                  <strong>{formatVnd(restaurant.priceFrom)}</strong>
                  <span>Khởi điểm</span>
                </div>
                <div className="card-actions">
                  <Link to={`/restaurants/${restaurant.slug}`} className="btn btn-primary">Xem chi tiết</Link>
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
