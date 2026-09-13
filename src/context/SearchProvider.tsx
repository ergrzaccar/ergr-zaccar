import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { SearchCategory } from '../data/searchIndex'
import { SearchContext } from './search-context'

const RECENT_SEARCHES_KEY = 'ergr_recent_searches'
const MAX_RECENT_SEARCHES = 6

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SearchCategory>('all')
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) return parsed.slice(0, MAX_RECENT_SEARCHES)
      }
    } catch {
      // Ignore storage parse errors
    }
    return ['Barrage Vert', 'AON 2026', 'Miliana']
  })

  const openSearch = useCallback((initialQuery = '') => {
    setQuery(initialQuery)
    setCategory('all')
    setIsOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const addRecentSearch = useCallback((newQuery: string) => {
    const trimmed = newQuery.trim()
    if (!trimmed || trimmed.length < 2) return

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
      } catch {
        // Ignore storage errors
      }
      return updated
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    } catch {
      // Ignore
    }
  }, [])

  // Global Keyboard Shortcuts (Ctrl+K, Cmd+K, /, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + K or Cmd + K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      // Quick slash / shortcut when not typing in an input
      if (e.key === '/' && !isOpen) {
        const target = e.target as HTMLElement | null
        const isInput =
          target?.tagName === 'INPUT' ||
          target?.tagName === 'TEXTAREA' ||
          target?.tagName === 'SELECT' ||
          target?.isContentEditable

        if (!isInput) {
          e.preventDefault()
          setIsOpen(true)
          return
        }
      }

      // Escape closes search
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        openSearch,
        closeSearch,
        toggleSearch,
        query,
        setQuery,
        category,
        setCategory,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
