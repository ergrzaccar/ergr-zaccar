import { ArrowUpRight, CheckCircle2, Clock, MapPin, Maximize2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { ProjectItem } from '../../data/projectsPage'
import { useLightbox } from '../../context/LightboxContext'

interface ProjectCardProps {
  project: ProjectItem
  onSelect: (project: ProjectItem) => void
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { t } = useTranslation()
  const { openLightbox } = useLightbox()
  const isCompleted = project.status === 'completed'

  const categoryLabel = t(`projectsPage.categories.${
    project.category === 'rural-tracks'
      ? 'ruralTracks'
      : project.category === 'watershed-protection'
        ? 'watershedProtection'
        : project.category === 'green-spaces'
          ? 'greenSpaces'
          : project.category === 'forestry-works'
            ? 'forestryWorks'
            : 'reforestation'
  }`)

  return (
    <article className="projects-card">
      <div className="projects-card-media-wrapper">
        <img
          src={project.imageSrc}
          alt={t(project.imageAltKey)}
          loading="lazy"
          decoding="async"
          className="projects-card-image"
        />
        <button
          type="button"
          className="projects-card-zoom-btn"
          onClick={(e) => {
            e.stopPropagation()
            openLightbox({
              src: project.imageSrc,
              alt: t(project.imageAltKey),
              title: t(project.titleKey),
              category: categoryLabel,
            })
          }}
          title="Agrandir la photo"
          aria-label="Agrandir la photo"
        >
          <Maximize2 className="size-3.5" aria-hidden="true" />
        </button>
        <div className="projects-card-badges">
          <span className="projects-card-category-tag">{categoryLabel}</span>
          <span
            className={`projects-card-status-pill ${
              isCompleted ? 'projects-status-completed' : 'projects-status-progress'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="size-3 shrink-0" aria-hidden="true" />
            ) : (
              <Clock className="size-3 shrink-0" aria-hidden="true" />
            )}
            <span>{t(`projectsPage.status.${isCompleted ? 'completed' : 'inProgress'}`)}</span>
          </span>
        </div>
      </div>

      <div className="projects-card-content">
        <div className="projects-card-meta">
          <span className="projects-card-location">
            <MapPin className="size-3.5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <span>{t(project.wilayaNameKey)}</span>
          </span>
          <span className="projects-card-year">{project.year}</span>
        </div>

        <h3 className="projects-card-title">{t(project.titleKey)}</h3>
        <p className="projects-card-summary">{t(project.summaryKey)}</p>

        <div className="projects-card-footer">
          <div className="projects-card-metric-highlight">
            <strong className="projects-card-metric-number">{project.metricValue}</strong>
            <span className="projects-card-metric-text">{t(project.metricLabelKey)}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="projects-card-action-btn"
            aria-label={`Consulter le dossier : ${t(project.titleKey)}`}
          >
            <span>Détails</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
