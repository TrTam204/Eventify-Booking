import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import BookingProgress from '../components/booking/BookingProgress'
import ServiceSelector from '../components/booking/ServiceSelector'
import DateSlotPicker from '../components/booking/DateSlotPicker'
import CustomerForm from '../components/booking/CustomerForm'
import PaymentUpload from '../components/booking/PaymentUpload'
import BookingSuccess from '../components/booking/BookingSuccess'
import ConsultationForm from '../components/booking/ConsultationForm'
import Modal from '../components/ui/Modal'
import { supabase, isOffline } from '../lib/supabase'
import { SERVICES, DEPOSIT_AMOUNT } from '../constants/services'
import { TIME_SLOTS } from '../constants/slots'
import { generateReferenceCode } from '../lib/bookingUtils'
import { format } from 'date-fns'

export default function Book() {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const [step, setStep]             = useState(1)
  const [serviceId, setServiceId]   = useState(params.get('service') || '')
  const [coverage, setCoverage]     = useState(Number(params.get('coverage')) || 1)
  const [date, setDate]             = useState(null)
  const [slotId, setSlotId]         = useState('')
  const [customer, setCustomer]     = useState({})
  const [slipFile, setSlipFile]     = useState(null)
  const [voucherCode, setVoucherCode] = useState('')
  const [blockedDates, setBlockedDates] = useState([])
  const [showConsult, setShowConsult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult]         = useState(null)

  useEffect(() => {
    if (isOffline) {
      setBlockedDates([])
      return
    }
    supabase.from('blocked_dates').select('date')
      .then(({ data }) => {
        setBlockedDates((data || []).map(d => d.date))
      })
      .catch(() => {
        setBlockedDates([])
      })
  }, [])

  const svc       = SERVICES.find(s => s.id === serviceId)
  const price     = svc?.coverageLevels.find(l => l.level === coverage)?.price || 0
  const slotLabel = TIME_SLOTS.find(s => s.id === slotId)?.label || ''

  const canNext = () => {
    if (step === 1) return !!serviceId
    if (step === 2) return !!date && !!slotId
    if (step === 3) return !!(customer.name && customer.phone && customer.email)
    if (step === 4) return !!slipFile || !!voucherCode
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      // Upsert customer
      const { data: custData, error: custErr } = await supabase
        .from('customers')
        .upsert({ name: customer.name, phone: customer.phone, email: customer.email }, { onConflict: 'phone' })
        .select().single()

      if (custErr) throw custErr

      // Upload slip
      let slipUrl = null
      if (slipFile) {
        const ext  = slipFile.name.split('.').pop()
        const path = `slips/${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage.from('payment-slips').upload(path, slipFile)
        if (upErr) throw upErr
        slipUrl = supabase.storage.from('payment-slips').getPublicUrl(path).data.publicUrl
      }

      // Get slot UUID
      const { data: slotRow } = await supabase.from('time_slots').select('id').eq('label', slotLabel).single()

      // Get service UUID
      const { data: svcRow } = await supabase.from('services').select('id').eq('slug', serviceId).single()

      const refCode = generateReferenceCode(date)

      const { error: bookErr } = await supabase.from('bookings').insert({
        reference_code: refCode,
        customer_id: custData.id,
        service_id: svcRow?.id,
        coverage_level: coverage,
        price_per_side: price,
        slot_id: slotRow?.id,
        booking_date: format(date, 'yyyy-MM-dd'),
        occasion_type: customer.occasion,
        customer_notes: customer.notes,
        deposit_amount: DEPOSIT_AMOUNT,
        payment_slip_url: slipUrl,
        payment_slip_uploaded_at: slipUrl ? new Date().toISOString() : null,
        status: slipUrl ? 'pending_validation' : 'pending_slip',
        voucher_code: voucherCode || null,
      })

      if (bookErr) throw bookErr

      setResult({ referenceCode: refCode, date, serviceId, coverage, price, slotLabel })
      setStep(5)
    } catch (err) {
      toast.error(t('booking.error'))
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 5 && result) {
    return (
      <div style={{ paddingTop: 72, minHeight: '100vh', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px' }}>
          <BookingProgress current={5} />
          <BookingSuccess booking={result} />
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page" style={{ paddingTop: 72, minHeight: '100vh', background: '#FAF7F2' }}>
      <div className="booking-shell" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
        <BookingProgress current={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <ServiceSelector
                selected={serviceId} coverage={coverage}
                onService={setServiceId} onCoverage={setCoverage}
                onConsultation={() => setShowConsult(true)}
              />
            )}
            {step === 2 && (
              <DateSlotPicker date={date} slot={slotId} onDate={setDate} onSlot={setSlotId} blockedDates={blockedDates} />
            )}
            {step === 3 && (
              <CustomerForm data={customer} onChange={setCustomer} />
            )}
            {step === 4 && (
              <PaymentUpload
                booking={{ serviceId, coverage, date, slotLabel, slotId, price }}
                onFile={setSlipFile} onVoucher={setVoucherCode}
                voucherCode={voucherCode} setVoucherCode={setVoucherCode}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="booking-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(44,26,14,0.1)' }}>
          <button
            onClick={() => setStep(v => v - 1)}
            style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-dark-soft)', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', opacity: step === 1 ? 0.3 : 1 }}
            disabled={step === 1}
          >
            ← {t('booking.back')}
          </button>

          {step < 4 ? (
            <button
              className="btn-gold"
              onClick={() => setStep(v => v + 1)}
              disabled={!canNext()}
              style={{ opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed' }}
            >
              {t('booking.continue')} →
            </button>
          ) : (
            <button
              className="btn-gold"
              onClick={handleSubmit}
              disabled={submitting || !canNext()}
              style={{ opacity: submitting || !canNext() ? 0.5 : 1 }}
            >
              {submitting ? t('booking.submitting') : t('booking.submit')}
            </button>
          )}
        </div>
      </div>

      {/* Consultation modal */}
      <Modal open={showConsult} onClose={() => setShowConsult(false)} title={t('booking.group_quote')}>
        <ConsultationForm onClose={() => setShowConsult(false)} />
      </Modal>
    </div>
  )
}
