import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://www.ergr-zaccar.dz'
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-home.jpg`

export type SEOHeadProps = {
  titleKey: string
  descriptionKey: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export function SEOHead({
  titleKey,
  descriptionKey,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}: SEOHeadProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const isArabic = i18n.language.startsWith('ar')
  const lang = isArabic ? 'ar' : 'fr'
  const dir = isArabic ? 'rtl' : 'ltr'
  const currentLocale = isArabic ? 'ar_DZ' : 'fr_DZ'
  const alternateLocale = isArabic ? 'fr_DZ' : 'ar_DZ'

  const title = t(titleKey)
  const description = t(descriptionKey)
  const siteName = t('common.siteName')
  const pageTitle = title === siteName ? siteName : `${title} | ${siteName}`

  const canonicalUrl = useMemo(() => {
    const cleanPath = location.pathname.replace(/\/+$/, '') || ''
    return `${SITE_URL}${cleanPath}`
  }, [location.pathname])

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      name: 'Entreprise Régionale de Génie Rural Zaccar',
      alternateName: ['ERGR Zaccar', 'المؤسسة الجهوية للهندسة الريفية زكار'],
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: DEFAULT_IMAGE,
      description:
        'Entreprise Publique Économique (EPE/SPA) - Groupe Génie Rural (GGR) sous tutelle du Ministère de l’Agriculture et du Développement Rural (MADR), spécialisée dans le génie rural, les travaux forestiers, le Barrage Vert et les pépinières industrielles.',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Groupe Génie Rural (GGR)',
        parentOrganization: {
          '@type': 'GovernmentOrganization',
          name: "Ministère de l'Agriculture et du Développement Rural (MADR Algérie)",
        },
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Haouch Rouiba',
        addressLocality: 'Rouiba',
        addressRegion: 'Alger',
        postalCode: '16012',
        addressCountry: 'DZ',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+213-23-85-40-12',
        contactType: 'customer service',
        availableLanguage: ['French', 'Arabic'],
      },
    }),
    []
  )

  return (
    <Helmet htmlAttributes={{ lang, dir }}>
      {/* Balises Fondamentales */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* URL Canonique & Alternates Multilingues */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* OpenGraph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Données Structurées JSON-LD Schema.org */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
