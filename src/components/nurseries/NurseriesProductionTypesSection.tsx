import { Apple, Flower2, Maximize2, Trees, Warehouse } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useLightbox } from '../../context/LightboxContext'

import { nurseryCategories } from '../../data/nurseriesPage'
import { Reveal } from '../animation/Reveal'

const categoryIcons = {
  Trees,
  Apple,
  Flower2,
  Warehouse,
}

export function NurseriesProductionTypesSection() {
  const { t } = useTranslation()
  const { openLightbox } = useLightbox()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('nurseriesPage.categories.eyebrow')}</p>
          <h2 className="section-title">{t('nurseriesPage.categories.title')}</h2>
          <p className="section-description">{t('nurseriesPage.categories.description')}</p>
        </Reveal>

        <div className="nurseries-categories-grid mt-12">
          {nurseryCategories.map((category, index) => {
            const Icon = categoryIcons[category.iconName as keyof typeof categoryIcons] || Trees

            return (
              <motion.article
                key={category.id}
                className="nursery-category-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="nursery-category-image-wrap relative group">
                  <img
                    src={category.image.src}
                    alt={t(category.image.altKey)}
                    loading="lazy"
                    decoding="async"
                    className="nursery-category-image"
                  />
                  <button
                    type="button"
                    className="projects-card-zoom-btn"
                    onClick={() => openLightbox({
                      src: category.image.src,
                      alt: t(category.image.altKey),
                      title: t(category.titleKey),
                      category: t(category.badgeKey),
                    })}
                    title="Agrandir la photo"
                    aria-label="Agrandir la photo"
                  >
                    <Maximize2 className="size-3.5" aria-hidden="true" />
                  </button>
                  <span className="nursery-category-badge">{t(category.badgeKey)}</span>
                </div>

                <div className="nursery-category-body">
                  <div className="nursery-category-header">
                    <span className="nursery-category-icon-box">
                      <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                    </span>
                    <h3 className="nursery-category-title">{t(category.titleKey)}</h3>
                  </div>

                  <p className="nursery-category-desc">{t(category.descriptionKey)}</p>

                  <div className="nursery-category-specs">
                    <div className="nursery-spec-block">
                      <span className="nursery-spec-label">Essences & Variétés clés :</span>
                      <p className="nursery-spec-text">{t(category.speciesKey)}</p>
                    </div>
                    <div className="nursery-spec-block">
                      <span className="nursery-spec-label">Applications prioritaires :</span>
                      <p className="nursery-spec-text">{t(category.usageKey)}</p>
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
