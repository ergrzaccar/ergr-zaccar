import { NewsCtaSection } from '../components/news/NewsCtaSection'
import { NewsGridSection } from '../components/news/NewsGridSection'
import { NewsPageHero } from '../components/news/NewsPageHero'
import { NewsPressKitSection } from '../components/news/NewsPressKitSection'
import { SEOHead } from '../components/seo/SEOHead'

export function NewsPage() {
  return (
    <>
      <SEOHead titleKey="pages.news.title" descriptionKey="pages.news.description" />
      <main className="news-page">
        <NewsPageHero />
        <NewsGridSection />
        <NewsPressKitSection />
        <NewsCtaSection />
      </main>
    </>
  )
}
