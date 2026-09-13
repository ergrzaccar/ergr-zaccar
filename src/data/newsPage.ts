export const newsHeroProofKeys = [
  'newsPage.hero.proof.coverage',
  'newsPage.hero.proof.bulletins',
  'newsPage.hero.proof.certified',
  'newsPage.hero.proof.relations',
] as const

export type NewsCategory =
  | 'all'
  | 'barrage-vert'
  | 'nurseries'
  | 'field-works'
  | 'institutional'
  | 'emergency'

export type NewsYear = 'all' | '2026' | '2025'

export interface NewsArticle {
  id: string
  slug: string
  category: Exclude<NewsCategory, 'all'>
  year: '2026' | '2025'
  date: string
  readTime: string
  isFeatured?: boolean
  image: string
  titleKey: string
  summaryKey: string
  contentKey: string
  wilayas: string[]
  authorKey: string
  keyFigures?: {
    labelKey: string
    value: string
  }[]
}

export const newsCategoryOptions: { id: NewsCategory; labelKey: string }[] = [
  { id: 'all', labelKey: 'newsPage.filters.categories.all' },
  { id: 'barrage-vert', labelKey: 'newsPage.filters.categories.barrageVert' },
  { id: 'nurseries', labelKey: 'newsPage.filters.categories.nurseries' },
  { id: 'field-works', labelKey: 'newsPage.filters.categories.fieldWorks' },
  { id: 'institutional', labelKey: 'newsPage.filters.categories.institutional' },
  { id: 'emergency', labelKey: 'newsPage.filters.categories.emergency' },
]

export const newsYearOptions: { id: NewsYear; labelKey: string }[] = [
  { id: 'all', labelKey: 'newsPage.filters.years.all' },
  { id: '2026', labelKey: 'newsPage.filters.years.y2026' },
  { id: '2025', labelKey: 'newsPage.filters.years.y2025' },
]

export const newsArticlesData: NewsArticle[] = [
  {
    id: 'barrage-vert-campaign-2026',
    slug: 'relance-strategique-barrage-vert-2026',
    category: 'barrage-vert',
    year: '2026',
    date: '22/02/2026',
    readTime: '5 min',
    isFeatured: true,
    image: '/images/IMG_20151105_142546.jpg',
    titleKey: 'newsPage.articles.barrageVert.title',
    summaryKey: 'newsPage.articles.barrageVert.summary',
    contentKey: 'newsPage.articles.barrageVert.content',
    wilayas: ['Médéa', 'Djelfa', 'Bouira'],
    authorKey: 'newsPage.authors.directionTechnique',
    keyFigures: [
      { labelKey: 'newsPage.figures.plantsMobilized', value: '1 250 000' },
      { labelKey: 'newsPage.figures.surfaceTargeted', value: '2 800 ha' },
      { labelKey: 'newsPage.figures.pastoralTracks', value: '75 km' },
    ],
  },
  {
    id: 'nurseries-production-record-2026',
    slug: 'record-production-9-pepinieres-2026',
    category: 'nurseries',
    year: '2026',
    date: '14/02/2026',
    readTime: '4 min',
    image: '/images/475307251_926224469628407_6156712085319237171_n.jpg',
    titleKey: 'newsPage.articles.nurseriesRecord.title',
    summaryKey: 'newsPage.articles.nurseriesRecord.summary',
    contentKey: 'newsPage.articles.nurseriesRecord.content',
    wilayas: ['Aïn Defla', 'Blida', 'Chlef', 'Alger'],
    authorKey: 'newsPage.authors.directionPepinieres',
    keyFigures: [
      { labelKey: 'newsPage.figures.totalPlantsProduced', value: '4 850 000' },
      { labelKey: 'newsPage.figures.irrigatedArea', value: '133 ha' },
      { labelKey: 'newsPage.figures.modernizedGreenhouses', value: '24 unités' },
    ],
  },
  {
    id: 'mountain-tracks-miliana-2026',
    slug: 'desenclavement-pistes-montagneuses-miliana-2026',
    category: 'field-works',
    year: '2026',
    date: '28/01/2026',
    readTime: '4 min',
    image: '/images/475767251_931194062464781_6058340278159811732_n.jpg',
    titleKey: 'newsPage.articles.mountainTracks.title',
    summaryKey: 'newsPage.articles.mountainTracks.summary',
    contentKey: 'newsPage.articles.mountainTracks.content',
    wilayas: ['Aïn Defla', 'Tissemsilt'],
    authorKey: 'newsPage.authors.uniteAinDefla',
    keyFigures: [
      { labelKey: 'newsPage.figures.openedTracksLinear', value: '64 km' },
      { labelKey: 'newsPage.figures.villagesConnected', value: '14 douars' },
      { labelKey: 'newsPage.figures.culvertsInstalled', value: '48 buses' },
    ],
  },
  {
    id: 'partnership-inrf-blida-2025',
    slug: 'partenariat-recherche-inrf-universite-blida',
    category: 'institutional',
    year: '2025',
    date: '18/12/2025',
    readTime: '3 min',
    image: '/images/476617012_935498055367715_2128426191809366240_n.jpg',
    titleKey: 'newsPage.articles.scientificPartnership.title',
    summaryKey: 'newsPage.articles.scientificPartnership.summary',
    contentKey: 'newsPage.articles.scientificPartnership.content',
    wilayas: ['Blida', 'Alger'],
    authorKey: 'newsPage.authors.directionGenerale',
    keyFigures: [
      { labelKey: 'newsPage.figures.researchThemes', value: '4 axes' },
      { labelKey: 'newsPage.figures.phdResearchers', value: '12 doctorants' },
      { labelKey: 'newsPage.figures.pilotPlots', value: '6 parcelles' },
    ],
  },
  {
    id: 'forest-fire-mobilization-2025',
    slug: 'dispositif-interventions-feux-forets-ete-2025',
    category: 'emergency',
    year: '2025',
    date: '10/08/2025',
    readTime: '4 min',
    image: '/images/477689726_937365265180994_4739213264751197339_n.jpg',
    titleKey: 'newsPage.articles.fireDefense.title',
    summaryKey: 'newsPage.articles.fireDefense.summary',
    contentKey: 'newsPage.articles.fireDefense.content',
    wilayas: ['Bouira', 'Médéa', 'Tipaza', 'Blida'],
    authorKey: 'newsPage.authors.celluleCrise',
    keyFigures: [
      { labelKey: 'newsPage.figures.firebreaksOpened', value: '180 km' },
      { labelKey: 'newsPage.figures.heavyEquipmentDuty', value: '38 engins' },
      { labelKey: 'newsPage.figures.waterTankers', value: '14 citernes' },
    ],
  },
  {
    id: 'sipsa-filaha-expo-2025',
    slug: 'participation-sipsa-filaha-alger-2025',
    category: 'institutional',
    year: '2025',
    date: '25/05/2025',
    readTime: '3 min',
    image: '/images/Administration.jpg',
    titleKey: 'newsPage.articles.sipsaExpo.title',
    summaryKey: 'newsPage.articles.sipsaExpo.summary',
    contentKey: 'newsPage.articles.sipsaExpo.content',
    wilayas: ['Alger'],
    authorKey: 'newsPage.authors.directionGenerale',
    keyFigures: [
      { labelKey: 'newsPage.figures.visitorsStand', value: '12 000+' },
      { labelKey: 'newsPage.figures.institutionalAgreements', value: '8 accords' },
      { labelKey: 'newsPage.figures.plantsDemonstrated', value: '45 espèces' },
    ],
  },
]

export interface PressKitItem {
  id: string
  titleKey: string
  descKey: string
  format: string
  size: string
  date: string
  filename: string
}

export const pressKitItems: PressKitItem[] = [
  {
    id: 'dossier-presse-2026',
    titleKey: 'newsPage.pressKit.items.dossier2026.title',
    descKey: 'newsPage.pressKit.items.dossier2026.desc',
    format: 'PDF',
    size: '8,4 Mo',
    date: 'Janvier 2026',
    filename: 'ERGR_Zaccar_Dossier_Presse_2026.pdf',
  },
  {
    id: 'logos-charte-hd',
    titleKey: 'newsPage.pressKit.items.brandingKit.title',
    descKey: 'newsPage.pressKit.items.brandingKit.desc',
    format: 'ZIP (SVG/PNG)',
    size: '14,2 Mo',
    date: '2026',
    filename: 'ERGR_Zaccar_Pack_Logos_HD.zip',
  },
  {
    id: 'photos-pack-chantiers',
    titleKey: 'newsPage.pressKit.items.photoPack.title',
    descKey: 'newsPage.pressKit.items.photoPack.desc',
    format: 'ZIP (JPG HD)',
    size: '38,5 Mo',
    date: 'Février 2026',
    filename: 'ERGR_Zaccar_Reportage_Photos_HD.zip',
  },
  {
    id: 'fiche-chiffres-cles',
    titleKey: 'newsPage.pressKit.items.keyFiguresSheet.title',
    descKey: 'newsPage.pressKit.items.keyFiguresSheet.desc',
    format: 'PDF',
    size: '2,1 Mo',
    date: '2026',
    filename: 'ERGR_Zaccar_Fiche_Repere_2026.pdf',
  },
]

export const pressOfficeInfo = {
  serviceName: 'Cellule de Communication & Relations Presse',
  address: 'Haouch Rouiba, BP 34, Rouiba 16012, Alger',
  phone: '+213 (0) 23 85 41 20 (Poste 215)',
  fax: '+213 (0) 23 85 41 21',
  email: 'presse@ergr-zaccar.dz',
  hours: 'Dimanche au Jeudi : 08h30 - 16h00',
  accreditationNoteKey: 'newsPage.cta.accreditationNote',
} as const
