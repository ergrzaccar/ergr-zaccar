import { useMemo, useState } from 'react'
import { FileQuestion, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type CareerDomain,
  type CareerJobOffer,
  careerJobOffersData,
  type CareerWilaya,
  type ContractType,
} from '../../data/careersPage'
import { Reveal } from '../animation/Reveal'
import { CareerJobCard } from './CareerJobCard'
import { CareerJobModal } from './CareerJobModal'
import { CareersFilterBar } from './CareersFilterBar'
import { AlertBanner } from '../alerts/AlertBanner'

interface CareersJobsSectionProps {
  onApplyForJob: (offer: CareerJobOffer) => void
}

export function CareersJobsSection({ onApplyForJob }: CareersJobsSectionProps) {
  const { t } = useTranslation()

  const [domain, setDomain] = useState<CareerDomain>('all')
  const [contract, setContract] = useState<ContractType>('all')
  const [wilaya, setWilaya] = useState<CareerWilaya>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeOffer, setActiveOffer] = useState<CareerJobOffer | null>(null)

  const hasActiveFilters =
    domain !== 'all' || contract !== 'all' || wilaya !== 'all' || searchQuery.trim().length > 0

  const handleResetFilters = () => {
    setDomain('all')
    setContract('all')
    setWilaya('all')
    setSearchQuery('')
  }

  const filteredOffers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return careerJobOffersData.filter((offer) => {
      // Domain filter
      if (domain !== 'all' && offer.domain !== domain) {
        return false
      }

      // Contract filter
      if (contract !== 'all' && offer.contractType !== contract) {
        return false
      }

      // Wilaya filter
      if (wilaya !== 'all' && offer.wilaya !== wilaya) {
        return false
      }

      // Search query filter
      if (q) {
        const title = t(offer.titleKey).toLowerCase()
        const summary = t(offer.summaryKey).toLowerCase()
        const ref = offer.ref.toLowerCase()
        const loc = t(offer.locationKey).toLowerCase()
        const edu = t(offer.educationKey).toLowerCase()
        const exp = t(offer.experienceKey).toLowerCase()

        const inMissions = offer.missionsKeys.some((k) => t(k).toLowerCase().includes(q))
        const inReqs = offer.requirementsKeys.some((k) => t(k).toLowerCase().includes(q))

        const match =
          title.includes(q) ||
          summary.includes(q) ||
          ref.includes(q) ||
          loc.includes(q) ||
          edu.includes(q) ||
          exp.includes(q) ||
          inMissions ||
          inReqs

        if (!match) return false
      }

      return true
    })
  }, [domain, contract, wilaya, searchQuery, t])

  return (
    <section id="careers-jobs" className="careers-jobs-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="section-eyebrow">{t('careersPage.filters.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('careersPage.filters.title')}</h2>
          <p className="section-description mt-3">{t('careersPage.filters.description')}</p>
        </Reveal>

        {/* Prominent Alert Subscription Banner (Solution B) */}
        <AlertBanner topic="careers" />

        {/* Filter Bar */}
        <CareersFilterBar
          selectedDomain={domain}
          onDomainChange={setDomain}
          selectedContract={contract}
          onContractChange={setContract}
          selectedWilaya={wilaya}
          onWilayaChange={setWilaya}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          resultsCount={filteredOffers.length}
        />

        {/* Jobs Grid */}
        {filteredOffers.length > 0 ? (
          <div className="careers-jobs-grid">
            {filteredOffers.map((offer) => (
              <CareerJobCard
                key={offer.id}
                offer={offer}
                onSelect={(selected) => setActiveOffer(selected)}
                onApply={(selected) => onApplyForJob(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="careers-empty-state">
            <div className="careers-empty-icon">
              <FileQuestion className="size-12 text-[var(--text-tertiary)]" aria-hidden="true" />
            </div>
            <h3>{t('careersPage.filters.emptyTitle')}</h3>
            <p>{t('careersPage.filters.emptyDesc')}</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="premium-button premium-button-secondary mt-4"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t('careersPage.filters.resetFilters')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <CareerJobModal
        offer={activeOffer}
        isOpen={activeOffer !== null}
        onClose={() => setActiveOffer(null)}
        onApply={(offer) => onApplyForJob(offer)}
      />
    </section>
  )
}
