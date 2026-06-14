import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useInView } from 'motion/react'

type AnimatedCounterProps = {
  value: number
  locale?: string
  suffix?: string
  precision?: number
  duration?: number
}

export function AnimatedCounter({
  value,
  locale = 'fr-DZ',
  suffix = '',
  precision = 0,
  duration = 720,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(counterRef, { once: true, margin: '-10% 0px' })
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0)
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision,
      }),
    [locale, precision],
  )
  const visibleValue = shouldReduceMotion ? value : displayValue
  const formattedValue =
    precision > 0 ? Number(visibleValue.toFixed(precision)) : Math.round(visibleValue)

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    if (!isInView) {
      return
    }

    let frame = 0
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
  }, [duration, isInView, shouldReduceMotion, value])

  const valueWithSuffix = (
    <>
      {formatter.format(formattedValue)}
      {suffix}
    </>
  )

  return suffix ? (
    <bdi ref={counterRef} dir="ltr">
      {valueWithSuffix}
    </bdi>
  ) : (
    <span ref={counterRef}>{valueWithSuffix}</span>
  )
}
