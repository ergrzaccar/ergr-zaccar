import type { LucideIcon } from 'lucide-react'
import { Construction, Tractor, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { mobilizedMeansGroups } from '../../data/activityPage'
import { equipment, equipmentInventory } from '../../data/equipment'

const meansIcons: Record<(typeof mobilizedMeansGroups)[number]['id'], LucideIcon> = {
  earthworks: Construction,
  transport: Truck,
  agricultural: Tractor,
}

export function ActivitiesMeansSection() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'

  return (
    <section className="section-band activities-means-section">
      <div className="site-container">
        <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr] xl:items-start">
          <Reveal className="activities-section-copy">
            <p className="section-eyebrow">{t('activitiesPage.means.eyebrow')}</p>
            <h2>{t('activitiesPage.means.title')}</h2>
            <p>{t('activitiesPage.means.description')}</p>

            <div className="activities-means-proof">
              <div>
                <strong>
                  <AnimatedCounter value={equipment.equipmentParks} locale={locale} />
                </strong>
                <span>{t('stats.equipmentParks')}</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter value={equipment.totalInventoriedItems} locale={locale} />
                </strong>
                <span>{t('activitiesPage.means.inventoryLabel')}</span>
              </div>
            </div>
          </Reveal>

          <div className="activities-means-grid">
            {mobilizedMeansGroups.map((group) => {
              const Icon = meansIcons[group.id]
              const items = group.equipmentIds
                .map((id) => equipmentInventory.find((item) => item.id === id))
                .filter((item): item is (typeof equipmentInventory)[number] => item !== undefined)

              return (
                <Reveal key={group.id} className="activities-means-card">
                  <div className="activities-means-card-header">
                    <span className="activities-card-icon">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{t(group.titleKey)}</h3>
                      <p>{t(group.descriptionKey)}</p>
                    </div>
                  </div>

                  <div className="activities-means-equipment-list">
                    {items.map((item) => (
                      <span key={item.id}>
                        <strong>
                          <AnimatedCounter value={item.count} locale={locale} />
                        </strong>
                        {t(item.labelKey)}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
