import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export interface LightboxImage {
  src: string
  alt?: string
  title?: string
  category?: string
}

interface LightboxContextValue {
  openLightbox: (image: LightboxImage) => void
  closeLightbox: () => void
}

const LightboxContext = createContext<LightboxContextValue | undefined>(undefined)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const openLightbox = useCallback((image: LightboxImage) => {
    setActiveImage(image)
    setIsZoomed(false)
  }, [])

  const closeLightbox = useCallback(() => {
    setActiveImage(null)
    setIsZoomed(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!activeImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent background scroll while lightbox is open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [activeImage, closeLightbox])

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="lightbox-backdrop"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title || activeImage.alt || 'Aperçu photo'}
          >
            <div
              className="lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Fermer la vue agrandie"
                title="Fermer (Échap)"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <motion.img
                src={activeImage.src}
                alt={activeImage.alt || ''}
                className="lightbox-image"
                style={{
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  transform: isZoomed ? 'scale(1.35)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={() => setIsZoomed((z) => !z)}
                initial={shouldReduceMotion ? false : { scale: 0.9, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
              />

              <div className="lightbox-caption">
                {activeImage.category && (
                  <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-semibold rounded-full bg-[var(--brand-primary)] text-white">
                    {activeImage.category}
                  </span>
                )}
                {activeImage.title && (
                  <div className="font-semibold text-white text-base">
                    {activeImage.title}
                  </div>
                )}
                {activeImage.alt && activeImage.alt !== activeImage.title && (
                  <div className="text-xs text-stone-300 mt-1">
                    {activeImage.alt}
                  </div>
                )}
                <div className="mt-2 text-xs text-stone-400 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsZoomed((z) => !z)}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {isZoomed ? (
                      <>
                        <ZoomOut className="size-3.5" aria-hidden="true" />
                        <span>Réinitialiser le zoom</span>
                      </>
                    ) : (
                      <>
                        <ZoomIn className="size-3.5" aria-hidden="true" />
                        <span>Cliquer pour zoomer</span>
                      </>
                    )}
                  </button>
                  <span>•</span>
                  <span>Échap pour fermer</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}

export function useLightbox(): LightboxContextValue {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}
