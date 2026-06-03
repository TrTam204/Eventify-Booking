import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { supabase } from '../../lib/supabase'
import StatCard from '../../components/admin/StatCard'
import Badge from '../../components/ui/Badge'
import { TIME_SLOTS } from '../../constants/slots'

const STATUS_BADGE = {
  pending_slip:       { variant: 'neutral', label: 'Pending Slip' },
  pending_validation: { variant: 'amber',   label: 'Pending Review' },
  confirmed:          { variant: 'green',   label: 'Confirmed' },
  rejected:           { variant: 'red',     label: 'Rejected' },
  expired:            { variant: 'neutral', label: 'Expired' },
  completed:          { variant: 'green',   label: 'Completed' },
}

export default function Dashboard() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const [stats, setStats]       = useState({ pending: 0, confirmed: 0, customers: 0, recurring: 0 })
  const [todaySlots, setTodaySlots] = useState({})
  const [recent, setRecent]     = useState([])

  useEffect(() => {
    // Today's bookings by slot
    supabase.from('bookings').select('slot_id, status, time_slots(label)')
      .eq('booking_date', today)
      .in('status', ['pending_slip', 'pending_validation', 'confirmed'])
      .then(({ data }) => {
        const map = {}
        ;(data || []).forEach(b => { map[b.time_slots?.label] = b.status })
        setTodaySlots(map)
      })

    // Stats
    Promise.all([
      supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending_validation'),
      supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'confirmed').gte('booking_date', format(new Date(), 'yyyy-MM-01')),
      supabase.from('customers').select('id', { count: 'exact' }),
      supabase.from('customers').select('id', { count: 'exact' }).eq('is_recurring', true),
    ]).then(([pend, conf, custs, rec]) => {
      setStats({ pending: pend.count || 0, confirmed: conf.count || 0, customers: custs.count || 0, recurring: rec.count || 0 })
    })

    // Recent bookings
    supabase.from('bookings').select('reference_code, status, booking_date, customers(name), services(name), time_slots(label)')
      .order('created_at', { ascending: false }).limit(10)
      .then(({ data }) => setRecent(data || []))
  }, [today])

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 32, color: '#2C1A0E', marginBottom: 28 }}>Dashboard</h1>

      {/* Today's slots */}
      <h2 style={{ fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#69462F', marginBottom: 12 }}>
        Today — {format(new Date(), 'MMMM d, yyyy')}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
        {TIME_SLOTS.map(s => {
          const status = todaySlots[s.label]
          const badge  = STATUS_BADGE[status]
          return (
            <div key={s.id} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
              <div style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#69462F', marginBottom: 4 }}>{s.displayTime}</div>
              <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 17, color: '#2C1A0E', marginBottom: 8 }}>{s.label}</div>
              {badge ? <Badge variant={badge.variant}>{badge.label}</Badge> : <Badge variant="neutral">Open</Badge>}
            </div>
          )
        })}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
        <StatCard label="Pending Validation" value={stats.pending} accent={stats.pending > 0 ? '#dc2626' : undefined} sub={stats.pending > 0 ? 'Requires attention' : 'All clear'} />
        <StatCard label="Confirmed This Month" value={stats.confirmed} />
        <StatCard label="Total Customers" value={stats.customers} />
        <StatCard label="Recurring" value={`${stats.customers ? Math.round((stats.recurring / stats.customers) * 100) : 0}%`} sub="of all customers" />
      </div>

      {/* Recent bookings */}
      <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(44,26,14,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: '"DM Sans"', fontSize: 14, fontWeight: 600, color: '#2C1A0E' }}>Recent Bookings</h3>
          <Link to="/admin/bookings" style={{ fontFamily: '"DM Sans"', fontSize: 12, color: '#B5935A', textDecoration: 'none' }}>View all →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#FAF7F2' }}>
              {['Reference', 'Customer', 'Service', 'Date', 'Slot', 'Status'].map(h => (
                <th key={h} style={{ fontFamily: '"DM Sans"', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#69462F', padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((b, i) => {
              const badge = STATUS_BADGE[b.status] || { variant: 'neutral', label: b.status }
              return (
                <tr key={b.reference_code} style={{ borderTop: '1px solid rgba(44,26,14,0.06)', background: i % 2 === 0 ? '#fff' : '#FDFBF8' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"DM Sans"', fontSize: 12, fontWeight: 600, color: '#B5935A' }}>{b.reference_code}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"DM Sans"', fontSize: 13, color: '#2C1A0E' }}>{b.customers?.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"DM Sans"', fontSize: 12, color: '#3B2417' }}>{b.services?.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"DM Sans"', fontSize: 12, color: '#3B2417' }}>{b.booking_date}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"DM Sans"', fontSize: 12, color: '#3B2417' }}>{b.time_slots?.label}</td>
                  <td style={{ padding: '12px 16px' }}><Badge variant={badge.variant}>{badge.label}</Badge></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
