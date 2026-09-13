import { Outlet } from 'react-router-dom'

import { TopographicBackground } from '../components/animation/TopographicBackground'
import { BackToTop } from '../components/common/BackToTop'
import { ErrorBoundary } from '../components/common/ErrorBoundary'
import { RouteAnnouncer } from '../components/common/RouteAnnouncer'
import { SkipLink } from '../components/common/SkipLink'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { PrintableHeader } from '../components/print/PrintableHeader'
import { SearchPaletteModal } from '../components/search/SearchPaletteModal'

export function RootLayout() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-x-hidden bg-[var(--surface-page)] text-[var(--text-primary)]">
        <SkipLink />
        <RouteAnnouncer />
        <SearchPaletteModal />
        <TopographicBackground className="fixed" />
        <PrintableHeader />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            <Outlet />
          </main>
          <Footer />
        </div>
        <BackToTop />
      </div>
    </ErrorBoundary>
  )
}

