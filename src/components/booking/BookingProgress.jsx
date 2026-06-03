import { useTranslation } from 'react-i18next'

export default function BookingProgress({ current }) {
  const { t } = useTranslation()

  const STEPS = [
    t('booking.step1'),
    t('booking.step2'),
    t('booking.step3'),
    t('booking.step4'),
  ]
  const displayCurrent = Math.min(current, STEPS.length)

  return (
    <div className="booking-progress">
      {STEPS.map((label, i) => {
        const num    = i + 1
        const done   = num < displayCurrent || current > STEPS.length
        const active = num === displayCurrent && current <= STEPS.length

        return (
          <div key={label} className="booking-progress-item">
            <div className="booking-progress-step">
              <div
                className="booking-progress-dot"
                style={{
                  background: done ? 'var(--accent)' : active ? 'var(--ink)' : 'transparent',
                  borderColor: done || active ? 'var(--accent)' : 'rgba(44,26,14,0.2)',
                  color: done || active ? '#FAF7F2' : 'rgba(44,26,14,0.4)',
                }}
              >
                {done ? '✓' : num}
              </div>
              <span
                className="booking-progress-label"
                style={{ color: active ? 'var(--ink)' : done ? 'var(--accent)' : 'rgba(44,26,14,0.4)' }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="booking-progress-line" style={{ background: done ? 'var(--accent)' : 'rgba(44,26,14,0.15)' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
