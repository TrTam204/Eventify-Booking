import { Link } from 'react-router-dom'
import Hero from '../components/landing/Hero'
import AboutSection from '../components/landing/AboutSection'
import IngredientsAnimation from '../components/landing/IngredientsAnimation'
import ServicesSection from '../components/landing/ServicesSection'
import HowItWorks from '../components/landing/HowItWorks'
import GalleryPreview from '../components/landing/GalleryPreview'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import BlogPreview from '../components/landing/BlogPreview'
import PoliciesSection from '../components/landing/PoliciesSection'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Hero />
      <AboutSection />
      <IngredientsAnimation />
      <ServicesSection />
      <HowItWorks />
      <GalleryPreview />
      <TestimonialsSection />
      <BlogPreview />
      <PoliciesSection />

      {/* CTA / Reserve section */}
      <section className="dark-section section-pad">
        <div className="container-wide">
          <div className="studio-grid">

            {/* Media */}
            <motion.div
              className="studio-media"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <img src="/assets/hands-babysbreath.jpg" alt="Bridal hands with henna and baby's breath" />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.14 }}
            >
              <p className="eyebrow">{t('home.reserve_eyebrow')}</p>
              <h2
                className="display"
                style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)', marginTop: '1rem', marginBottom: '1.1rem' }}
              >
                {t('home.reserve_title')}
              </h2>
              <p className="lead">
                {t('home.reserve_desc')}
              </p>

              <div className="facts">
                <div className="fact">
                  <span className="k">{t('home.reserve_by_appointment')}</span>
                  <span className="v">{t('home.reserve_slots')}</span>
                </div>
                <div className="fact">
                  <span className="k">{t('home.reserve_to_confirm')}</span>
                  <span className="v">{t('home.reserve_deposit')}</span>
                </div>
                <div className="fact">
                  <span className="k">{t('home.reserve_reach_us')}</span>
                  <span className="v">
                    <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'your@email.com'}`} style={{ transition: 'color 0.3s var(--ease)' }}>
                      {import.meta.env.VITE_CONTACT_EMAIL || 'your@email.com'}
                    </a>
                  </span>
                </div>
              </div>

              <Link to="/book" className="btn btn-primary">
                {t('home.reserve_cta')}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
