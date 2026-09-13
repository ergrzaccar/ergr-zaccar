import { ActivitiesCtaSection } from '../components/activities/ActivitiesCtaSection'
import { ActivitiesFieldWorksSection } from '../components/activities/ActivitiesFieldWorksSection'
import { ActivitiesImpactSection } from '../components/activities/ActivitiesImpactSection'
import { ActivitiesMeansSection } from '../components/activities/ActivitiesMeansSection'
import { ActivitiesMethodsSection } from '../components/activities/ActivitiesMethodsSection'
import { ActivitiesPageHero } from '../components/activities/ActivitiesPageHero'
import { ActivitiesPlantProductionSection } from '../components/activities/ActivitiesPlantProductionSection'
import { ActivitiesSpecialtiesSection } from '../components/activities/ActivitiesSpecialtiesSection'
import { SEOHead } from '../components/seo/SEOHead'

export function ActivitiesPage() {
  return (
    <>
      <SEOHead titleKey="pages.activities.title" descriptionKey="pages.activities.description" />
      <main className="activities-page">
        <ActivitiesPageHero />
        <ActivitiesSpecialtiesSection />
        <ActivitiesMethodsSection />
        <ActivitiesFieldWorksSection />
        <ActivitiesPlantProductionSection />
        <ActivitiesMeansSection />
        <ActivitiesImpactSection />
        <ActivitiesCtaSection />
      </main>
    </>
  )
}
