import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { contactFaqItems } from '../../data/contactPage'

export function ContactFaqSection() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(contactFaqItems[0]?.id || null)

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="section-band contact-faq-section">
      <div className="site-container">
        <div className="contact-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('contactPage.faq.eyebrow')}</p>
            <h2 className="section-title">{t('contactPage.faq.title')}</h2>
            <p className="section-lead">{t('contactPage.faq.description')}</p>
          </Reveal>
        </div>

        <div className="contact-faq-list">
          {contactFaqItems.map((item, idx) => {
            const isOpen = openId === item.id
            const questionId = `faq-q-${item.id}`
            const answerId = `faq-a-${item.id}`

            return (
              <Reveal key={item.id} delay={idx * 0.08}>
                <div className={`contact-faq-item ${isOpen ? 'contact-faq-item-open' : ''}`}>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(item.id)}
                    className="contact-faq-question-btn"
                  >
                    <div className="contact-faq-question-content">
                      <HelpCircle className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                      <span className="contact-faq-question-text">{t(item.questionKey)}</span>
                    </div>
                    <ChevronDown
                      className={`size-5 text-[var(--text-secondary)] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[var(--brand-primary)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className="contact-faq-answer"
                    >
                      <p>{t(item.answerKey)}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
