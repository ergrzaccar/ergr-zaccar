import { ContactEmergencyBanner } from '../components/contact/ContactEmergencyBanner'
import { ContactFaqSection } from '../components/contact/ContactFaqSection'
import { ContactFormSection } from '../components/contact/ContactFormSection'
import { ContactHeadquartersSection } from '../components/contact/ContactHeadquartersSection'
import { ContactPageHero } from '../components/contact/ContactPageHero'
import { ContactRegionalDirectorySection } from '../components/contact/ContactRegionalDirectorySection'
import { SEOHead } from '../components/seo/SEOHead'

export function ContactPage() {
  return (
    <>
      <SEOHead titleKey="pages.contact.title" descriptionKey="pages.contact.description" />
      <main className="contact-page">
        <ContactPageHero />
        <ContactFormSection />
        <ContactHeadquartersSection />
        <ContactRegionalDirectorySection />
        <ContactFaqSection />
        <ContactEmergencyBanner />
      </main>
    </>
  )
}
