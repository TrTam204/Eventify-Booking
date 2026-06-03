import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts'
import { useAnalytics } from '../../hooks/useAnalytics'
import Spinner from '../../components/ui/Spinner'

const COLORS = ['#B5935A', '#D4AF7A', '#8B6E42', '#E8C990', '#6B5030']

export default function Analytics() {
  const { data, loading } = useAnalytics()

  if (loading) return <Spinner />

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 32, color: '#2C1A0E', marginBottom: 28 }}>Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* Revenue chart */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
          <h3 style={{ fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 700, color: '#2C1A0E', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data?.revenue || []}>
              <XAxis dataKey="month" tick={{ fontFamily: '"DM Sans"', fontSize: 11 }} />
              <YAxis tick={{ fontFamily: '"DM Sans"', fontSize: 11 }} />
              <Tooltip formatter={v => [v.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), 'Revenue']} />
              <Bar dataKey="revenue" fill="#B5935A" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By service */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 12px rgba(44,26,14,0.07)' }}>
          <h3 style={{ fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 700, color: '#2C1A0E', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Bookings by Service</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data?.byService || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {(data?.byService || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontFamily: '"DM Sans"', fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Slot popularity */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 12px rgba(44,26,14,0.07)', gridColumn: 'span 2' }}>
          <h3 style={{ fontFamily: '"DM Sans"', fontSize: 13, fontWeight: 700, color: '#2C1A0E', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Slot Popularity</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data?.bySlot || []} layout="vertical">
              <XAxis type="number" tick={{ fontFamily: '"DM Sans"', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontFamily: '"DM Sans"', fontSize: 11 }} width={110} />
              <Tooltip />
              <Bar dataKey="value" fill="#D4AF7A" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
