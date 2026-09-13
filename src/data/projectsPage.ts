export type ProjectCategory =
  | 'all'
  | 'reforestation'
  | 'rural-tracks'
  | 'watershed-protection'
  | 'green-spaces'
  | 'forestry-works'

export type ProjectStatus = 'all' | 'completed' | 'in-progress'

export interface ProjectItem {
  id: string
  titleKey: string
  summaryKey: string
  descriptionKey: string
  category: Exclude<ProjectCategory, 'all'>
  status: Exclude<ProjectStatus, 'all'>
  wilayaId: string
  wilayaNameKey: string
  locationFr: string
  year: string
  clientKey: string
  metricValue: string
  metricLabelKey: string
  imageSrc: string
  imageAltKey: string
  specs: {
    duration: string
    surfaceOrLength: string
    workforce: string
    equipmentMobilized: string
  }
}

export const projectCategoryFilters: { id: ProjectCategory; labelKey: string }[] = [
  { id: 'all', labelKey: 'projectsPage.filters.allCategories' },
  { id: 'reforestation', labelKey: 'projectsPage.categories.reforestation' },
  { id: 'rural-tracks', labelKey: 'projectsPage.categories.ruralTracks' },
  { id: 'watershed-protection', labelKey: 'projectsPage.categories.watershedProtection' },
  { id: 'green-spaces', labelKey: 'projectsPage.categories.greenSpaces' },
  { id: 'forestry-works', labelKey: 'projectsPage.categories.forestryWorks' },
]

export const projectWilayaFilters = [
  { id: 'all', labelKey: 'projectsPage.filters.allWilayas' },
  { id: 'ain-defla', labelKey: 'projectsPage.wilayas.ainDefla' },
  { id: 'alger', labelKey: 'projectsPage.wilayas.alger' },
  { id: 'blida', labelKey: 'projectsPage.wilayas.blida' },
  { id: 'bouira', labelKey: 'projectsPage.wilayas.bouira' },
  { id: 'chlef', labelKey: 'projectsPage.wilayas.chlef' },
  { id: 'medea', labelKey: 'projectsPage.wilayas.medea' },
  { id: 'tipaza', labelKey: 'projectsPage.wilayas.tipaza' },
  { id: 'tissemsilt', labelKey: 'projectsPage.wilayas.tissemsilt' },
] as const

export const projectStatusFilters: { id: ProjectStatus; labelKey: string }[] = [
  { id: 'all', labelKey: 'projectsPage.filters.allStatuses' },
  { id: 'completed', labelKey: 'projectsPage.status.completed' },
  { id: 'in-progress', labelKey: 'projectsPage.status.inProgress' },
]

export const projectHeroProofKeys = [
  'projectsPage.hero.proof.plantsCount',
  'projectsPage.hero.proof.tracksCount',
  'projectsPage.hero.proof.gabionsCount',
  'projectsPage.hero.proof.wilayasCount',
] as const

export const globalImpactStats = [
  {
    id: 'plants',
    value: 3500000,
    prefix: '> ',
    suffix: '',
    labelKey: 'projectsPage.impact.plantsLabel',
    descriptionKey: 'projectsPage.impact.plantsDesc',
  },
  {
    id: 'tracks',
    value: 450,
    prefix: '> ',
    suffix: ' km',
    labelKey: 'projectsPage.impact.tracksLabel',
    descriptionKey: 'projectsPage.impact.tracksDesc',
  },
  {
    id: 'gabions',
    value: 85000,
    prefix: '> ',
    suffix: ' m³',
    labelKey: 'projectsPage.impact.gabionsLabel',
    descriptionKey: 'projectsPage.impact.gabionsDesc',
  },
  {
    id: 'wilayas',
    value: 8,
    prefix: '',
    suffix: '',
    labelKey: 'projectsPage.impact.wilayasLabel',
    descriptionKey: 'projectsPage.impact.wilayasDesc',
  },
] as const

export const projectsList: ProjectItem[] = [
  {
    id: 'barrage-vert-reboisement',
    titleKey: 'projectsPage.items.barrageVert.title',
    summaryKey: 'projectsPage.items.barrageVert.summary',
    descriptionKey: 'projectsPage.items.barrageVert.description',
    category: 'reforestation',
    status: 'in-progress',
    wilayaId: 'medea',
    wilayaNameKey: 'projectsPage.wilayas.medea',
    locationFr: 'Ksar El Boukhari / Berrouaghia',
    year: '2023 - 2025',
    clientKey: 'projectsPage.clients.forestsConservation',
    metricValue: '1 250 000',
    metricLabelKey: 'projectsPage.metrics.plantsPlanted',
    imageSrc: '/images/477080385_936387561945431_8023476943758542750_n.jpg',
    imageAltKey: 'projectsPage.items.barrageVert.imageAlt',
    specs: {
      duration: '24 mois',
      surfaceOrLength: '2 800 hectares',
      workforce: '180 ouvriers et 8 ingénieurs',
      equipmentMobilized: '14 tracteurs agricoles, 4 bulldozers',
    },
  },
  {
    id: 'pistes-massif-zaccar',
    titleKey: 'projectsPage.items.pistesZaccar.title',
    summaryKey: 'projectsPage.items.pistesZaccar.summary',
    descriptionKey: 'projectsPage.items.pistesZaccar.description',
    category: 'rural-tracks',
    status: 'completed',
    wilayaId: 'ain-defla',
    wilayaNameKey: 'projectsPage.wilayas.ainDefla',
    locationFr: 'Massif du Mont Zaccar (Miliana)',
    year: '2022 - 2024',
    clientKey: 'projectsPage.clients.wilayaAdministration',
    metricValue: '64 km',
    metricLabelKey: 'projectsPage.metrics.tracksOpened',
    imageSrc: '/images/480746303_947928867457967_334810032618287641_n.jpg',
    imageAltKey: 'projectsPage.items.pistesZaccar.imageAlt',
    specs: {
      duration: '18 mois',
      surfaceOrLength: '64 km linéaires',
      workforce: '45 conducteurs et techniciens',
      equipmentMobilized: '6 bulldozers, 4 niveleuses, 8 camions',
    },
  },
  {
    id: 'correction-oued-chelif',
    titleKey: 'projectsPage.items.ouedChelif.title',
    summaryKey: 'projectsPage.items.ouedChelif.summary',
    descriptionKey: 'projectsPage.items.ouedChelif.description',
    category: 'watershed-protection',
    status: 'completed',
    wilayaId: 'chlef',
    wilayaNameKey: 'projectsPage.wilayas.chlef',
    locationFr: 'Oued Fodda / Bassin Chélif',
    year: '2023 - 2024',
    clientKey: 'projectsPage.clients.waterResources',
    metricValue: '18 500 m³',
    metricLabelKey: 'projectsPage.metrics.gabionsPlaced',
    imageSrc: '/images/502952989_1015512027366317_3116709720755076002_n.jpg',
    imageAltKey: 'projectsPage.items.ouedChelif.imageAlt',
    specs: {
      duration: '14 mois',
      surfaceOrLength: '12 ravins stabilisés',
      workforce: '60 gabionneurs et maçons',
      equipmentMobilized: '3 pelleteuses, 4 camions bennes',
    },
  },
  {
    id: 'pare-feu-massifs-bouira',
    titleKey: 'projectsPage.items.pareFeuBouira.title',
    summaryKey: 'projectsPage.items.pareFeuBouira.summary',
    descriptionKey: 'projectsPage.items.pareFeuBouira.description',
    category: 'forestry-works',
    status: 'completed',
    wilayaId: 'bouira',
    wilayaNameKey: 'projectsPage.wilayas.bouira',
    locationFr: 'Massifs de Tikjda et Djurdjura',
    year: '2023 - 2024',
    clientKey: 'projectsPage.clients.forestsConservation',
    metricValue: '120 km',
    metricLabelKey: 'projectsPage.metrics.firebreaksOpened',
    imageSrc: '/images/502747048_1015511904032996_5901597628288453476_n.jpg',
    imageAltKey: 'projectsPage.items.pareFeuBouira.imageAlt',
    specs: {
      duration: '10 mois',
      surfaceOrLength: '120 km de tranchées',
      workforce: '75 bûcherons et conducteurs',
      equipmentMobilized: '5 bulldozers, 3 niveleuses, 4 broyeurs',
    },
  },
  {
    id: 'ceinture-verte-el-harrach',
    titleKey: 'projectsPage.items.ceintureVerte.title',
    summaryKey: 'projectsPage.items.ceintureVerte.summary',
    descriptionKey: 'projectsPage.items.ceintureVerte.description',
    category: 'green-spaces',
    status: 'in-progress',
    wilayaId: 'alger',
    wilayaNameKey: 'projectsPage.wilayas.alger',
    locationFr: 'Vallée d’El Harrach / Alger',
    year: '2024 - 2025',
    clientKey: 'projectsPage.clients.wilayaAlger',
    metricValue: '45 000',
    metricLabelKey: 'projectsPage.metrics.treesAndShrubs',
    imageSrc: '/images/490181508_979844404266413_1852332798832378566_n.jpg',
    imageAltKey: 'projectsPage.items.ceintureVerte.imageAlt',
    specs: {
      duration: '16 mois',
      surfaceOrLength: '32 hectares urbains',
      workforce: '55 paysagistes et jardiniers',
      equipmentMobilized: '3 chargeuses, 5 camions-citernes',
    },
  },
  {
    id: 'retenues-collinaires-tissemsilt',
    titleKey: 'projectsPage.items.retenuesTissemsilt.title',
    summaryKey: 'projectsPage.items.retenuesTissemsilt.summary',
    descriptionKey: 'projectsPage.items.retenuesTissemsilt.description',
    category: 'watershed-protection',
    status: 'completed',
    wilayaId: 'tissemsilt',
    wilayaNameKey: 'projectsPage.wilayas.tissemsilt',
    locationFr: 'Périmètre de Theniet El Had',
    year: '2022 - 2023',
    clientKey: 'projectsPage.clients.agricultureServices',
    metricValue: '180 000 m³',
    metricLabelKey: 'projectsPage.metrics.waterStored',
    imageSrc: '/images/506189441_1021764676741052_7999458131536683219_n.jpg',
    imageAltKey: 'projectsPage.items.retenuesTissemsilt.imageAlt',
    specs: {
      duration: '12 mois',
      surfaceOrLength: '3 retenues collinaires',
      workforce: '35 techniciens et terrassiers',
      equipmentMobilized: '4 compacteurs, 3 pelleteuses, 4 camions',
    },
  },
  {
    id: 'rehabilitation-mont-chenoua',
    titleKey: 'projectsPage.items.montChenoua.title',
    summaryKey: 'projectsPage.items.montChenoua.summary',
    descriptionKey: 'projectsPage.items.montChenoua.description',
    category: 'reforestation',
    status: 'completed',
    wilayaId: 'tipaza',
    wilayaNameKey: 'projectsPage.wilayas.tipaza',
    locationFr: 'Mont Chenoua & Littoral Tipaza',
    year: '2022 - 2024',
    clientKey: 'projectsPage.clients.forestsConservation',
    metricValue: '450 000',
    metricLabelKey: 'projectsPage.metrics.plantsPlanted',
    imageSrc: '/images/475885943_931194005798120_598772762441726866_n.jpg',
    imageAltKey: 'projectsPage.items.montChenoua.imageAlt',
    specs: {
      duration: '18 mois',
      surfaceOrLength: '620 hectares restaurés',
      workforce: '90 ouvriers et 4 ingénieurs',
      equipmentMobilized: '8 tracteurs agricoles, 2 bulldozers',
    },
  },
  {
    id: 'pistes-sylvicoles-chrea',
    titleKey: 'projectsPage.items.pistesChrea.title',
    summaryKey: 'projectsPage.items.pistesChrea.summary',
    descriptionKey: 'projectsPage.items.pistesChrea.description',
    category: 'rural-tracks',
    status: 'in-progress',
    wilayaId: 'blida',
    wilayaNameKey: 'projectsPage.wilayas.blida',
    locationFr: 'Parc National de Chréa',
    year: '2023 - 2025',
    clientKey: 'projectsPage.clients.forestsConservation',
    metricValue: '38 km',
    metricLabelKey: 'projectsPage.metrics.mountainTracks',
    imageSrc: '/images/481154225_949917167259137_413692787791323918_n.jpg',
    imageAltKey: 'projectsPage.items.pistesChrea.imageAlt',
    specs: {
      duration: '15 mois',
      surfaceOrLength: '38 km en haute altitude',
      workforce: '40 conducteurs spécialisés',
      equipmentMobilized: '4 bulldozers rocheux, 2 niveleuses',
    },
  },
]
