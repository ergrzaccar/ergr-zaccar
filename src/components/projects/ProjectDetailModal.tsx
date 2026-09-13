import { useEffect } from 'react'
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  HardHat,
  MapPin,
  Maximize2,
  Truck,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { ProjectItem } from '../../data/projectsPage'
import { useLightbox } from '../../context/LightboxContext'

interface ProjectDetailModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { t } = useTranslation()
  const { openLightbox } = useLightbox()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

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
    <div
      className="projects-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="projects-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="projects-modal-close"
          aria-label={t('projectsPage.modal.close')}
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {/* Modal Image Header */}
        <div className="projects-modal-media relative group cursor-pointer" onClick={() => openLightbox({
          src: project.imageSrc,
          alt: t(project.imageAltKey),
          title: t(project.titleKey),
          category: categoryLabel,
        })}>
          <img
            src={project.imageSrc}
            alt={t(project.imageAltKey)}
            className="projects-modal-image"
          />
          <button
            type="button"
            className="projects-card-zoom-btn opacity-100"
            title="Agrandir la photo"
            aria-label="Agrandir la photo"
          >
            <Maximize2 className="size-3.5" aria-hidden="true" />
          </button>
          <div className="projects-modal-media-overlay">
            <span className="projects-modal-category">{categoryLabel}</span>
            <span
              className={`projects-modal-status ${
                isCompleted ? 'projects-status-completed' : 'projects-status-progress'
              }`}
            >
              <CheckCircle2 className="size-3.5 inline-block mr-1" aria-hidden="true" />
              {t(`projectsPage.status.${isCompleted ? 'completed' : 'inProgress'}`)}
            </span>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="projects-modal-body">
          <p className="projects-modal-eyebrow">{t('projectsPage.modal.projectDossier')}</p>
          <h2 id="project-modal-title" className="projects-modal-title">
            {t(project.titleKey)}
          </h2>

          {/* Key Metadata Row */}
          <div className="projects-modal-meta-grid">
            <div className="projects-modal-meta-item">
              <MapPin className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
              <div>
                <span className="projects-meta-label">{t('projectsPage.modal.location')}</span>
                <strong>{t(project.wilayaNameKey)} ({project.locationFr})</strong>
              </div>
            </div>

            <div className="projects-modal-meta-item">
              <Building2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
              <div>
                <span className="projects-meta-label">{t('projectsPage.modal.client')}</span>
                <strong>{t(project.clientKey)}</strong>
              </div>
            </div>

            <div className="projects-modal-meta-item">
              <Calendar className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
              <div>
                <span className="projects-meta-label">{t('projectsPage.modal.year')}</span>
                <strong>{project.year}</strong>
              </div>
            </div>
          </div>

          {/* Key Metric Highlight */}
          <div className="projects-modal-metric-card">
            <div className="projects-metric-value">{project.metricValue}</div>
            <div className="projects-metric-label">{t(project.metricLabelKey)}</div>
          </div>

          {/* Full Description */}
          <div className="projects-modal-section">
            <h3 className="projects-modal-section-title">
              {t('projectsPage.modal.impactTitle')}
            </h3>
            <p className="projects-modal-description">{t(project.descriptionKey)}</p>
          </div>

          {/* Technical Specifications */}
          <div className="projects-modal-section">
            <h3 className="projects-modal-section-title">
              {t('projectsPage.modal.technicalDetails')}
            </h3>
            <div className="projects-specs-grid">
              <div className="projects-spec-card">
                <Clock className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                <span className="projects-spec-title">{t('projectsPage.modal.duration')}</span>
                <strong>{project.specs.duration}</strong>
              </div>

              <div className="projects-spec-card">
                <Maximize2 className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                <span className="projects-spec-title">{t('projectsPage.modal.surfaceOrLength')}</span>
                <strong>{project.specs.surfaceOrLength}</strong>
              </div>

              <div className="projects-spec-card">
                <HardHat className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                <span className="projects-spec-title">{t('projectsPage.modal.workforce')}</span>
                <strong>{project.specs.workforce}</strong>
              </div>

              <div className="projects-spec-card">
                <Truck className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                <span className="projects-spec-title">{t('projectsPage.modal.equipment')}</span>
                <strong>{project.specs.equipmentMobilized}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
