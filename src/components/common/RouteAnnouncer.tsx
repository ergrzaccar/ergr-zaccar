import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function RouteAnnouncer() {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // Delay slightly to allow react-helmet-async to update document.title
    const timeout = setTimeout(() => {
      const pageTitle = document.title || t('common.siteName')
      setAnnouncement(t('common.pageLoaded', { title: pageTitle, defaultValue: pageTitle }))
    }, 200)

    return () => clearTimeout(timeout)
  }, [location.pathname, location.search, i18n.language, t])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      data-testid="route-announcer"
    >
      {announcement}
    </div>
  )
}
