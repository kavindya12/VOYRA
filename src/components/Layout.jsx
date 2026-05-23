import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SupabaseBanner from './SupabaseBanner'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SupabaseBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
