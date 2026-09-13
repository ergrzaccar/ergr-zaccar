import {
  Briefcase,
  Building2,
  ChevronRight,
  CornerDownLeft,
  FileText,
  History,
  Mail,
  MapPinned,
  Newspaper,
  Search,
  Sparkles,
  Sprout,
  Trash2,
  Trees,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSearchPalette } from '../../context/SearchContext'
import {
  buildSearchIndex,
  searchFilterItems,
  type SearchCategory,
  type SearchItem,
} from '../../data/searchIndex'
import { cn } from '../../utils/cn'

const categoryIcons: Record<string, typeof Building2> = {
  Building2,
  FileText,
  Trees,
  Sprout,
  Briefcase,
  Newspaper,
  MapPinned,
  Mail,
}

const categoriesList: SearchCategory[] = [
  'all',
  'pages',
  'tenders',
  'projects',
  'nurseries',
  'careers',
  'news',
  'contact',
]

export function SearchPaletteModal() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isArabic = i18n.language.startsWith('ar')

  const {
    isOpen,
    closeSearch,
    query,
    setQuery,
    category,
    setCategory,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useSearchPalette()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Build the unified search index based on active language
  const allItems = useMemo(() => {
    return buildSearchIndex(t, isArabic)
  }, [t, isArabic])

  // Filter items matching category & text query
  const filteredItems = useMemo(() => {
    return searchFilterItems(allItems, query, category)
  }, [allItems, query, category])

  // Compute count per category for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allItems.length }
    categoriesList.forEach((cat) => {
      if (cat === 'all') return
      counts[cat] = searchFilterItems(allItems, query, cat).length
    })
    return counts
  }, [allItems, query])

  // Safe selected index bounded by current filtered results
  const safeIndex = selectedIndex < filteredItems.length ? selectedIndex : 0

  // Popular search suggestions
  const popularSuggestions = [
    t('search.suggestions.barrageVert'),
    t('search.suggestions.tenders'),
    t('search.suggestions.hadjout'),
    t('search.suggestions.careers'),
    t('search.suggestions.rouiba'),
  ]

  // Focus input and lock scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
  }, [isOpen])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const activeElement = listRef.current.children[safeIndex] as HTMLElement | undefined
    if (activeElement && typeof activeElement.scrollIntoView === 'function') {
      activeElement.scrollIntoView({ block: 'nearest' })
    }
  }, [safeIndex])

  if (!isOpen) return null

  const handleSelect = (item: SearchItem) => {
    if (query.trim()) {
      addRecentSearch(query.trim())
    }
    closeSearch()
    navigate(item.url)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems.length > 0 && filteredItems[safeIndex]) {
        handleSelect(filteredItems[safeIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      closeSearch()
    }
  }

  const getCategoryLabel = (cat: SearchCategory) => {
    return t(`search.categories.${cat}`)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-12 sm:p-6 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-label={t('search.inputAria')}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-section)] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <div className="relative flex items-center border-b border-[var(--border-subtle)] px-4 py-3.5 sm:px-5">
          <Search className="size-5 shrink-0 text-[var(--brand-primary)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent px-3 text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:ring-0"
            aria-label={t('search.inputAria')}
            data-testid="search-input"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSelectedIndex(0)
              }}
              className="mr-2 rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] transition"
              aria-label={t('search.clearQuery')}
            >
              <X className="size-4" />
            </button>
          )}

          <button
            type="button"
            onClick={closeSearch}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] transition"
            aria-label={t('search.closeModal')}
          >
            Esc
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-2 text-xs scrollbar-none sm:px-5">
          {categoriesList.map((cat) => {
            const count = categoryCounts[cat] || 0
            const isActive = category === cat

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat)
                  setSelectedIndex(0)
                }}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 font-medium transition',
                  isActive
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]'
                )}
              >
                <span>{getCategoryLabel(cat)}</span>
                {query.trim() && count > 0 && (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.2 text-[10px]',
                      isActive ? 'bg-white/20 text-white' : 'bg-[var(--border-subtle)] text-[var(--text-muted)]'
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Modal Body: Results or Suggestions */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3">
          {/* Empty Query: Show Recent Searches & Popular Suggestions */}
          {!query.trim() && (
            <div className="space-y-4 p-2 sm:p-3">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <History className="size-3.5 text-[var(--brand-primary)]" />
                      {t('search.recentSearches')}
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="inline-flex items-center gap-1 text-[11px] font-normal lowercase text-[var(--text-muted)] hover:text-red-500 transition"
                    >
                      <Trash2 className="size-3" />
                      {t('search.clearRecent')}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setQuery(item)
                          setSelectedIndex(0)
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--surface-muted)] transition shadow-2xs"
                      >
                        <Search className="size-3 text-[var(--text-muted)]" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Suggestions */}
              <div>
                <div className="flex items-center gap-1.5 pb-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  <Sparkles className="size-3.5 text-amber-500" />
                  {t('search.popularSuggestions')}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuery(item)
                        setSelectedIndex(0)
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--surface-muted)] transition shadow-2xs"
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && filteredItems.length > 0 && (
            <ul ref={listRef} className="space-y-1" role="listbox">
              {filteredItems.map((item, index) => {
                const isSelected = index === safeIndex
                const IconComponent = categoryIcons[item.iconName] || Building2

                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'group flex cursor-pointer items-center justify-between gap-3 rounded-xl p-3 transition',
                      isSelected
                        ? 'bg-[var(--surface-muted)] text-[var(--text-primary)] ring-1 ring-[var(--brand-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-page)]'
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={cn(
                          'grid size-9 shrink-0 place-items-center rounded-lg transition',
                          isSelected
                            ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                            : 'bg-[var(--surface-page)] text-[var(--brand-primary)] border border-[var(--border-subtle)]'
                        )}
                      >
                        <IconComponent className="size-4.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold text-sm text-[var(--text-primary)]">
                            {item.title}
                          </p>
                          {item.badge && (
                            <span className="hidden sm:inline-block rounded-md border border-[var(--border-subtle)] bg-[var(--surface-page)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <p className="truncate text-xs text-[var(--text-muted)]">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-[var(--surface-page)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand-secondary)] border border-[var(--border-subtle)]">
                        {getCategoryLabel(item.category)}
                      </span>
                      <ChevronRight
                        className={cn(
                          'size-4 text-[var(--text-muted)] transition transform',
                          isArabic && 'rotate-180',
                          isSelected ? 'opacity-100 translate-x-0.5' : 'opacity-40'
                        )}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {/* 0 Results Found */}
          {query.trim() && filteredItems.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)]">
                <Search className="size-6 opacity-60" />
              </div>
              <p className="font-semibold text-[var(--text-primary)]">
                {t('search.noResults', { query })}
              </p>
              <p className="mx-auto mt-1 max-w-sm text-xs text-[var(--text-muted)]">
                {t('search.noResultsHint')}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-2.5 text-xs text-[var(--text-muted)] sm:px-5">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="inline-flex items-center gap-1">
              <span className="font-mono text-xs">↑↓</span>
              <span>{t('search.hints.navigate')}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <CornerDownLeft className="size-3" />
              <span>{t('search.hints.open')}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--surface-section)] px-1 py-0.5 font-mono text-[10px]">
                Esc
              </kbd>
              <span>{t('search.hints.close')}</span>
            </span>
          </div>

          <div className="ml-auto font-medium text-[11px] text-[var(--brand-secondary)]">
            {filteredItems.length}{' '}
            {t(
              filteredItems.length <= 1
                ? 'search.resultsCount_one'
                : 'search.resultsCount_other',
              { count: filteredItems.length }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
