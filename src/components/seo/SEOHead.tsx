import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

type SEOHeadProps = {
  titleKey: string
  descriptionKey: string
}

export function SEOHead({ titleKey, descriptionKey }: SEOHeadProps) {
  const { t, i18n } = useTranslation()
  const title = t(titleKey)
  const description = t(descriptionKey)
  const siteName = t('common.siteName')
  const pageTitle = title === siteName ? siteName : `${title} | ${siteName}`

  return (
    <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir() }}>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
