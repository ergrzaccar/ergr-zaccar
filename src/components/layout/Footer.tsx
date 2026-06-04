import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { siteRoutes } from '../../app/routes'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--footer-bg)]">
      <div className="site-container grid gap-8 py-10 lg:grid-cols-[1.2fr_2fr]">
        <div className="space-y-3">
          <p className="text-sm font-bold text-[var(--text-primary)]">{t('common.siteName')}</p>
          <p className="max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            {t('footer.description')}
          </p>
        </div>
        <nav
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={t('footer.navigation')}
        >
          {siteRoutes.map((route) => (
            <NavLink
              key={route.id}
              to={route.path}
              className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--brand-primary)]"
            >
              {t(route.labelKey)}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-[var(--border-subtle)] py-4">
        <div className="site-container text-xs text-[var(--text-muted)]">{t('footer.legal')}</div>
      </div>
    </footer>
  )
}
