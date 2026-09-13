import { AboutCtaSection } from '../components/about/AboutCtaSection'
import { AboutGroupAffiliationSection } from '../components/about/AboutGroupAffiliationSection'
import { AboutHistoryTimelineSection } from '../components/about/AboutHistoryTimelineSection'
import { AboutLeadershipSection } from '../components/about/AboutLeadershipSection'
import { AboutPageHero } from '../components/about/AboutPageHero'
import { AboutValuesSection } from '../components/about/AboutValuesSection'
import { AboutVisionSection } from '../components/about/AboutVisionSection'
import { SEOHead } from '../components/seo/SEOHead'

export function AboutPage() {
  return (
    <>
      <SEOHead titleKey="pages.about.title" descriptionKey="pages.about.description" />
      <main className="about-page">
        <AboutPageHero />
        <AboutLeadershipSection />
        <AboutHistoryTimelineSection />
        <AboutGroupAffiliationSection />
        <AboutValuesSection />
        <AboutVisionSection />
        <AboutCtaSection />
      </main>
    </>
  )
}
