import { ProjectsCtaSection } from '../components/projects/ProjectsCtaSection'
import { ProjectsGridSection } from '../components/projects/ProjectsGridSection'
import { ProjectsImpactSection } from '../components/projects/ProjectsImpactSection'
import { ProjectsPageHero } from '../components/projects/ProjectsPageHero'
import { SEOHead } from '../components/seo/SEOHead'

export function ProjectsPage() {
  return (
    <>
      <SEOHead titleKey="pages.projects.title" descriptionKey="pages.projects.description" />
      <main className="projects-page">
        <ProjectsPageHero />
        <ProjectsGridSection />
        <ProjectsImpactSection />
        <ProjectsCtaSection />
      </main>
    </>
  )
}
