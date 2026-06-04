import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { siteRoutes } from '../../app/routes'
import { cn } from '../../utils/cn'
import { LanguageSwitcher } from '../navigation/LanguageSwitcher'
import { ThemeSwitcher } from '../navigation/ThemeSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="site-container flex min-h-20 items-center justify-between gap-4">
        <NavLink to="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid size-11 place-items-center rounded-md bg-[var(--brand-primary)] text-sm font-black text-[var(--text-on-brand)] shadow-sm">
            ER
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-[var(--text-primary)]">
              {t('common.siteName')}
            </span>
            <span className="hidden text-xs text-[var(--text-secondary)] sm:inline">
              {t('company.shortBaseline')}
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 xl:flex" aria-label={t('navigation.primary')}>
          {siteRoutes.slice(0, 8).map((route) => (
            <NavLink
              key={route.id}
              to={route.path}
              className={({ isActive }) => cn('nav-link', isActive && 'nav-link-active')}
            >
              {t(route.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <button
          type="button"
          className="control-button xl:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
        >
          {isOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-x-0 top-20 z-50 min-h-[calc(100dvh-5rem)] border-t border-[var(--border-subtle)] bg-[var(--mobile-menu-bg)] xl:hidden"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          <div className="site-container grid gap-8 py-8">
            <div className="grid gap-3">
              {siteRoutes.map((route, index) => {
                const Icon = route.icon

                return (
                  <motion.div
                    key={route.id}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: document.dir === 'rtl' ? 18 : -18 }
                    }
                    animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.025 }}
                  >
                    <NavLink
                      to={route.path}
                      className={({ isActive }) =>
                        cn('mobile-nav-link', isActive && 'mobile-nav-link-active')
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                      <span>{t(route.labelKey)}</span>
                    </NavLink>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid gap-4 border-t border-[var(--border-subtle)] pt-6">
              <LanguageSwitcher className="justify-center" />
              <ThemeSwitcher className="justify-center" />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
