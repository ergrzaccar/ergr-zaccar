import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PageLoadingFallback } from '../components/common/PageLoadingFallback'
import { ScrollToTop } from '../components/common/ScrollToTop'
import { RootLayout } from '../layouts/RootLayout'
import { HomePage } from '../pages/HomePage'

const AboutPage = lazy(() => import('../pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ActivitiesPage = lazy(() =>
  import('../pages/ActivitiesPage').then((m) => ({ default: m.ActivitiesPage })),
)
const NurseriesPage = lazy(() =>
  import('../pages/NurseriesPage').then((m) => ({ default: m.NurseriesPage })),
)
const ProjectsPage = lazy(() =>
  import('../pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const ResourcesPage = lazy(() =>
  import('../pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })),
)
const OrganizationPage = lazy(() =>
  import('../pages/OrganizationPage').then((m) => ({ default: m.OrganizationPage })),
)
const NewsPage = lazy(() => import('../pages/NewsPage').then((m) => ({ default: m.NewsPage })))
const TendersPage = lazy(() =>
  import('../pages/TendersPage').then((m) => ({ default: m.TendersPage })),
)
const CareersPage = lazy(() =>
  import('../pages/CareersPage').then((m) => ({ default: m.CareersPage })),
)
const ContactPage = lazy(() =>
  import('../pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="a-propos" element={<AboutPage />} />
            <Route path="domaines-activite" element={<ActivitiesPage />} />
            <Route path="pepinieres" element={<NurseriesPage />} />
            <Route path="realisations-projets" element={<ProjectsPage />} />
            <Route path="moyens" element={<ResourcesPage />} />
            <Route path="organisation-implantation" element={<OrganizationPage />} />
            <Route path="actualites" element={<NewsPage />} />
            <Route path="appels-offres" element={<TendersPage />} />
            <Route path="carrieres" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
