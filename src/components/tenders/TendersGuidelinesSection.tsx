import {
  CheckCircle2,
  FileSignature,
  Layers,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { procurementGuideSteps } from '../../data/tendersPage'
import { Reveal } from '../animation/Reveal'

const stepIcons = [FileSignature, Layers, Send, Users]

export function TendersGuidelinesSection() {
  const { t } = useTranslation()

  return (
    <section id="tenders-guide" className="tenders-guidelines-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-eyebrow">{t('tendersPage.guide.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('tendersPage.guide.title')}</h2>
          <p className="section-description mt-3">{t('tendersPage.guide.description')}</p>
        </Reveal>

        <div className="tenders-guide-grid">
          {procurementGuideSteps.map((step, index) => {
            const IconComponent = stepIcons[index % stepIcons.length]
            return (
              <Reveal key={step.number} delay={index * 0.1} className="tenders-guide-step-card">
                <div className="tenders-guide-step-header">
                  <span className="tenders-guide-number">{step.number}</span>
                  <span className="tenders-guide-icon-wrapper">
                    <IconComponent className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="tenders-guide-step-title">{t(step.titleKey)}</h3>
                <p className="tenders-guide-step-desc">{t(step.descKey)}</p>
              </Reveal>
            )
          })}
        </div>

        {/* Regulatory note box */}
        <div className="tenders-regulatory-note">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <div>
              <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base">
                {t('tendersPage.hero.proof.decree')}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('tendersPage.hero.proof.publication')} • {t('tendersPage.hero.proof.opening')}
              </p>
            </div>
          </div>
          <div className="tenders-regulatory-tag">
            <CheckCircle2 className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
            <span>ERGR Zaccar Marchés Publics</span>
          </div>
        </div>
      </div>
    </section>
  )
}
