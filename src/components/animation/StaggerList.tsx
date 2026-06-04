import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { cn } from '../../utils/cn'

type StaggerListProps = PropsWithChildren<{
  className?: string
}>

export function StaggerList({ children, className }: StaggerListProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
