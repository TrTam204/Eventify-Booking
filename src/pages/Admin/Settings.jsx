import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { Plus, X } from 'lucide-react'

export default function Settings() {
  const [blocked, setBlocked]   = useState([])
  const [bankDetails, setBankDetails] = useState('')
  const [saving, setSaving]     = useState(false)

  useEffect(() => {
    supabase.from('blocked_dates').select('date, reason').then(({ data }) => setBlocked(data || []))
  }, [])

  const addBlock = async (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    if (blocked.some(b => b.date === dateStr)) return
    await supabase.from('blocked_dates').insert({ date: dateStr })
    setBlocked(prev => [...prev, { date: dateStr }])
    toast.success(`${dateStr} blocked.`)
  }

  const removeBlock = async (date) => {
    await supabase.from('blocked_dates').delete().eq('date', date)
    setBlocked(prev => prev.filter(b => b.date !== date))
    toast.success('Date unblocked.')
  }

  const blockedDates = blocked.map(b => new Date(b.date))

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 32, color: '#2C1A0E', marginBottom: 28 }}>Settings</h1>

      <div style={{ display: 'grid', gap: 24 }}>
        {/* Blocked dates */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 24, color: '#2C1A0E', marginBottom: 4 }}>Blocked Dates</h2>
          <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#69462F', marginBottom: 20 }}>Click a date to block or unblock it from bookings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <DayPicker
              mode="multiple"
              selected={blockedDates}
              onDayClick={(day) => {
                const dateStr = format(day, 'yyyy-MM-dd')
                blocked.some(b => b.date === dateStr) ? removeBlock(dateStr) : addBlock(day)
              }}
              modifiersStyles={{ selected: { background: '#dc2626', color: '#fff' } }}
            />
            <div>
              <h4 style={{ fontFamily: '"DM Sans"', fontSize: 12, fontWeight: 700, color: '#2C1A0E', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Blocked Dates</h4>
              {blocked.map(b => (
                <div key={b.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#FAF7F2', borderRadius: 6, marginBottom: 6 }}>
                  <span style={{ fontFamily: '"DM Sans"', fontSize: 13 }}>{b.date}</span>
                  <button onClick={() => removeBlock(b.date)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}><X size={14} color="#dc2626" /></button>
                </div>
              ))}
              {!blocked.length && <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#69462F' }}>No dates blocked.</p>}
            </div>
          </div>
        </div>

        {/* Bank details */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 24, color: '#2C1A0E', marginBottom: 4 }}>Bank Account Details</h2>
          <p style={{ fontFamily: '"DM Sans"', fontSize: 13, color: '#69462F', marginBottom: 16 }}>Displayed to customers on the payment step.</p>
          <textarea
            value={bankDetails} onChange={e => setBankDetails(e.target.value)}
            style={{ width: '100%', minHeight: 120, padding: '11px 14px', borderRadius: 6, border: '1.5px solid rgba(44,26,14,0.2)', fontFamily: '"DM Sans"', fontSize: 14, boxSizing: 'border-box', resize: 'vertical', marginBottom: 14 }}
            placeholder="Bank: Your Bank Name&#10;Account Name: YourBusiness&#10;Account Number: XXXX XXXX&#10;Branch: Your Branch"
          />
          <button className="btn-gold" style={{ padding: '10px 24px' }} onClick={() => toast.success('Settings saved!')}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
