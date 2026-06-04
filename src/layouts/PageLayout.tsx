import type { PropsWithChildren } from 'react'

import { Reveal } from '../components/animation/Reveal'
import { cn } from '../utils/cn'

type PageLayoutProps = PropsWithChildren<{
  eyebrow: string
  title: string
  description: string
  className?: string
}>

export function PageLayout({ eyebrow, title, description, className, children }: PageLayoutProps) {
  return (
    <main className={cn('site-container py-12 sm:py-16 lg:py-20', className)}>
      <Reveal className="max-w-3xl">
        <p className="section-eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-normal text-[var(--text-primary)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
          {description}
        </p>
      </Reveal>
      {children}
    </main>
  )
}
