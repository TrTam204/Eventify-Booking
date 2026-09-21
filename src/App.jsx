import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/landing/WhatsAppButton'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Restaurants = lazy(() => import('./pages/Restaurants'))
const RestaurantDetail = lazy(() => import('./pages/RestaurantDetail'))
const Photography = lazy(() => import('./pages/Photography'))
const PhotographyDetail = lazy(() => import('./pages/PhotographyDetail'))
const Gallery = lazy(() => import('./pages/Gallery'))
const About = lazy(() => import('./pages/About'))
const Guide = lazy(() => import('./pages/Guide'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const Lookbook = lazy(() => import('./pages/Lookbook'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Book = lazy(() => import('./pages/Book'))
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'))
const Voucher = lazy(() => import('./pages/Voucher'))
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const Bookings = lazy(() => import('./pages/Admin/Bookings'))
const ValidatePayment = lazy(() => import('./pages/Admin/ValidatePayment'))
const Customers = lazy(() => import('./pages/Admin/Customers'))
const CustomerDetail = lazy(() => import('./pages/Admin/CustomerDetail'))
const Waitlist = lazy(() => import('./pages/Admin/Waitlist'))
const GalleryAdmin = lazy(() => import('./pages/Admin/GalleryAdmin'))
const Testimonials = lazy(() => import('./pages/Admin/Testimonials'))
const BlogAdmin = lazy(() => import('./pages/Admin/BlogAdmin'))
const Analytics = lazy(() => import('./pages/Admin/Analytics'))
const Vouchers = lazy(() => import('./pages/Admin/Vouchers'))
const Settings = lazy(() => import('./pages/Admin/Settings'))

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
)

const Spinner = () => (
  <div style={{ minHeight: '100vh', background: '#F7FBF7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #16A34A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#17201A', color: '#FFFFFF', border: '1px solid #E4EAE5' } }} />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
          <Route path="/restaurants" element={<PublicLayout><Restaurants /></PublicLayout>} />
          <Route path="/restaurants/:slug" element={<PublicLayout><RestaurantDetail /></PublicLayout>} />
          <Route path="/photography" element={<PublicLayout><Photography /></PublicLayout>} />
          <Route path="/photography/:slug" element={<PublicLayout><PhotographyDetail /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/guide" element={<PublicLayout><Guide /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/lookbook" element={<PublicLayout><Lookbook /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
          <Route path="/book" element={<PublicLayout><Book /></PublicLayout>} />
          <Route path="/booking-confirmation" element={<PublicLayout><BookingConfirmation /></PublicLayout>} />
          <Route path="/voucher" element={<PublicLayout><Voucher /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id/validate" element={<ValidatePayment />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="waitlist" element={<Waitlist />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="vouchers" element={<Vouchers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
