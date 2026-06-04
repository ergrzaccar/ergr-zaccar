import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Briefcase,
  FileText,
  Home,
  Info,
  Mail,
  MapPinned,
  Newspaper,
  Sprout,
  Trees,
  Truck,
} from 'lucide-react'

export type RouteId =
  | 'home'
  | 'about'
  | 'activities'
  | 'nurseries'
  | 'projects'
  | 'resources'
  | 'organization'
  | 'news'
  | 'tenders'
  | 'careers'
  | 'contact'

export type SiteRoute = {
  id: RouteId
  path: string
  icon: LucideIcon
  labelKey: string
  titleKey: string
  descriptionKey: string
}

export const siteRoutes = [
  {
    id: 'home',
    path: '/',
    icon: Home,
    labelKey: 'navigation.home',
    titleKey: 'pages.home.title',
    descriptionKey: 'pages.home.description',
  },
  {
    id: 'about',
    path: '/a-propos',
    icon: Info,
    labelKey: 'navigation.about',
    titleKey: 'pages.about.title',
    descriptionKey: 'pages.about.description',
  },
  {
    id: 'activities',
    path: '/domaines-activite',
    icon: Trees,
    labelKey: 'navigation.activities',
    titleKey: 'pages.activities.title',
    descriptionKey: 'pages.activities.description',
  },
  {
    id: 'nurseries',
    path: '/pepinieres',
    icon: Sprout,
    labelKey: 'navigation.nurseries',
    titleKey: 'pages.nurseries.title',
    descriptionKey: 'pages.nurseries.description',
  },
  {
    id: 'projects',
    path: '/realisations-projets',
    icon: MapPinned,
    labelKey: 'navigation.projects',
    titleKey: 'pages.projects.title',
    descriptionKey: 'pages.projects.description',
  },
  {
    id: 'resources',
    path: '/moyens',
    icon: Truck,
    labelKey: 'navigation.resources',
    titleKey: 'pages.resources.title',
    descriptionKey: 'pages.resources.description',
  },
  {
    id: 'organization',
    path: '/organisation-implantation',
    icon: Building2,
    labelKey: 'navigation.organization',
    titleKey: 'pages.organization.title',
    descriptionKey: 'pages.organization.description',
  },
  {
    id: 'news',
    path: '/actualites',
    icon: Newspaper,
    labelKey: 'navigation.news',
    titleKey: 'pages.news.title',
    descriptionKey: 'pages.news.description',
  },
  {
    id: 'tenders',
    path: '/appels-offres',
    icon: FileText,
    labelKey: 'navigation.tenders',
    titleKey: 'pages.tenders.title',
    descriptionKey: 'pages.tenders.description',
  },
  {
    id: 'careers',
    path: '/carrieres',
    icon: Briefcase,
    labelKey: 'navigation.careers',
    titleKey: 'pages.careers.title',
    descriptionKey: 'pages.careers.description',
  },
  {
    id: 'contact',
    path: '/contact',
    icon: Mail,
    labelKey: 'navigation.contact',
    titleKey: 'pages.contact.title',
    descriptionKey: 'pages.contact.description',
  },
] as const satisfies readonly SiteRoute[]

export function getRouteById(id: RouteId) {
  return siteRoutes.find((route) => route.id === id)
}
