import { Outlet } from 'react-router-dom'

import { TopographicBackground } from '../components/animation/TopographicBackground'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function RootLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--surface-page)] text-[var(--text-primary)]">
      <TopographicBackground className="fixed" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
