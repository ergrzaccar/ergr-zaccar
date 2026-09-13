import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { SEOHead } from '../components/seo/SEOHead'

export function NotFoundPage() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <SEOHead titleKey="pages.notFound.title" descriptionKey="pages.notFound.description" />
      <main className="not-found-page">
        <section className="not-found-hero">
          <div className="site-container">
            <motion.div
              className="not-found-content"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="not-found-code">404</span>
              <h1 className="not-found-title">{t('pages.notFound.heading')}</h1>
              <p className="not-found-description">{t('pages.notFound.message')}</p>

              <div className="not-found-actions">
                <Link to="/" className="not-found-home-link">
                  <Home className="size-4" aria-hidden="true" />
                  <span>{t('pages.notFound.backHome')}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="not-found-back-link"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  <span>{t('pages.notFound.goBack')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
