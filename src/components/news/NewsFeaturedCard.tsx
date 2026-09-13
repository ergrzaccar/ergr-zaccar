import { ArrowUpRight, Calendar, Clock, MapPin, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { NewsArticle, NewsCategory } from '../../data/newsPage'

interface NewsFeaturedCardProps {
  article: NewsArticle
  onSelect: (article: NewsArticle) => void
}

const categoryKeyMap: Record<Exclude<NewsCategory, 'all'>, string> = {
  'barrage-vert': 'newsPage.filters.categories.barrageVert',
  nurseries: 'newsPage.filters.categories.nurseries',
  'field-works': 'newsPage.filters.categories.fieldWorks',
  institutional: 'newsPage.filters.categories.institutional',
  emergency: 'newsPage.filters.categories.emergency',
}

export function NewsFeaturedCard({ article, onSelect }: NewsFeaturedCardProps) {
  const { t } = useTranslation()

  const categoryLabel = categoryKeyMap[article.category]
    ? t(categoryKeyMap[article.category])
    : article.category

  return (
    <article className="news-featured-card">
      <div className="news-featured-media-wrapper">
        <img
          src={article.image}
          alt={t(article.titleKey)}
          loading="lazy"
          decoding="async"
          className="news-featured-image"
        />
        <div className="news-featured-badge">
          <Sparkles className="size-3.5" aria-hidden="true" />
          <span>{t('newsPage.card.featuredBadge')}</span>
        </div>
      </div>

      <div className="news-featured-content">
        <div className="news-featured-header-meta">
          <span className="news-category-badge">{categoryLabel}</span>
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        <h3 className="news-featured-title">{t(article.titleKey)}</h3>

        <p className="news-featured-summary">{t(article.summaryKey)}</p>

        {/* Key figures if available */}
        {article.keyFigures && article.keyFigures.length > 0 && (
          <div className="news-featured-figures-grid">
            {article.keyFigures.map((fig) => (
              <div key={fig.labelKey} className="news-featured-figure-item">
                <span className="news-figure-value">{fig.value}</span>
                <span className="news-figure-label">{t(fig.labelKey)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Wilayas tags & Action */}
        <div className="news-featured-footer">
          <div className="flex flex-wrap items-center gap-1.5">
            <MapPin className="size-3.5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            {article.wilayas.map((w) => (
              <span key={w} className="news-wilaya-tag">
                {w}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelect(article)}
            className="premium-button news-featured-btn"
          >
            <span>{t('newsPage.card.readArticle')}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
