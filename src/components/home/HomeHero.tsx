import {
  ArrowUpRight,
  Factory,
  Landmark,
  MapPin,
  Route,
  ShieldCheck,
  Sprout,
  Tractor,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { homeMedia } from '../../data/home'
import { keyStats } from '../../data/stats'
import { cn } from '../../utils/cn'

const heroStatIds = [
  'share-capital',
  'regional-directions',
  'implementation-units',
  'nurseries',
  'equipment-parks',
] as const
const heroIcons = [Landmark, Route, Factory, Sprout, Tractor]

export function HomeHero() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'
  const heroStats = heroStatIds
    .map((id) => keyStats.find((stat) => stat.id === id))
    .filter((stat) => stat !== undefined)

  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="absolute inset-0 -z-10 bg-[var(--hero-gradient)]" />
      <div className="topographic-lines absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[var(--surface-page)] to-transparent" />

      <div className="site-container grid min-h-[calc(100svh-5rem)] items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:py-16">
        <div className="max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] px-3 py-2 text-xs font-extrabold text-[var(--text-secondary)] shadow-sm backdrop-blur">
              <ShieldCheck className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('home.hero.badge')}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 max-w-5xl text-balance text-5xl font-black leading-[0.98] tracking-normal text-[var(--text-primary)] sm:text-6xl lg:text-[4.25rem]">
              {t('home.hero.title')}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
              {t('home.hero.description')}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/domaines-activite" className="premium-button">
                <span>{t('home.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/organisation-implantation"
                className="premium-button premium-button-secondary"
              >
                <MapPin className="size-4" aria-hidden="true" />
                <span>{t('home.hero.secondaryCta')}</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="hero-metrics-grid mt-10">
              {heroStats.map((stat, index) => {
                const Icon = heroIcons[index]
                const isCapital = stat.id === 'share-capital'
                const unit = 'unit' in stat ? stat.unit : undefined

                return (
                  <div key={stat.id} className="metric-tile">
                    <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                    <div>
                      <p className="text-xl font-black text-[var(--text-primary)]">
                        {isCapital ? (
                          <AnimatedCounter
                            value={stat.value / 1_000_000}
                            locale={locale}
                            suffix=" M DA"
                            precision={1}
                          />
                        ) : (
                          <AnimatedCounter
                            value={stat.value}
                            locale={locale}
                            suffix={unit ? ` ${unit}` : ''}
                            precision={stat.value % 1 === 0 ? 0 : 1}
                          />
                        )}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase text-[var(--text-muted)]">
                        {t(stat.labelKey)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="lg:justify-self-end">
          <div className="hero-visual-panel">
            <div className="hero-visual-grid">
              {homeMedia.map((media, index) => (
                <motion.figure
                  key={media.id}
                  className={cn('hero-media-card', index === 0 && 'hero-media-card-primary')}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.65, delay: 0.18 + index * 0.08 }}
                >
                  <img
                    src={media.src}
                    alt={t(media.altKey)}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <figcaption>{t(media.labelKey)}</figcaption>
                </motion.figure>
              ))}
            </div>

            <motion.div
              className="hero-coordinate-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.46 }}
            >
              <span className="size-2 rounded-full bg-[var(--brand-accent)]" />
              <div>
                <p className="text-xs font-black uppercase text-[var(--text-primary)]">
                  {t('home.hero.coordinateTitle')}
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {t('home.hero.coordinateText')}
                </p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
