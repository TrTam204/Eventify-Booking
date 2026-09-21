import { Link } from 'react-router-dom'

const serviceCategories = [
  { title: 'Tiệc cưới', description: 'Trải nghiệm cưới theo phong cách riêng, từ không gian đến âm nhạc và thực đơn.', image: '/assets/bride-jhumar.jpg' },
  { title: 'Sinh nhật', description: 'Tổ chức những buổi tiệc vui, sáng tạo và đáng nhớ cho mọi độ tuổi.', image: '/assets/detail-kalire.jpg' },
  { title: 'Makeup', description: 'Makeup chuyên nghiệp cho cô dâu, chụp ảnh, sự kiện và phong cách cá nhân.', image: '/assets/floral-vine-hands.jpg' },
  { title: 'Chụp hình', description: 'Ghi lại khoảnh khắc đẹp với đội ngũ nhiếp ảnh giàu kinh nghiệm.', image: '/assets/crossed-hands-white.jpg' },
  { title: 'Nhà hàng', description: 'Không gian ẩm thực sang trọng cho sự kiện, tiệc riêng và gặp gỡ doanh nghiệp.', image: '/assets/process-applying.jpg' },
]

const featureHighlights = [
  { title: 'Dịch vụ trọn gói', description: 'Kết hợp đa dịch vụ để quy trình tổ chức sự kiện trở nên thuận tiện hơn.' },
  { title: 'Chuyên nghiệp', description: 'Đội ngũ tư vấn, lên kế hoạch và triển khai chu đáo theo từng nhu cầu.' },
  { title: 'Kinh nghiệm thực tế', description: 'Các gói đã được tối ưu cho các sự kiện cưới, sinh nhật và tiệc gia đình.' },
]

const processSteps = [
  { step: '01', title: 'Chọn dịch vụ', description: 'Lựa chọn loại sự kiện và dịch vụ phù hợp với phong cách của bạn.' },
  { step: '02', title: 'Chốt lịch', description: 'Đặt ngày, khung giờ và xác nhận thông tin đặt chỗ nhanh chóng.' },
  { step: '03', title: 'Trải nghiệm', description: 'Đảm bảo mọi chi tiết diễn ra ấn tượng và đúng kế hoạch.' },
]

const reasons = [
  'Tổng hợp dịch vụ sự kiện trong một nền tảng',
  'Hỗ trợ đặt lịch, thanh toán và xác nhận dễ dàng',
  'Thiết kế theo phong cách riêng cho từng sự kiện',
  'Đội ngũ tư vấn thân thiện và chuyên nghiệp',
]

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container-wide hero-shell">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">UnAm Booking</span>
            <h1>Khoảnh khắc đáng nhớ,<br />bắt đầu từ một lựa chọn hoàn hảo.</h1>
            <p>
              Đặt dịch vụ tiệc cưới, sinh nhật, makeup, chụp hình và nhà hàng một cách nhanh chóng, thuận tiện.
            </p>
            <div className="hero-actions">
              <Link to="/book" className="btn btn-primary">Đặt dịch vụ</Link>
              <Link to="/services" className="btn btn-ghost-light">Khám phá dịch vụ</Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Sự kiện</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Đánh giá</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Hỗ trợ</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/assets/bride-veil-blush-hero.jpg" alt="Event and lifestyle booking photography" />
            <div className="mini-card">
              <span>Đặt lịch nhanh</span>
              <strong>Tiệc cưới • Sinh nhật</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-soft">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Danh mục</p>
              <h2>Khám phá dịch vụ cho mọi khoảnh khắc</h2>
            </div>
          </div>

          <div className="category-grid">
            {serviceCategories.map((service) => (
              <article key={service.title} className="category-card">
                <img src={service.image} alt={service.title} />
                <div className="category-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/services">Xem chi tiết</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Dịch vụ nổi bật</p>
              <h2>Giải pháp sự kiện chất lượng</h2>
            </div>
            <Link to="/book" className="btn btn-primary">Đặt dịch vụ</Link>
          </div>

          <div className="feature-grid">
            {featureHighlights.map((item) => (
              <article key={item.title} className="info-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-soft">
        <div className="container-wide split-grid">
          <div className="visual-panel">
            <img src="/assets/hands-babysbreath.jpg" alt="Luxury event dining experience" />
          </div>
          <div className="content-panel">
            <p className="eyebrow eyebrow-dark">Nhà hàng nổi bật</p>
            <h2>Không gian ăn uống và tổ chức sự kiện theo phong cách hiện đại</h2>
            <p>
              Từ tiệc nhỏ đến sự kiện lớn, UnAm Booking mang đến không gian, thực đơn và phong cách phục vụ phù hợp với từng dịp đặc biệt.
            </p>
            <Link to="/restaurants" className="btn btn-primary">Khám phá nhà hàng</Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide split-grid reverse-layout">
          <div className="content-panel">
            <p className="eyebrow eyebrow-dark">Chụp hình</p>
            <h2>Ghi lại từng khoảnh khắc đẹp trong ngày trọng đại</h2>
            <p>
              Dịch vụ chụp hình của chúng tôi tập trung vào ánh sáng, góc nhìn tự nhiên và kể chuyện bằng hình ảnh, giúp sự kiện có một bộ sưu tập đẹp như ký ức.
            </p>
            <Link to="/photography" className="btn btn-primary">Xem thêm</Link>
          </div>
          <div className="visual-panel">
            <img src="/assets/crossed-hands-white.jpg" alt="Wedding photography session" />
          </div>
        </div>
      </section>

      <section className="section-pad section-soft gallery-section">
        <div className="container-wide">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Thư viện</p>
              <h2>Gợi ý cảm hứng cho sự kiện của bạn</h2>
            </div>
            <Link to="/gallery" className="btn btn-primary">Xem thư viện</Link>
          </div>

          <div className="gallery-grid">
            <img src="/assets/bride-jhumar.jpg" alt="Wedding gallery" />
            <img src="/assets/floral-vine-hands.jpg" alt="Decorative gallery" />
            <img src="/assets/detail-french-cream.jpg" alt="Event detail gallery" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Quy trình</p>
              <h2>Đặt dịch vụ chỉ với 3 bước</h2>
            </div>
          </div>

          <div className="process-grid">
            {processSteps.map((item) => (
              <article key={item.step} className="process-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-soft">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Vì sao chọn</p>
              <h2>UnAm Booking mang đến trải nghiệm đáng tin cậy</h2>
            </div>
          </div>

          <div className="reasons-grid">
            {reasons.map((reason) => (
              <div key={reason} className="reason-badge">{reason}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-wide cta-box">
          <div>
            <p className="eyebrow eyebrow-light">UnAm Booking</p>
            <h2>Hãy để sự kiện tiếp theo của bạn bắt đầu từ đây.</h2>
          </div>
          <Link to="/book" className="btn btn-primary">Đặt dịch vụ</Link>
        </div>
      </section>
    </>
  )
}
