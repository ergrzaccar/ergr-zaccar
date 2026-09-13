import { NurseriesCtaSection } from '../components/nurseries/NurseriesCtaSection'
import { NurseriesDirectorySection } from '../components/nurseries/NurseriesDirectorySection'
import { NurseriesDistributionSection } from '../components/nurseries/NurseriesDistributionSection'
import { NurseriesInfrastructureSection } from '../components/nurseries/NurseriesInfrastructureSection'
import { NurseriesPageHero } from '../components/nurseries/NurseriesPageHero'
import { NurseriesProductionTypesSection } from '../components/nurseries/NurseriesProductionTypesSection'
import { SEOHead } from '../components/seo/SEOHead'

export function NurseriesPage() {
  return (
    <>
      <SEOHead titleKey="pages.nurseries.title" descriptionKey="pages.nurseries.description" />
      <main className="nurseries-page">
        <NurseriesPageHero />
        <NurseriesDirectorySection />
        <NurseriesProductionTypesSection />
        <NurseriesInfrastructureSection />
        <NurseriesDistributionSection />
        <NurseriesCtaSection />
      </main>
    </>
  )
}
