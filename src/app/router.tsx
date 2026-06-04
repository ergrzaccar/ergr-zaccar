import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RootLayout } from '../layouts/RootLayout'
import { AboutPage } from '../pages/AboutPage'
import { ActivitiesPage } from '../pages/ActivitiesPage'
import { CareersPage } from '../pages/CareersPage'
import { ContactPage } from '../pages/ContactPage'
import { HomePage } from '../pages/HomePage'
import { NewsPage } from '../pages/NewsPage'
import { NurseriesPage } from '../pages/NurseriesPage'
import { OrganizationPage } from '../pages/OrganizationPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { ResourcesPage } from '../pages/ResourcesPage'
import { TendersPage } from '../pages/TendersPage'

export function AppRouter() {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
