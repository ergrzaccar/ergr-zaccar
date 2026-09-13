import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { withTranslation } from 'react-i18next'
import type { WithTranslation } from 'react-i18next'

interface ErrorBoundaryProps extends WithTranslation {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryInner extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      const { t } = this.props

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-boundary-icon" aria-hidden="true">⚠️</div>
            <h1 className="error-boundary-title">{t('error.title')}</h1>
            <p className="error-boundary-message">{t('error.message')}</p>
            <div className="error-boundary-actions">
              <button
                type="button"
                className="error-boundary-reload"
                onClick={this.handleReload}
              >
                {t('error.reload')}
              </button>
              <button
                type="button"
                className="error-boundary-home"
                onClick={this.handleGoHome}
              >
                {t('error.backHome')}
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryInner)
