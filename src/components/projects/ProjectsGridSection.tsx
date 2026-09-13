import { useMemo, useState } from 'react'
import { FolderSearch, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import {
  projectsList,
  type ProjectCategory,
  type ProjectItem,
  type ProjectStatus,
} from '../../data/projectsPage'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailModal } from './ProjectDetailModal'
import { ProjectsFilterBar } from './ProjectsFilterBar'

export function ProjectsGridSection() {
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [selectedWilaya, setSelectedWilaya] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>('all')
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      // Category filter
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false
      }

      // Wilaya filter
      if (selectedWilaya !== 'all' && project.wilayaId !== selectedWilaya) {
        return false
      }

      // Status filter
      if (selectedStatus !== 'all' && project.status !== selectedStatus) {
        return false
      }

      // Search term
      if (!searchTerm.trim()) return true

      const searchNorm = searchTerm.trim().toLowerCase()
      const title = t(project.titleKey).toLowerCase()
      const summary = t(project.summaryKey).toLowerCase()
      const wilaya = t(project.wilayaNameKey).toLowerCase()
      const location = project.locationFr.toLowerCase()

      return (
        title.includes(searchNorm) ||
        summary.includes(searchNorm) ||
        wilaya.includes(searchNorm) ||
        location.includes(searchNorm)
      )
    })
  }, [selectedCategory, selectedWilaya, selectedStatus, searchTerm, t])

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedWilaya('all')
    setSelectedStatus('all')
  }

  return (
    <section id="projects-catalog" className="section-band projects-grid-section">
      <div className="site-container">
        <div className="projects-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('projectsPage.catalog.eyebrow')}</p>
            <h2 className="section-title">{t('projectsPage.catalog.title')}</h2>
            <p className="section-lead">{t('projectsPage.catalog.description')}</p>
          </Reveal>
        </div>

        {/* Interactive Filters Bar */}
        <ProjectsFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedWilaya={selectedWilaya}
          onWilayaChange={setSelectedWilaya}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          filteredCount={filteredProjects.length}
          totalCount={projectsList.length}
          onReset={handleReset}
        />

        {/* Projects Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-cards-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setActiveModalProject}
              />
            ))}
          </div>
        ) : (
          <div className="projects-empty-state">
            <FolderSearch className="size-12 mx-auto text-[var(--text-muted)] opacity-60" aria-hidden="true" />
            <h3>{t('projectsPage.filters.noResultsTitle')}</h3>
            <p>{t('projectsPage.filters.noResultsText')}</p>
            <button
              type="button"
              onClick={handleReset}
              className="premium-button premium-button-secondary mt-4"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t('projectsPage.filters.resetFilters')}</span>
            </button>
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  )
}
