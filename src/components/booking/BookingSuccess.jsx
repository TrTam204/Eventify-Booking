import { motion } from 'framer-motion'
import { CheckCircle, Download, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

export default function BookingSuccess({ booking }) {
  const { t } = useTranslation()
  const waText = encodeURIComponent(t('booking.whatsapp_share_text', { ref: booking.referenceCode, date: booking.date ? format(booking.date, 'MMMM d, yyyy') : '' }))

  const downloadICS = () => {
    if (!booking.date) return
    const dateStr = format(booking.date, 'yyyyMMdd')
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      `DTSTART:${dateStr}T090000`,
      `DTEND:${dateStr}T110000`,
      `SUMMARY:Henna Appointment — ${booking.referenceCode}`,
      `DESCRIPTION:Booking appointment. Ref: ${booking.referenceCode}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\n')
    const blob = new Blob([ics], { type: 'text/calendar' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${booking.referenceCode}.ics`
    a.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      style={{ padding: '60px 0 40px', textAlign: 'center' }}
    >
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
        <CheckCircle size={56} color="#B5935A" style={{ marginBottom: 20 }} />
      </motion.div>

      <h2 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 36, color: '#2C1A0E', marginBottom: 8 }}>
        {t('booking.success_title')}
      </h2>
      <p style={{ fontFamily: '"DM Sans"', fontSize: 14, color: '#7A5C40', marginBottom: 32 }}>
        {t('booking.success_sub')}
      </p>

      {/* Reference code */}
      <div style={{ background: '#FAF7F2', border: '1px solid rgba(181,147,90,0.3)', borderRadius: 12, padding: 28, display: 'inline-block', marginBottom: 32, minWidth: 280 }}>
        <div style={{ fontFamily: '"DM Sans"', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A7060', marginBottom: 6 }}>
          {t('booking.reference_label')}
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 28, fontWeight: 700, color: '#B5935A', letterSpacing: '0.05em' }}>
          {booking.referenceCode}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#d97706' }}>{t('booking.pending_validation')}</span>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={downloadICS} className="btn-ghost"
          style={{ borderColor: '#2C1A0E', color: '#2C1A0E', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Download size={14} /> {t('booking.add_to_calendar')}
        </button>
        <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890'}?text=${waText}`} target="_blank" rel="noreferrer"
          style={{ background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: 4, textDecoration: 'none', fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <MessageCircle size={14} /> {t('booking.share_whatsapp')}
        </a>
      </div>
    </motion.div>
  )
}
