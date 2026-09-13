import { ResourcesCtaSection } from '../components/resources/ResourcesCtaSection'
import { ResourcesFleetSection } from '../components/resources/ResourcesFleetSection'
import { ResourcesHumanCapitalSection } from '../components/resources/ResourcesHumanCapitalSection'
import { ResourcesInterventionSection } from '../components/resources/ResourcesInterventionSection'
import { ResourcesMaintenanceParksSection } from '../components/resources/ResourcesMaintenanceParksSection'
import { ResourcesPageHero } from '../components/resources/ResourcesPageHero'
import { SEOHead } from '../components/seo/SEOHead'

export function ResourcesPage() {
  return (
    <>
      <SEOHead titleKey="pages.resources.title" descriptionKey="pages.resources.description" />
      <main className="resources-page">
        <ResourcesPageHero />
        <ResourcesFleetSection />
        <ResourcesHumanCapitalSection />
        <ResourcesMaintenanceParksSection />
        <ResourcesInterventionSection />
        <ResourcesCtaSection />
      </main>
    </>
  )
}
