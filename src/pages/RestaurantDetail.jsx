import { Link, useParams } from 'react-router-dom'
import { restaurants, formatVnd } from '../constants/restaurants'

export default function RestaurantDetail() {
  const { slug } = useParams()
  const restaurant = restaurants.find((item) => item.slug === slug)

  if (!restaurant) {
    return (
      <div className="page-shell">
        <div className="container-wide section-pad page-content">
          <div className="info-card">
            <p className="eyebrow-dark">Nhà hàng</p>
            <h1 className="page-title">Không tìm thấy địa điểm</h1>
            <p className="page-copy">Địa điểm bạn muốn xem chưa được cập nhật.</p>
            <Link to="/restaurants" className="btn btn-primary">Quay lại danh sách</Link>
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
          <Link to="/restaurants">Nhà hàng</Link>
          <span>/</span>
          <span>{restaurant.name}</span>
        </div>

        <div className="detail-hero">
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="detail-copy">
            <p className="eyebrow eyebrow-dark">Địa điểm sự kiện</p>
            <h1 className="page-title">{restaurant.name}</h1>
            <p className="page-copy">{restaurant.description}</p>

            <div className="detail-meta">
              <div>
                <span>Giá từ</span>
                <strong>{formatVnd(restaurant.priceFrom)}</strong>
              </div>
              <div>
                <span>Sức chứa</span>
                <strong>{restaurant.capacityMin}-{restaurant.capacityMax} khách</strong>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/book" className="btn btn-primary">Đặt dịch vụ</Link>
              <Link to="/restaurants" className="btn btn-ghost">Quay lại</Link>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="info-card">
            <h2>Thông tin địa điểm</h2>
            <ul className="feature-list">
              <li><strong>Địa chỉ:</strong> {restaurant.address}</li>
              <li><strong>Sức chứa:</strong> {restaurant.capacityMin}-{restaurant.capacityMax} khách</li>
              <li><strong>Tiện ích:</strong> {restaurant.amenities.join(', ')}</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>Tiện ích</h2>
            <ul className="feature-list">
              {restaurant.amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gallery-grid compact-gallery">
          {restaurant.gallery.map((image) => (
            <img key={image} src={image} alt={restaurant.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
