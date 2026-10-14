import { MapPin, TreePine } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { NurseriesCtaSection } from '../components/nurseries/NurseriesCtaSection'
import { NurseriesDirectorySection } from '../components/nurseries/NurseriesDirectorySection'
import { NurseriesDistributionSection } from '../components/nurseries/NurseriesDistributionSection'
import { NurseriesInfrastructureSection } from '../components/nurseries/NurseriesInfrastructureSection'
import { NurseriesPageHero } from '../components/nurseries/NurseriesPageHero'
import { NurseriesProductionTypesSection } from '../components/nurseries/NurseriesProductionTypesSection'
import { PlantCatalogSection } from '../components/plants/PlantCatalogSection'
import { SEOHead } from '../components/seo/SEOHead'

export function NurseriesPage() {
  const { t } = useTranslation()

  const handleSelectSpeciesFromNursery = () => {
    const elem = document.getElementById('catalogue-plantes')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <SEOHead titleKey="pages.nurseries.title" descriptionKey="pages.nurseries.description" />
      <main className="nurseries-page">
        <NurseriesPageHero />

        {/* High-Impact Section Quick-Nav Bar */}
        <nav
          aria-label="Navigation interne pépinières et catalogue"
          className="bg-[var(--surface-primary)] border-y border-[var(--border-subtle)] sticky top-16 z-30 shadow-xs backdrop-blur-md"
        >
          <div className="site-container py-3">
            <div className="flex items-center justify-center gap-3">
              <a
                href="#catalogue-plantes"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <TreePine className="size-4 shrink-0" aria-hidden="true" />
                <span>{t('plantCatalog.tabCatalog')}</span>
              </a>

              <a
                href="#nurseries-directory"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/80 border border-[var(--border-subtle)] transition-colors"
              >
                <MapPin className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>{t('plantCatalog.tabNurseries')}</span>
              </a>
            </div>
          </div>
        </nav>

        {/* 1. Le Nouveau Catalogue des Plantes & Espèces Forestières */}
        <PlantCatalogSection />

        {/* 2. Le Répertoire des 9 Pépinières Physiques */}
        <NurseriesDirectorySection onSelectSpecies={handleSelectSpeciesFromNursery} />

        {/* 3. Capacités de Production & Infrastructures */}
        <NurseriesProductionTypesSection />
        <NurseriesInfrastructureSection />
        <NurseriesDistributionSection />
        <NurseriesCtaSection />
      </main>
    </>
  )
}
