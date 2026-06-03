import { SERVICES } from '../../constants/services'
import { Gift, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ServiceSelector({ selected, coverage, onService, onCoverage, onConsultation }) {
  const { t } = useTranslation()

  return (
    <div className="booking-step-panel" style={{ padding: '40px 0 24px' }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 30, color: '#2C1A0E', marginBottom: 8 }}>{t('booking.choose_service')}</h2>
      <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#7A5C40', marginBottom: 32 }}>{t('booking.select_service_sub')}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
        {SERVICES.map(svc => {
          const isSelected = selected === svc.id
          const price      = svc.coverageLevels.find(l => l.level === (isSelected ? coverage : 1))?.price || svc.coverageLevels[0].price

          return (
            <div key={svc.id}
              onClick={() => { onService(svc.id); if (!isSelected) onCoverage(1) }}
              style={{
                border: `2px solid ${isSelected ? '#B5935A' : 'rgba(44,26,14,0.12)'}`,
                borderRadius: 12, padding: 24, cursor: 'pointer',
                background: isSelected ? 'rgba(181,147,90,0.05)' : '#fff',
                transition: 'all 0.2s ease',
              }}
            >
              {svc.isBridal && (
                <span style={{ fontFamily: '"DM Sans"', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B5935A', border: '1px solid #B5935A', borderRadius: 3, padding: '2px 7px', marginBottom: 10, display: 'inline-block' }}>
                  {t('booking.bridal')}
                </span>
              )}
              <h3 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 22, color: '#2C1A0E', margin: '8px 0' }}>{t(`services.items.${svc.id}.name`, svc.name)}</h3>
              <p style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#7A5C40', lineHeight: 1.7, marginBottom: 14 }}>{t(`services.items.${svc.id}.description`, svc.description)}</p>

              {/* Coverage selector */}
              {isSelected && (
                <div style={{ display: 'flex', background: '#FAF7F2', borderRadius: 6, padding: 3, gap: 2, marginBottom: 14 }}>
                  {svc.coverageLevels.map(l => (
                    <button key={l.level} onClick={e => { e.stopPropagation(); onCoverage(l.level) }}
                      style={{ flex: 1, padding: '6px 3px', borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 10, fontFamily: '"DM Sans"', fontWeight: 500, background: coverage === l.level ? '#2C1A0E' : 'transparent', color: coverage === l.level ? '#FAF7F2' : '#7A5C40', transition: 'all 0.15s' }}>
                      {t(`services.coverage.level${l.level}`, l.label)}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 26, fontWeight: 700, color: '#B5935A' }}>
                {price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                <span style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#9A7060', marginLeft: 4 }}>/ {t('services.per_side')}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
                <Gift size={12} color="#B5935A" />
                <span style={{ fontFamily: '"DM Sans"', fontSize: 11, color: '#B5935A' }}>{t('booking.cones_complimentary')}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Group booking toggle */}
      <div style={{ marginTop: 28, padding: '18px 22px', border: '1px dashed rgba(44,26,14,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Users size={18} color="#7A5C40" />
          <span style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#5A4030' }}>{t('booking.group_prompt')}</span>
        </div>
        <button onClick={onConsultation} className="btn-ghost"
          style={{ background: 'transparent', borderColor: '#B5935A', color: '#B5935A', padding: '9px 20px', fontSize: 12 }}>
          {t('booking.group_quote')}
        </button>
      </div>
    </div>
  )
}
