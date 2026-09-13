import { useTranslation } from 'react-i18next'

/**
 * Official printable header for ERGR Zaccar documents.
 * Hidden on screen, visible only when printing.
 */
export function PrintableHeader() {
  const { t } = useTranslation()

  return (
    <header className="print-header print-only-flex" aria-hidden="true">
      <img
        className="print-header__logo"
        src="/images/logo-ergr-zaccar.png"
        alt={t('common.siteName')}
        width={70}
        height={96}
      />
      <div className="print-header__text">
        <div className="print-header__text-ar">
          مـجـمـع الـهـنـدسـة الـريـفـيـة
        </div>
        <div className="print-header__text-fr print-header__group-name">
          GROUPE GENIE RURAL – G.G.R.
        </div>
        <div className="print-header__text-ar" style={{ fontSize: '10pt' }}>
          المؤسسة الجهوية للهندسة الريفية- زكار
        </div>
        <div className="print-header__text-fr print-header__subtitle">
          Entreprise Régionale de Génie Rural – ZACCAR
        </div>
        <div className="print-header__capital">
          Spa au capital social de 471.100.000 DA
        </div>
      </div>
    </header>
  )
}
