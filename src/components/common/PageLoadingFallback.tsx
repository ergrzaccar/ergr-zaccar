import { Loader2 } from 'lucide-react'

export function PageLoadingFallback() {
  return (
    <>
      <div className="page-top-progress" aria-hidden="true" />
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 py-20 text-center"
      >
        <div className="relative flex items-center justify-center">
          <div className="size-12 rounded-full border-2 border-[var(--border-subtle)] border-t-[var(--brand-primary)] animate-spin" />
          <Loader2 className="absolute size-5 text-[var(--brand-primary)] animate-pulse" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Chargement des données institutionnelles...
        </p>
      </div>
    </>
  )
}
