import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastOptions {
  id?: string
  type?: ToastType
  title?: string
  message: string
  duration?: number
}

interface ToastItem extends ToastOptions {
  id: string
  type: ToastType
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void
  success: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const shouldReduceMotion = useReducedMotion()

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = options.id || Math.random().toString(36).substring(2, 9)
      const type: ToastType = options.type || 'info'
      const duration = options.duration ?? 4000

      const newToast: ToastItem = {
        ...options,
        id,
        type,
      }

      setToasts((prev) => [...prev.filter((t) => t.id !== id), newToast])

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id)
        }, duration)
      }
    },
    [dismissToast],
  )

  const success = useCallback(
    (message: string, title?: string) => showToast({ type: 'success', message, title }),
    [showToast],
  )
  const info = useCallback(
    (message: string, title?: string) => showToast({ type: 'info', message, title }),
    [showToast],
  )
  const warning = useCallback(
    (message: string, title?: string) => showToast({ type: 'warning', message, title }),
    [showToast],
  )
  const error = useCallback(
    (message: string, title?: string) => showToast({ type: 'error', message, title }),
    [showToast],
  )

  return (
    <ToastContext.Provider value={{ showToast, success, info, warning, error, dismissToast }}>
      {children}
      <aside className="toast-viewport" aria-label="Notifications" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon =
              toast.type === 'success'
                ? CheckCircle2
                : toast.type === 'warning'
                  ? AlertTriangle
                  : toast.type === 'error'
                    ? AlertCircle
                    : Info

            return (
              <motion.div
                key={toast.id}
                role="alert"
                className={`toast-item toast-item--${toast.type}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="toast-icon size-5" aria-hidden="true" />
                <div className="toast-body">
                  {toast.title && <div className="toast-title">{toast.title}</div>}
                  <div className="toast-message">{toast.message}</div>
                </div>
                <button
                  type="button"
                  className="toast-close"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Fermer la notification"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
