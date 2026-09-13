import { createContext, useContext } from 'react'
import type { SearchCategory } from '../data/searchIndex'

export interface SearchContextValue {
  isOpen: boolean
  openSearch: (initialQuery?: string) => void
  closeSearch: () => void
  toggleSearch: () => void
  query: string
  setQuery: (query: string) => void
  category: SearchCategory
  setCategory: (category: SearchCategory) => void
  recentSearches: string[]
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
}

export const SearchContext = createContext<SearchContextValue | undefined>(undefined)

export function useSearchPalette() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchPalette must be used within a SearchProvider')
  }
  return context
}
