import { useState } from 'react'

import type { CareerJobOffer } from '../data/careersPage'
import { AlertSubscriptionCard } from '../components/alerts/AlertSubscriptionCard'
import { CareersApplicationSection } from '../components/careers/CareersApplicationSection'
import { CareersCtaSection } from '../components/careers/CareersCtaSection'
import { CareersInternshipsSection } from '../components/careers/CareersInternshipsSection'
import { CareersJobsSection } from '../components/careers/CareersJobsSection'
import { CareersPageHero } from '../components/careers/CareersPageHero'
import { CareersValuesSection } from '../components/careers/CareersValuesSection'
import { SEOHead } from '../components/seo/SEOHead'

export function CareersPage() {
  const [targetOffer, setTargetOffer] = useState<CareerJobOffer | null>(null)
  const [applicationType, setApplicationType] = useState<'offer' | 'spontaneous' | 'internship'>('offer')

  const handleApplyForJob = (offer: CareerJobOffer) => {
    setTargetOffer(offer)
    setApplicationType('offer')
    document.getElementById('careers-apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleApplyForInternship = () => {
    setTargetOffer(null)
    setApplicationType('internship')
    document.getElementById('careers-apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="careers-page">
      <SEOHead
        titleKey="pages.careers.title"
        descriptionKey="pages.careers.description"
      />

      <CareersPageHero />

      <CareersValuesSection />

      <CareersJobsSection onApplyForJob={handleApplyForJob} />

      <CareersInternshipsSection onApplyForInternship={handleApplyForInternship} />

      <CareersApplicationSection
        key={`${applicationType}-${targetOffer?.id || 'none'}`}
        initialOffer={targetOffer}
        initialType={applicationType}
      />

      <div className="site-container">
        <AlertSubscriptionCard defaultTopic="careers" />
      </div>

      <CareersCtaSection />
    </main>
  )
}
