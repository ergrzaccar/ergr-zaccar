import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import type { RouteId } from '../app/routes'
import { getRouteById } from '../app/routes'
import { Reveal } from '../components/animation/Reveal'
import { SEOHead } from '../components/seo/SEOHead'
import { PageLayout } from '../layouts/PageLayout'

type PagePlaceholderProps = {
  pageId: RouteId
}

export function PagePlaceholder({ pageId }: PagePlaceholderProps) {
  const { t } = useTranslation()
  const route = getRouteById(pageId)

  if (!route) {
    return null
  }

  const Icon = route.icon

  return (
    <>
      <SEOHead titleKey={route.titleKey} descriptionKey={route.descriptionKey} />
      <PageLayout
        eyebrow={t(`pages.${pageId}.eyebrow`)}
        title={t(route.titleKey)}
        description={t(route.descriptionKey)}
      >
        <Reveal className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="info-card">
            <Icon className="size-8 text-[var(--brand-primary)]" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold text-[var(--text-primary)]">
              {t('pages.placeholder.status')}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {t('pages.placeholder.body')}
            </p>
          </div>
          <motion.div
            className="info-card relative overflow-hidden"
            initial={false}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 opacity-60 topographic-lines" aria-hidden="true" />
            <div className="relative">
              <p className="section-eyebrow">{t('pages.placeholder.status')}</p>
              <p className="mt-5 text-lg font-semibold leading-8 text-[var(--text-primary)]">
                {t('pages.placeholder.next')}
              </p>
            </div>
          </motion.div>
        </Reveal>
      </PageLayout>
    </>
  )
}
