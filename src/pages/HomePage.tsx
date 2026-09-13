import { SEOHead } from '../components/seo/SEOHead'
import { HomeCapabilitiesSection } from '../components/home/HomeCapabilitiesSection'
import { HomeCtaSection } from '../components/home/HomeCtaSection'
import { HomeHero } from '../components/home/HomeHero'
import { HomeImpactStatsSection } from '../components/home/HomeImpactStatsSection'
import { HomeMissionsSection } from '../components/home/HomeMissionsSection'
import { HomeNurseriesSection } from '../components/home/HomeNurseriesSection'
import { HomeProjectsSection } from '../components/home/HomeProjectsSection'
import { HomeTerritorySection } from '../components/home/HomeTerritorySection'

export function HomePage() {
  return (
    <>
      <SEOHead titleKey="pages.home.title" descriptionKey="pages.home.description" />
      <main>
        <HomeHero />
        <HomeMissionsSection />
        <HomeProjectsSection />
        <HomeImpactStatsSection />
        <HomeTerritorySection />
        <HomeNurseriesSection />
        <HomeCapabilitiesSection />
        <HomeCtaSection />
      </main>
    </>
  )
}
