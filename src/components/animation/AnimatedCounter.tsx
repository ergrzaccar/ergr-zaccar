import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type AnimatedCounterProps = {
  value: number
  locale?: string
  suffix?: string
}

export function AnimatedCounter({ value, locale = 'fr-DZ', suffix = '' }: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0)
  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale])
  const visibleValue = shouldReduceMotion ? value : displayValue

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    let frame = 0
    const duration = 900
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(value * easedProgress)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [shouldReduceMotion, value])

  return (
    <span>
      {formatter.format(Math.round(visibleValue))}
      {suffix}
    </span>
  )
}
