import { OrganizationCtaSection } from '../components/organization/OrganizationCtaSection'
import { OrganizationGovernanceSection } from '../components/organization/OrganizationGovernanceSection'
import { OrganizationPageHero } from '../components/organization/OrganizationPageHero'
import { OrganizationParksSection } from '../components/organization/OrganizationParksSection'
import { OrganizationRegionalTreeSection } from '../components/organization/OrganizationRegionalTreeSection'
import { OrganizationUnitsSection } from '../components/organization/OrganizationUnitsSection'
import { SEOHead } from '../components/seo/SEOHead'

export function OrganizationPage() {
  return (
    <>
      <SEOHead titleKey="pages.organization.title" descriptionKey="pages.organization.description" />
      <main className="organization-page">
        <OrganizationPageHero />
        <OrganizationGovernanceSection />
        <OrganizationRegionalTreeSection />
        <OrganizationUnitsSection />
        <OrganizationParksSection />
        <OrganizationCtaSection />
      </main>
    </>
  )
}
