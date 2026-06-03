import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, isOffline } from '../../lib/supabase'
import { getMockBookingById, updateMockBookingStatus } from '../../lib/mockDb'
import toast from 'react-hot-toast'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Spinner from '../../components/ui/Spinner'
import { Check, X, AlertTriangle, ZoomIn } from 'lucide-react'

export default function ValidatePayment() {
  const { id }         = useParams()
  const navigate       = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rejectModal, setRejectModal] = useState(false)
  const [reason, setReason]           = useState('')
  const [zoomed, setZoomed]           = useState(false)

  useEffect(() => {
    if (isOffline) {
      const data = getMockBookingById(id)
      setBooking(data)
      setLoading(false)
      return
    }

    supabase.from('bookings').select('*, customers(*), services(*), time_slots(*)')
      .eq('id', id).single()
      .then(({ data }) => { setBooking(data); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [id])

  const approve = async () => {
    if (isOffline) {
      updateMockBookingStatus(id, 'confirmed')
      toast.success('Booking confirmed!')
      navigate('/admin/bookings')
      return
    }

    const { error } = await supabase.from('bookings').update({ status: 'confirmed', updated_at: new Date() }).eq('id', id)
    if (error) { toast.error('Failed to confirm.'); return }
    toast.success('Booking confirmed!')
    navigate('/admin/bookings')
  }

  const reject = async () => {
    if (!reason) { toast.error('Please enter a rejection reason.'); return }

    if (isOffline) {
      updateMockBookingStatus(id, 'rejected', { rejection_reason: reason })
      toast.success('Booking rejected.')
      navigate('/admin/bookings')
      return
    }

    const { error } = await supabase.from('bookings').update({ status: 'rejected', rejection_reason: reason, updated_at: new Date() }).eq('id', id)
    if (error) { toast.error('Failed to reject.'); return }
    toast.success('Booking rejected.')
    navigate('/admin/bookings')
  }

  if (loading) return <Spinner />
  if (!booking) return <p style={{ fontFamily: '"DM Sans"', color: '#4A3020' }}>Booking not found.</p>

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 32, color: '#2C1A0E', marginBottom: 28 }}>
        Validate Payment — {booking.reference_code}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Booking details */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
          <h3 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 22, color: '#2C1A0E', marginBottom: 20 }}>Booking Details</h3>
          <dl style={{ display: 'grid', gap: 14 }}>
            {[
              { label: 'Customer',   value: booking.customers?.name },
              { label: 'Phone',      value: booking.customers?.phone },
              { label: 'Email',      value: booking.customers?.email },
              { label: 'Service',    value: booking.services?.name },
              { label: 'Date',       value: booking.booking_date },
              { label: 'Slot',       value: booking.time_slots?.label },
              { label: 'Occasion',   value: booking.occasion_type },
              { label: 'Price/Side', value: booking.price_per_side != null ? booking.price_per_side.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '—' },
              { label: 'Deposit',    value: booking.deposit_amount != null ? booking.deposit_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '—' },
            ].map(r => (
              <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
                <dt style={{ fontFamily: '"DM Sans"', fontSize: 11, color: '#69462F', letterSpacing: '0.1em', textTransform: 'uppercase', paddingTop: 2 }}>{r.label}</dt>
                <dd style={{ fontFamily: '"DM Sans"', fontSize: 14, color: '#2C1A0E', margin: 0 }}>{r.value || '—'}</dd>
              </div>
            ))}
          </dl>
          {booking.customer_notes && (
            <div style={{ marginTop: 16, padding: '12px 14px', background: '#FAF7F2', borderRadius: 8 }}>
              <div style={{ fontFamily: '"DM Sans"', fontSize: 11, color: '#69462F', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Notes</div>
              <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#3B2417', lineHeight: 1.6 }}>{booking.customer_notes}</p>
            </div>
          )}
        </div>

        {/* Payment slip */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
          <h3 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 22, color: '#2C1A0E', marginBottom: 20 }}>Payment Slip</h3>
          {booking.payment_slip_url ? (
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setZoomed(true)}>
              <img src={booking.payment_slip_url} alt="payment slip" style={{ width: '100%', borderRadius: 8, maxHeight: 360, objectFit: 'contain', border: '1px solid rgba(44,26,14,0.1)' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ZoomIn size={12} color="#fff" />
                <span style={{ fontFamily: '"DM Sans"', fontSize: 11, color: '#fff' }}>Zoom</span>
              </div>
            </div>
          ) : (
            <div style={{ height: 200, background: '#FAF7F2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#69462F' }}>No slip uploaded yet</span>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button onClick={approve} className="btn-gold"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#16a34a' }}>
              <Check size={15} /> Approve
            </button>
            <button onClick={() => setRejectModal(true)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 0', fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <X size={15} /> Reject
            </button>
            <button
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#d97706', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 0', fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <AlertTriangle size={15} /> Dispute
            </button>
          </div>
        </div>
      </div>

      {/* Zoomed slip */}
      {zoomed && (
        <div onClick={() => setZoomed(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <img src={booking.payment_slip_url} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}

      {/* Reject modal */}
      <Modal open={rejectModal} onClose={() => setRejectModal(false)} title="Reject Booking" width={440}>
        <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#4A3020', marginBottom: 16 }}>
          The customer will be notified with the reason provided.
        </p>
        <textarea
          value={reason} onChange={e => setReason(e.target.value)}
          placeholder="e.g. Payment amount incorrect, slip unreadable…"
          style={{ width: '100%', minHeight: 100, padding: '11px 14px', borderRadius: 6, border: '1.5px solid rgba(44,26,14,0.2)', fontFamily: '"DM Sans"', fontSize: 14, boxSizing: 'border-box', resize: 'vertical', marginBottom: 16 }}
        />
        <button onClick={reject}
          style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 24px', fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
          Confirm Rejection
        </button>
      </Modal>
    </div>
  )
}
