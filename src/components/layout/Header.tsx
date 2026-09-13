import { ChevronDown, Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

import { siteRoutes } from '../../app/routes'
import { cn } from '../../utils/cn'
import { LanguageSwitcher } from '../navigation/LanguageSwitcher'
import { ThemeSwitcher } from '../navigation/ThemeSwitcher'
import { SearchTrigger } from '../search/SearchTrigger'

const desktopNavigationGroups = [
  {
    id: 'company',
    labelKey: 'navigationGroups.company',
    routeIds: ['about', 'organization', 'contact'],
  },
  {
    id: 'activities',
    labelKey: 'navigationGroups.activities',
    routeIds: ['activities', 'nurseries', 'projects'],
  },
  {
    id: 'resources',
    labelKey: 'navigationGroups.resources',
    routeIds: ['resources', 'careers'],
  },
  {
    id: 'information',
    labelKey: 'navigationGroups.information',
    routeIds: ['news', 'tenders'],
  },
] as const

export function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const desktopNavRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const homeRoute = siteRoutes.find((route) => route.id === 'home')

  // Close dropdown when route changes
  useEffect(() => {
    setOpenGroup(null)
  }, [location.pathname])

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenGroup(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenGroup(null)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-[min(100%-2rem,1380px)] items-center justify-between gap-3 xl:gap-5">
        <NavLink to="/" className="brand-link group shrink-0" onClick={() => setIsOpen(false)}>
          <div className="flex h-11 items-center justify-center rounded-xl bg-white px-2 py-0.5 shadow-2xs border border-[var(--border-subtle)] ring-1 ring-black/5 dark:ring-white/10 group-hover:scale-105 group-hover:shadow-xs transition-all duration-200">
            <img
              src="/images/logo-badge.png"
              alt={t('common.siteName')}
              className="h-8.5 w-auto object-contain"
              width={65}
              height={34}
            />
          </div>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
              {t('common.siteName')}
            </span>
            <span className="hidden text-xs text-[var(--text-secondary)] sm:inline">
              {t('company.shortBaseline')}
            </span>
          </span>
        </NavLink>

        <nav ref={desktopNavRef} className="desktop-nav" aria-label={t('navigation.primary')}>
          {homeRoute && (
            <NavLink
              to={homeRoute.path}
              className={({ isActive }) => cn('nav-link', isActive && 'nav-link-active')}
              onClick={() => setOpenGroup(null)}
            >
              {t(homeRoute.labelKey)}
            </NavLink>
          )}

          {desktopNavigationGroups.map((group) => {
            const groupRoutes = group.routeIds
              .map((routeId) => siteRoutes.find((route) => route.id === routeId))
              .filter((route) => route !== undefined)
            const isGroupActive = groupRoutes.some((route) => route.path === location.pathname)
            const isCurrentOpen = openGroup === group.id

            return (
              <details
                key={group.id}
                className="desktop-nav-group"
                open={isCurrentOpen}
              >
                <summary
                  className={cn('nav-link nav-link-summary', isGroupActive && 'nav-link-active')}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenGroup((current) => (current === group.id ? null : group.id))
                  }}
                  aria-expanded={isCurrentOpen}
                >
                  <span>{t(group.labelKey)}</span>
                  <ChevronDown
                    className={cn('size-3.5 transition-transform duration-200', isCurrentOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </summary>
                <div className="desktop-nav-menu">
                  {groupRoutes.map((route) => {
                    const Icon = route.icon

                    return (
                      <NavLink
                        key={route.id}
                        to={route.path}
                        className={({ isActive }) =>
                          cn('desktop-nav-menu-link', isActive && 'desktop-nav-menu-link-active')
                        }
                        onClick={() => setOpenGroup(null)}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        <span>{t(route.labelKey)}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </details>
            )
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <SearchTrigger />
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <SearchTrigger compact />
          <button
            type="button"
            className="control-button"
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
            <div className="pb-2">
              <SearchTrigger
                className="w-full justify-between py-2.5 px-4"
                onClick={() => setIsOpen(false)}
              />
            </div>
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
              <ThemeSwitcher className="justify-center" showLabels />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
