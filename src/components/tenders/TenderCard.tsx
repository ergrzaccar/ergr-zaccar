import {
  AlertTriangle,
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  Coins,
  Hourglass,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { TenderDomain, TenderItem, TenderStatus } from '../../data/tendersPage'

interface TenderCardProps {
  tender: TenderItem
  onSelect: (tender: TenderItem) => void
}

const domainKeyMap: Record<Exclude<TenderDomain, 'all'>, string> = {
  'civil-engineering': 'tendersPage.filters.domainCivil',
  gabions: 'tendersPage.filters.domainGabions',
  machinery: 'tendersPage.filters.domainMachinery',
  nurseries: 'tendersPage.filters.domainNurseries',
  studies: 'tendersPage.filters.domainStudies',
}

const statusConfig: Record<
  Exclude<TenderStatus, 'all'>,
  { labelKey: string; className: string; icon: typeof Clock }
> = {
  open: {
    labelKey: 'tendersPage.card.statusOpen',
    className: 'status-open',
    icon: Clock,
  },
  evaluating: {
    labelKey: 'tendersPage.card.statusEvaluating',
    className: 'status-evaluating',
    icon: Hourglass,
  },
  awarded: {
    labelKey: 'tendersPage.card.statusAwarded',
    className: 'status-awarded',
    icon: Award,
  },
  cancelled: {
    labelKey: 'tendersPage.card.statusCancelled',
    className: 'status-cancelled',
    icon: AlertTriangle,
  },
}

export function TenderCard({ tender, onSelect }: TenderCardProps) {
  const { t } = useTranslation()

  const statusInfo = statusConfig[tender.status]
  const StatusIcon = statusInfo.icon
  const domainLabel = domainKeyMap[tender.domain] ? t(domainKeyMap[tender.domain]) : tender.domain

  return (
    <article className={`tenders-card ${statusInfo.className}`}>
      <div className="tenders-card-header">
        <span className="tenders-card-reference">{tender.reference}</span>
        <span className={`tenders-status-badge ${statusInfo.className}`}>
          <StatusIcon className="size-3.5" aria-hidden="true" />
          <span>{t(statusInfo.labelKey)}</span>
        </span>
      </div>

      <div className="tenders-card-domain-badge">
        <span>{domainLabel}</span>
      </div>

      <h3 className="tenders-card-title">{t(tender.titleKey)}</h3>

      <p className="tenders-card-summary">{t(tender.summaryKey)}</p>

      {/* Tender Metadata */}
      <div className="tenders-card-meta">
        <div className="tenders-meta-item">
          <MapPin className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
          <span>{tender.location}</span>
        </div>
        <div className="tenders-meta-item">
          <Calendar className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
          <span>
            <strong>{t('tendersPage.card.deadlineLabel')}</strong> {tender.deadlineDate}
          </span>
        </div>
        <div className="tenders-meta-item">
          <Clock className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
          <span>
            <strong>{t('tendersPage.card.openingTimeLabel')}</strong> {tender.openingTime}
          </span>
        </div>
        <div className="tenders-meta-item">
          <Coins className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
          <span>
            <strong>CDC :</strong> {tender.cdcFee}
          </span>
        </div>
      </div>

      {/* Award info banner */}
      {tender.status === 'awarded' && tender.awardedTo && (
        <div className="tenders-card-awarded-box">
          <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
            <Sparkles className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <span>{t('tendersPage.card.awardedToLabel')}</span>
            <span className="text-[var(--brand-primary)]">{tender.awardedTo}</span>
          </div>
          {tender.awardedAmount && (
            <div className="text-xs text-[var(--text-secondary)] mt-1">
              <span>{t('tendersPage.card.awardedAmountLabel')}</span> <strong>{tender.awardedAmount}</strong>
            </div>
          )}
        </div>
      )}

      {/* Cancelled reason banner */}
      {tender.status === 'cancelled' && tender.cancellationReasonKey && (
        <div className="tenders-card-cancelled-box">
          <AlertTriangle className="size-4 text-red-500 shrink-0" aria-hidden="true" />
          <span className="text-xs text-[var(--text-secondary)]">{t(tender.cancellationReasonKey)}</span>
        </div>
      )}

      <div className="tenders-card-footer">
        <button
          type="button"
          onClick={() => onSelect(tender)}
          className="tenders-card-btn"
        >
          <span>{t('tendersPage.card.viewDetails')}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
