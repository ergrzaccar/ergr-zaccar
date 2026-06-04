import type { PropsWithChildren } from 'react'
import { HelmetProvider } from 'react-helmet-async'

import '../i18n'
import { ThemeProvider } from '../theme/ThemeProvider'
import { I18nProvider } from './I18nProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>{children}</I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
