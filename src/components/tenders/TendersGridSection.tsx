import { useMemo, useState } from 'react'
import { FileQuestion, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type TenderDomain,
  type TenderItem,
  tendersData,
  type TenderStatus,
} from '../../data/tendersPage'
import { Reveal } from '../animation/Reveal'
import { TenderCard } from './TenderCard'
import { TenderDetailModal } from './TenderDetailModal'
import { TendersFilterBar } from './TendersFilterBar'
import { AlertBanner } from '../alerts/AlertBanner'

export function TendersGridSection() {
  const { t } = useTranslation()

  const [status, setStatus] = useState<TenderStatus>('all')
  const [domain, setDomain] = useState<TenderDomain>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTender, setActiveTender] = useState<TenderItem | null>(null)

  const hasActiveFilters = status !== 'all' || domain !== 'all' || searchQuery.trim().length > 0

  const handleResetFilters = () => {
    setStatus('all')
    setDomain('all')
    setSearchQuery('')
  }

  const filteredTenders = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return tendersData.filter((tender) => {
      // Status filter
      if (status !== 'all' && tender.status !== status) {
        return false
      }

      // Domain filter
      if (domain !== 'all' && tender.domain !== domain) {
        return false
      }

      // Search query filter
      if (q) {
        const title = t(tender.titleKey).toLowerCase()
        const summary = t(tender.summaryKey).toLowerCase()
        const ref = tender.reference.toLowerCase()
        const loc = tender.location.toLowerCase()
        const inWilayas = tender.wilayas.some((w) => w.toLowerCase().includes(q))

        const match =
          title.includes(q) ||
          summary.includes(q) ||
          ref.includes(q) ||
          loc.includes(q) ||
          inWilayas

        if (!match) return false
      }

      return true
    })
  }, [status, domain, searchQuery, t])

  return (
    <section id="tenders-registry" className="tenders-grid-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="section-eyebrow">{t('tendersPage.filters.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('tendersPage.filters.title')}</h2>
          <p className="section-description mt-3">{t('tendersPage.filters.description')}</p>
        </Reveal>

        {/* Prominent Alert Subscription Banner (Solution B) */}
        <AlertBanner topic="tenders" />

        <TendersFilterBar
          status={status}
          onStatusChange={setStatus}
          domain={domain}
          onDomainChange={setDomain}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          resultsCount={filteredTenders.length}
        />

        {filteredTenders.length > 0 ? (
          <div className="tenders-cards-grid">
            {filteredTenders.map((tender) => (
              <TenderCard
                key={tender.id}
                tender={tender}
                onSelect={(selected) => setActiveTender(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="tenders-empty-state">
            <div className="tenders-empty-icon">
              <FileQuestion className="size-12 text-[var(--text-tertiary)]" aria-hidden="true" />
            </div>
            <h3>{t('tendersPage.filters.emptyTitle')}</h3>
            <p>{t('tendersPage.filters.emptyDesc')}</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="premium-button premium-button-secondary mt-4"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t('tendersPage.filters.resetFilters')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Tender detail modal */}
      <TenderDetailModal
        tender={activeTender}
        isOpen={activeTender !== null}
        onClose={() => setActiveTender(null)}
      />
    </section>
  )
}
