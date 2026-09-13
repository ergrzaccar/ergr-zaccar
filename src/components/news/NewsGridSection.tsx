import { useMemo, useState } from 'react'
import { FileQuestion, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type NewsArticle,
  newsArticlesData,
  type NewsCategory,
  type NewsYear,
} from '../../data/newsPage'
import { Reveal } from '../animation/Reveal'
import { NewsCard } from './NewsCard'
import { NewsDetailModal } from './NewsDetailModal'
import { NewsFeaturedCard } from './NewsFeaturedCard'
import { NewsFilterBar } from './NewsFilterBar'

export function NewsGridSection() {
  const { t } = useTranslation()

  const [category, setCategory] = useState<NewsCategory>('all')
  const [year, setYear] = useState<NewsYear>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null)

  const hasActiveFilters = category !== 'all' || year !== 'all' || searchQuery.trim().length > 0

  const handleResetFilters = () => {
    setCategory('all')
    setYear('all')
    setSearchQuery('')
  }

  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return newsArticlesData.filter((article) => {
      // Category filter
      if (category !== 'all' && article.category !== category) {
        return false
      }

      // Year filter
      if (year !== 'all' && article.year !== year) {
        return false
      }

      // Search query filter
      if (q) {
        const title = t(article.titleKey).toLowerCase()
        const summary = t(article.summaryKey).toLowerCase()
        const content = t(article.contentKey).toLowerCase()
        const author = t(article.authorKey).toLowerCase()
        const inWilayas = article.wilayas.some((w) => w.toLowerCase().includes(q))
        const inSlug = article.slug.toLowerCase().includes(q)

        const match =
          title.includes(q) ||
          summary.includes(q) ||
          content.includes(q) ||
          author.includes(q) ||
          inWilayas ||
          inSlug
        if (!match) return false
      }

      return true
    })
  }, [category, year, searchQuery, t])

  // Flagship article if not actively searching
  const featuredArticle = useMemo(() => {
    if (hasActiveFilters) return null
    return filteredArticles.find((a) => a.isFeatured) || null
  }, [filteredArticles, hasActiveFilters])

  // Non-featured articles or all articles if filter active
  const remainingArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles
    return filteredArticles.filter((a) => a.id !== featuredArticle.id)
  }, [filteredArticles, featuredArticle])

  return (
    <section id="news-feed" className="news-grid-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="section-eyebrow">{t('newsPage.filters.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('newsPage.filters.title')}</h2>
          <p className="section-description mt-3">{t('newsPage.filters.description')}</p>
        </Reveal>

        <NewsFilterBar
          selectedCategory={category}
          onCategoryChange={setCategory}
          selectedYear={year}
          onYearChange={setYear}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          resultsCount={filteredArticles.length}
        />

        {/* Featured Article when on default view */}
        {featuredArticle && (
          <div className="mb-10">
            <NewsFeaturedCard
              article={featuredArticle}
              onSelect={(selected) => setActiveArticle(selected)}
            />
          </div>
        )}

        {/* Main Grid */}
        {remainingArticles.length > 0 ? (
          <div className="news-cards-grid">
            {remainingArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onSelect={(selected) => setActiveArticle(selected)}
              />
            ))}
          </div>
        ) : !featuredArticle ? (
          <div className="news-empty-state">
            <div className="news-empty-icon">
              <FileQuestion className="size-12 text-[var(--text-tertiary)]" aria-hidden="true" />
            </div>
            <h3>{t('newsPage.filters.emptyTitle')}</h3>
            <p>{t('newsPage.filters.emptyDesc')}</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="premium-button premium-button-secondary mt-4"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t('newsPage.filters.resetFilters')}</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Article Detail Modal */}
      <NewsDetailModal
        article={activeArticle}
        isOpen={activeArticle !== null}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  )
}
