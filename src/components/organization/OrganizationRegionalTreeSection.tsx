import { useState } from 'react'
import { Building, Building2, MapPin, Truck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import {
  organization,
  type RegionalDirectionTabId,
} from '../../data/organizationPage'
import { Reveal } from '../animation/Reveal'
import { cn } from '../../utils/cn'

export function OrganizationRegionalTreeSection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isArabic = i18n.language === 'ar'

  const [activeTab, setActiveTab] = useState<RegionalDirectionTabId>('all')

  const regionalDirections = organization.regionalDirections

  const filteredDirections =
    activeTab === 'all'
      ? regionalDirections
      : activeTab === 'dg'
        ? []
        : regionalDirections.filter((item) => item.id === activeTab)

  const showGeneralDirection = activeTab === 'all' || activeTab === 'dg'

  return (
    <section id="regional-structure" className="section-band">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('organizationPage.regional.eyebrow')}</p>
          <h2 className="section-title">{t('organizationPage.regional.title')}</h2>
          <p className="section-description">{t('organizationPage.regional.description')}</p>
        </Reveal>

        {/* Tab Filters */}
        <div className="organization-tabs-bar mt-10">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={cn(
              'organization-tab-btn',
              activeTab === 'all' && 'organization-tab-btn-active',
            )}
          >
            <Building2 className="size-4" aria-hidden="true" />
            <span>{t('organizationPage.regional.allTabs')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dg')}
            className={cn(
              'organization-tab-btn',
              activeTab === 'dg' && 'organization-tab-btn-active',
            )}
          >
            <Building className="size-4" aria-hidden="true" />
            <span>{t('organizationPage.regional.dgTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bouira')}
            className={cn(
              'organization-tab-btn',
              activeTab === 'bouira' && 'organization-tab-btn-active',
            )}
          >
            <span>{t('organizationPage.regional.bouiraTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chlef')}
            className={cn(
              'organization-tab-btn',
              activeTab === 'chlef' && 'organization-tab-btn-active',
            )}
          >
            <span>{t('organizationPage.regional.chlefTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('medea')}
            className={cn(
              'organization-tab-btn',
              activeTab === 'medea' && 'organization-tab-btn-active',
            )}
          >
            <span>{t('organizationPage.regional.medeaTab')}</span>
          </button>
        </div>

        {/* Regional Trees Content */}
        <div className="organization-directions-grid mt-8">
          {/* General Direction Card (if visible) */}
          {showGeneralDirection && (
            <motion.article
              className="organization-direction-card organization-direction-card-dg"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35 }}
            >
              <div className="organization-direction-header">
                <div>
                  <span className="organization-direction-badge">Siège Central</span>
                  <h3 className="organization-direction-title">
                    {isArabic ? organization.generalDirection.nameAr : organization.generalDirection.nameFr}
                  </h3>
                  <p className="organization-direction-hq">
                    <MapPin className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                    <span>{organization.generalDirection.location}</span>
                  </p>
                </div>
                <span className="organization-direction-icon">
                  <Building className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                </span>
              </div>

              <div className="organization-direction-body">
                <div className="organization-block">
                  <span className="organization-block-label">
                    {t('organizationPage.regional.unitsLabel')}
                  </span>
                  <div className="organization-tag-list">
                    <span className="organization-tag">Unité El Harrach (Alger)</span>
                  </div>
                </div>

                <div className="organization-block">
                  <span className="organization-block-label">
                    {t('organizationPage.regional.servicesLabel')}
                  </span>
                  <div className="organization-services-list">
                    <span className="organization-service-item">10 Directions et cellules centrales</span>
                    <span className="organization-service-item">Coordination des 3 Régions et 9 Pépinières</span>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Regional Directions Cards */}
          {filteredDirections.map((dir, index) => {
            const dirName = isArabic ? dir.nameAr : dir.nameFr

            return (
              <motion.article
                key={dir.id}
                className="organization-direction-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className="organization-direction-header">
                  <div>
                    <span className="organization-direction-badge">Direction Régionale</span>
                    <h3 className="organization-direction-title">{dirName}</h3>
                    <p className="organization-direction-hq">
                      <MapPin className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                      <span>
                        {t('organizationPage.regional.headquartersLabel')} : {dir.headquarters}
                      </span>
                    </p>
                  </div>
                  <span className="organization-direction-icon">
                    <Building2 className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                  </span>
                </div>

                <div className="organization-direction-body">
                  <div className="organization-block">
                    <span className="organization-block-label">
                      {t('organizationPage.regional.wilayasLabel')} ({dir.wilayas.length})
                    </span>
                    <div className="organization-tag-list">
                      {dir.wilayas.map((wilaya) => (
                        <span key={wilaya} className="organization-tag">
                          {wilaya}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="organization-block">
                    <span className="organization-block-label">
                      {t('organizationPage.regional.unitsLabel')} ({dir.units.length})
                    </span>
                    <div className="organization-tag-list">
                      {dir.units.map((unitId) => (
                        <span key={unitId} className="organization-tag organization-tag-highlight">
                          Unité {unitId.charAt(0).toUpperCase() + unitId.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="organization-block">
                    <span className="organization-block-label">
                      {t('organizationPage.regional.parksLabel')}
                    </span>
                    <div className="organization-tag-list">
                      {dir.equipmentParks.map((parkId) => (
                        <span key={parkId} className="organization-tag organization-tag-park">
                          <Truck className="size-3.5 shrink-0" aria-hidden="true" />
                          <span>Parc de {parkId.replace('-park', '')}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="organization-block">
                    <span className="organization-block-label">
                      {t('organizationPage.regional.servicesLabel')}
                    </span>
                    <div className="organization-services-list">
                      <span className="organization-service-item">
                        {t('organizationPage.regional.services.technical')}
                      </span>
                      <span className="organization-service-item">
                        {t('organizationPage.regional.services.finance')}
                      </span>
                      <span className="organization-service-item">
                        {t('organizationPage.regional.services.administration')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
