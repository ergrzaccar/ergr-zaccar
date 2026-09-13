import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

export function SkipLink() {
  const { t } = useTranslation()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('main-content')
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[999] inline-flex items-center gap-2 rounded-lg bg-[var(--primary-700)] px-4 py-2.5 text-sm font-semibold text-white shadow-xl ring-2 ring-white transition focus:outline-none focus:ring-4 focus:ring-[var(--primary-400)]"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
      </svg>
      <span>{t('common.skipToContent')}</span>
    </a>
  )
}
