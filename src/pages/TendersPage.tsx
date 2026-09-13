import { SEOHead } from '../components/seo/SEOHead'
import { TendersCtaSection } from '../components/tenders/TendersCtaSection'
import { TendersGridSection } from '../components/tenders/TendersGridSection'
import { TendersGuidelinesSection } from '../components/tenders/TendersGuidelinesSection'
import { TendersPageHero } from '../components/tenders/TendersPageHero'

export function TendersPage() {
  return (
    <>
      <SEOHead titleKey="pages.tenders.title" descriptionKey="pages.tenders.description" />
      <main className="tenders-page">
        <TendersPageHero />
        <TendersGridSection />
        <TendersGuidelinesSection />
        <TendersCtaSection />
      </main>
    </>
  )
}
