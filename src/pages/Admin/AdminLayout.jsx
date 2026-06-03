import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AdminSidebar from '../../components/admin/AdminSidebar'
import Spinner from '../../components/ui/Spinner'

export default function AdminLayout() {
  const { session, loading } = useAuth()

  if (loading) return <div style={{ minHeight: '100vh', background: '#1A0F07', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spinner /></div>
  if (!session) return <Navigate to="/admin/login" replace />

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F4EF' }}>
      <AdminSidebar />
      <main className="admin-content" style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
        <Outlet />
      </main>
    </div>
  )
}
