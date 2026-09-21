export default function Restaurants() {
  return (
    <div className="page-shell">
      <div className="container-wide section-pad page-content">
        <p className="eyebrow-dark">Nhà hàng & sự kiện</p>
        <h1 className="display-dark page-title">Trải nghiệm ẩm thực cho sự kiện của bạn</h1>
        <p className="lead-dark page-copy">
          Từ tiệc thân mật đến sự kiện doanh nghiệp, chúng tôi kết nối bạn với không gian ăn uống, món ăn và đội ngũ tổ chức đồng bộ với tổng thể sự kiện.
        </p>

        <div className="feature-grid">
          <article className="info-card">
            <h2>Không gian tiệc</h2>
            <p>Chỗ ngồi, phong cách trang trí và âm thanh phù hợp cho các dịp sang trọng hoặc gần gũi.</p>
          </article>
          <article className="info-card">
            <h2>Thực đơn tùy chỉnh</h2>
            <p>Chọn món ăn theo khẩu vị, phong cách và số lượng khách mời cho mỗi sự kiện.</p>
          </article>
          <article className="info-card">
            <h2>Đội ngũ phục vụ</h2>
            <p>Phục vụ chuyên nghiệp, đúng tiến độ và tạo trải nghiệm ẩm thực đáng nhớ.</p>
          </article>
        </div>
      </div>
    </div>
  )
}
