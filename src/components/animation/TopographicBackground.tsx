import { cn } from '../../utils/cn'

type TopographicBackgroundProps = {
  className?: string
}

export function TopographicBackground({ className }: TopographicBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden opacity-80',
        'bg-[radial-gradient(circle_at_20%_20%,var(--map-glow),transparent_34%),radial-gradient(circle_at_80%_0%,var(--technical-glow),transparent_30%)]',
        className,
      )}
    >
      <div className="absolute inset-0 topographic-lines" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
    </div>
  )
}
