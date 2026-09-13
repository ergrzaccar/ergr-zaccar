import type { LucideIcon } from 'lucide-react'
import { CheckCircle2, GraduationCap, HardHat, Sprout, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { humanCapitalProfiles } from '../../data/resourcesPage'

const profileIcons: Record<string, LucideIcon> = {
  GraduationCap,
  HardHat,
  Wrench,
  Sprout,
}

export function ResourcesHumanCapitalSection() {
  const { t } = useTranslation()

  return (
    <section id="human-capital" className="section-band resources-human-capital-section">
      <div className="site-container">
        <div className="resources-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('resourcesPage.humanCapital.eyebrow')}</p>
            <h2 className="section-title">{t('resourcesPage.humanCapital.title')}</h2>
            <p className="section-lead">{t('resourcesPage.humanCapital.description')}</p>
          </Reveal>
        </div>

        <div className="resources-human-grid">
          {humanCapitalProfiles.map((profile, index) => {
            const IconComponent = profileIcons[profile.iconName] || HardHat

            return (
              <Reveal key={profile.id} delay={index * 0.1} className="h-full">
                <article className="resources-profile-card">
                  <div className="resources-profile-header">
                    <div className="resources-profile-icon-wrap">
                      <IconComponent className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                    </div>
                    <h3 className="resources-profile-title">{t(profile.titleKey)}</h3>
                  </div>

                  <p className="resources-profile-description">{t(profile.descriptionKey)}</p>

                  <div className="resources-profile-roles">
                    <h4 className="resources-roles-heading">{t('resourcesPage.humanCapital.rolesHeading')}</h4>
                    <ul className="resources-roles-list">
                      {profile.roleKeys.map((roleKey) => (
                        <li key={roleKey} className="resources-role-item">
                          <CheckCircle2
                            className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{t(roleKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
