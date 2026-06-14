import { Reveal } from '../animation/Reveal'

type HomeSectionHeaderProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'start' | 'center'
}

export function HomeSectionHeader({
  eyebrow,
  title,
  description,
  align = 'start',
}: HomeSectionHeaderProps) {
  return (
    <Reveal
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-start'}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-normal text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
        {description}
      </p>
    </Reveal>
  )
}
