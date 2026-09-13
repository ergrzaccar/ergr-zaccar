import type { TFunction } from 'i18next'
import { siteRoutes } from '../app/routes'
import { careerJobOffersData } from './careersPage'
import { centralDepartments, hqContactInfo } from './contactPage'
import { newsArticlesData } from './newsPage'
import { nurseries } from './nurseries'
import { projectsList } from './projectsPage'
import { tendersData } from './tendersPage'

export type SearchCategory =
  | 'all'
  | 'pages'
  | 'tenders'
  | 'projects'
  | 'nurseries'
  | 'careers'
  | 'news'
  | 'contact'

export interface SearchItem {
  id: string
  category: Exclude<SearchCategory, 'all'>
  title: string
  subtitle?: string
  url: string
  badge?: string
  wilaya?: string
  keywords: string[]
  iconName: string
}

export function normalizeSearchString(str: string): string {
  if (!str) return ''
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove French accents
    .replace(/[أإآ]/g, 'ا') // normalize Arabic alef
    .replace(/ة/g, 'ه') // normalize Arabic taa marbouta
    .replace(/ى/g, 'ي') // normalize Arabic yaa
    .toLowerCase()
    .trim()
}

export function buildSearchIndex(t: TFunction, isArabic: boolean): SearchItem[] {
  const items: SearchItem[] = []

  // 1. Pages institutionnelles (11 routes)
  siteRoutes.forEach((route) => {
    const title = t(route.labelKey)
    const subtitle = t(route.descriptionKey)
    items.push({
      id: `page-${route.id}`,
      category: 'pages',
      title,
      subtitle,
      url: route.path,
      badge: isArabic ? 'صفحة' : 'Page',
      keywords: [
        title,
        subtitle,
        t(route.titleKey),
        route.id,
        'ergr',
        'zaccar',
        'direction',
      ],
      iconName: 'Building2',
    })
  })

  // 2. Appels d’offres et Consultations (tenders)
  tendersData.forEach((tender) => {
    const title = t(tender.titleKey)
    const subtitle = `${tender.reference} • ${tender.location}`
    const statusLabel =
      tender.status === 'open'
        ? isArabic
          ? 'جاري'
          : 'En cours'
        : isArabic
          ? 'قيد التقييم'
          : 'Évaluation'

    items.push({
      id: `tender-${tender.id}`,
      category: 'tenders',
      title,
      subtitle,
      url: '/appels-offres',
      badge: tender.reference,
      wilaya: tender.wilayas.join(', '),
      keywords: [
        title,
        subtitle,
        tender.reference,
        tender.location,
        statusLabel,
        ...tender.wilayas,
        'marche',
        'appel offres',
        'consultation',
        'مناقصة',
        'استشارة',
        'صفقة',
      ],
      iconName: 'FileText',
    })
  })

  // 3. Projets & Réalisations (projects)
  projectsList.forEach((project) => {
    const title = t(project.titleKey)
    const subtitle = `${project.locationFr} (${project.year}) - ${project.metricValue} ${t(project.metricLabelKey)}`
    const wilayaName = t(project.wilayaNameKey)

    items.push({
      id: `project-${project.id}`,
      category: 'projects',
      title,
      subtitle,
      url: '/realisations-projets',
      badge: project.year,
      wilaya: wilayaName,
      keywords: [
        title,
        subtitle,
        project.locationFr,
        wilayaName,
        project.year,
        'barrage vert',
        'reboisement',
        'piste',
        'gabions',
        'مشروع',
        'السد الاخضر',
        'تشجير',
      ],
      iconName: 'Trees',
    })
  })

  // 4. Pépinières industrielles (nurseries)
  nurseries.forEach((nursery) => {
    const name = isArabic ? nursery.nameAr : nursery.nameFr
    const subtitle = `${isArabic ? 'ولاية ' : 'Wilaya de '}${nursery.wilaya} • ${nursery.totalAreaHa} ha (SAU: ${nursery.usefulAgriculturalAreaHa} ha)`

    items.push({
      id: `nursery-${nursery.id}`,
      category: 'nurseries',
      title: `${isArabic ? 'مشتلة ' : 'Pépinière de '}${name}`,
      subtitle,
      url: '/pepinieres',
      badge: `${nursery.totalAreaHa} ha`,
      wilaya: nursery.wilaya,
      keywords: [
        name,
        nursery.nameFr,
        nursery.nameAr,
        nursery.wilaya,
        nursery.regionalDirection,
        'pepiniere',
        'plants',
        'foret',
        'مشتلة',
        'نباتات',
        'غابات',
      ],
      iconName: 'Sprout',
    })
  })

  // 5. Offres d'emploi & Recrutement (careers)
  careerJobOffersData.forEach((job) => {
    const title = t(job.titleKey)
    const subtitle = `${job.ref} • ${t(job.locationKey)} • ${t(job.educationKey)}`
    const contract = job.contractType === 'cdi' ? 'CDI' : 'CDD'

    items.push({
      id: `career-${job.id}`,
      category: 'careers',
      title,
      subtitle,
      url: '/carrieres',
      badge: contract,
      wilaya: t(job.locationKey),
      keywords: [
        title,
        subtitle,
        job.ref,
        contract,
        t(job.locationKey),
        t(job.educationKey),
        'recrutement',
        'emploi',
        'poste',
        'cv',
        'drh',
        'توظيف',
        'منصب',
        'عمل',
      ],
      iconName: 'Briefcase',
    })
  })

  // 6. Actualités institutionnelles (news)
  newsArticlesData.forEach((article) => {
    const title = t(article.titleKey)
    const subtitle = `${article.date} • ${article.readTime}`

    items.push({
      id: `news-${article.id}`,
      category: 'news',
      title,
      subtitle,
      url: '/actualites',
      badge: article.year,
      wilaya: article.wilayas.join(', '),
      keywords: [
        title,
        subtitle,
        article.date,
        article.year,
        ...article.wilayas,
        'actualite',
        'communique',
        'presse',
        'خبر',
        'اعلام',
        'بيان',
      ],
      iconName: 'Newspaper',
    })
  })

  // 7. Contacts & Siège (contact)
  items.push({
    id: 'contact-hq',
    category: 'contact',
    title: t(hqContactInfo.nameKey),
    subtitle: `${hqContactInfo.address} • ${hqContactInfo.phonePrimary}`,
    url: '/contact',
    badge: isArabic ? 'المقر' : 'Siège',
    wilaya: 'Alger (Rouiba)',
    keywords: [
      'siege',
      'rouiba',
      'alger',
      'haouch rouiba',
      'telephone',
      'contact',
      'مقر',
      'رويبة',
      'اتصال',
    ],
    iconName: 'MapPinned',
  })

  centralDepartments.forEach((dept) => {
    const title = t(dept.titleKey)
    const subtitle = `${t(dept.roleKey)} • ${dept.phone}`
    items.push({
      id: `contact-${dept.id}`,
      category: 'contact',
      title,
      subtitle,
      url: '/contact',
      badge: dept.email,
      keywords: [
        title,
        subtitle,
        dept.email,
        dept.phone,
        'direction',
        'service',
        'مديرية',
        'مصلحة',
      ],
      iconName: 'Mail',
    })
  })

  return items
}

export function searchFilterItems(
  items: SearchItem[],
  query: string,
  category: SearchCategory
): SearchItem[] {
  let filtered = items
  if (category !== 'all') {
    filtered = filtered.filter((item) => item.category === category)
  }

  const cleanQuery = normalizeSearchString(query)
  if (!cleanQuery) return filtered

  const tokens = cleanQuery.split(/\s+/).filter(Boolean)

  return filtered.filter((item) => {
    const target = normalizeSearchString(
      `${item.title} ${item.subtitle || ''} ${item.badge || ''} ${item.wilaya || ''} ${item.keywords.join(' ')}`
    )
    return tokens.every((token) => target.includes(token))
  })
}
