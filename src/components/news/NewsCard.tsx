import { ArrowUpRight, Calendar, Clock, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { NewsArticle, NewsCategory } from '../../data/newsPage'

interface NewsCardProps {
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

export function NewsCard({ article, onSelect }: NewsCardProps) {
  const { t } = useTranslation()

  const categoryLabel = categoryKeyMap[article.category]
    ? t(categoryKeyMap[article.category])
    : article.category

  return (
    <article className="news-card">
      <div className="news-card-media">
        <img
          src={article.image}
          alt={t(article.titleKey)}
          loading="lazy"
          decoding="async"
          className="news-card-image"
        />
        <span className="news-card-category-badge">{categoryLabel}</span>
      </div>

      <div className="news-card-body">
        <div className="news-card-meta">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
            <span>{article.date}</span>
          </span>
          <span className="text-[var(--text-tertiary)]">•</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h3 className="news-card-title">{t(article.titleKey)}</h3>

        <p className="news-card-summary">{t(article.summaryKey)}</p>

        <div className="news-card-wilayas">
          <MapPin className="size-3.5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
          <div className="flex flex-wrap gap-1">
            {article.wilayas.map((w) => (
              <span key={w} className="news-wilaya-tag">
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="news-card-footer">
          <button
            type="button"
            onClick={() => onSelect(article)}
            className="news-card-btn"
          >
            <span>{t('newsPage.card.readArticle')}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
