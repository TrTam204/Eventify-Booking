import { useTranslation } from 'react-i18next'

const OCCASIONS = ['Wedding', 'Engagement', 'Eid', 'Birthday', 'Party', 'Other']

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 4, border: '1.5px solid rgba(44,26,14,0.2)',
  fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink)', background: '#fff', outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, color: 'var(--ink)',
  marginBottom: 6, display: 'block', letterSpacing: '0.1em', textTransform: 'uppercase',
}

export default function CustomerForm({ data, onChange }) {
  const { t } = useTranslation()
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value })

  return (
    <div style={{ padding: '40px 0 24px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 32, color: 'var(--ink)', marginBottom: 8 }}>
        {t('booking.details_title')}
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 14, color: 'var(--text-dark-soft)', marginBottom: 32 }}>
        {t('booking.details_sub')}
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('booking.field_name')} *</label>
            <input style={inputStyle} value={data.name || ''} onChange={set('name')} placeholder="Jane Smith" required />
          </div>
          <div>
            <label style={labelStyle}>{t('booking.field_phone')} *</label>
            <input style={inputStyle} type="tel" value={data.phone || ''} onChange={set('phone')} placeholder="+1 555 000 0000" required />
          </div>
        </div>

        <div>
          <label style={labelStyle}>{t('booking.field_email')} *</label>
          <input style={inputStyle} type="email" value={data.email || ''} onChange={set('email')} placeholder="you@email.com" required />
        </div>

        <div>
          <label style={labelStyle}>{t('booking.field_occasion')}</label>
          <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.occasion || ''} onChange={set('occasion')}>
            <option value="">{t('booking.occasion_placeholder')}</option>
            {OCCASIONS.map(o => <option key={o} value={o.toLowerCase()}>{t(`booking.occasions.${o.toLowerCase()}`, o)}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>{t('booking.field_notes')}</label>
          <textarea
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            value={data.notes || ''}
            onChange={set('notes')}
            placeholder={t('booking.notes_placeholder')}
          />
        </div>
      </div>
    </div>
  )
}
