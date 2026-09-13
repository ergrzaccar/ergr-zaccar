import type { PropsWithChildren } from 'react'
import { HelmetProvider } from 'react-helmet-async'

import '../i18n'
import { LightboxProvider } from '../../context/LightboxContext'
import { SearchProvider } from '../../context/SearchContext'
import { ToastProvider } from '../../context/ToastContext'
import { ThemeProvider } from '../theme/ThemeProvider'
import { I18nProvider } from './I18nProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>
          <SearchProvider>
            <ToastProvider>
              <LightboxProvider>{children}</LightboxProvider>
            </ToastProvider>
          </SearchProvider>
        </I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
