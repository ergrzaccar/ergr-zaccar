import { nurseries, nurseryAreas } from './nurseries'

export { nurseries, nurseryAreas }

export type NurseryWilayaFilter =
  | 'all'
  | 'Bouira'
  | 'Aïn Defla'
  | 'Blida'
  | 'Tipaza'
  | 'Chlef'
  | 'Alger'

export type NurseryRegionFilter = 'all' | 'Bouira' | 'Médéa' | 'Chlef' | 'Direction Générale'

export const nurseryHeroMedia = [
  {
    id: 'nursery-greenhouse',
    src: '/images/475885943_931194005798120_598772762441726866_n.jpg',
    altKey: 'nurseriesPage.media.greenhouseAlt',
    labelKey: 'nurseriesPage.media.greenhouseLabel',
  },
  {
    id: 'nursery-bed',
    src: '/images/480223893_940108241573363_5406109843368615104_n.jpg',
    altKey: 'nurseriesPage.media.nurseryBedAlt',
    labelKey: 'nurseriesPage.media.nurseryBedLabel',
  },
] as const

export const nurseryHeroProofKeys = [
  'nurseriesPage.hero.proof.totalArea',
  'nurseriesPage.hero.proof.irrigatedArea',
  'nurseriesPage.hero.proof.annualCapacity',
] as const

export const nurseryCategories = [
  {
    id: 'forestry',
    iconName: 'Trees',
    titleKey: 'nurseriesPage.categories.forestry.title',
    descriptionKey: 'nurseriesPage.categories.forestry.description',
    speciesKey: 'nurseriesPage.categories.forestry.species',
    usageKey: 'nurseriesPage.categories.forestry.usage',
    badgeKey: 'nurseriesPage.categories.forestry.badge',
    image: {
      src: '/images/480279053_939391611645026_9119756449601695498_n.jpg',
      altKey: 'nurseriesPage.categories.forestry.imageAlt',
    },
  },
  {
    id: 'fruit-trees',
    iconName: 'Apple',
    titleKey: 'nurseriesPage.categories.fruitTrees.title',
    descriptionKey: 'nurseriesPage.categories.fruitTrees.description',
    speciesKey: 'nurseriesPage.categories.fruitTrees.species',
    usageKey: 'nurseriesPage.categories.fruitTrees.usage',
    badgeKey: 'nurseriesPage.categories.fruitTrees.badge',
    image: {
      src: '/images/480188727_939391598311694_1074457982978988184_n.jpg',
      altKey: 'nurseriesPage.categories.fruitTrees.imageAlt',
    },
  },
  {
    id: 'ornamental',
    iconName: 'Flower2',
    titleKey: 'nurseriesPage.categories.ornamental.title',
    descriptionKey: 'nurseriesPage.categories.ornamental.description',
    speciesKey: 'nurseriesPage.categories.ornamental.species',
    usageKey: 'nurseriesPage.categories.ornamental.usage',
    badgeKey: 'nurseriesPage.categories.ornamental.badge',
    image: {
      src: '/images/475307251_926224469628407_6156712085319237171_n.jpg',
      altKey: 'nurseriesPage.categories.ornamental.imageAlt',
    },
  },
  {
    id: 'greenhouse-cultivation',
    iconName: 'Warehouse',
    titleKey: 'nurseriesPage.categories.greenhouse.title',
    descriptionKey: 'nurseriesPage.categories.greenhouse.description',
    speciesKey: 'nurseriesPage.categories.greenhouse.species',
    usageKey: 'nurseriesPage.categories.greenhouse.usage',
    badgeKey: 'nurseriesPage.categories.greenhouse.badge',
    image: {
      src: '/images/475885943_931194005798120_598772762441726866_n.jpg',
      altKey: 'nurseriesPage.categories.greenhouse.imageAlt',
    },
  },
] as const

export const nurseryInfrastructures = [
  {
    id: 'irrigation-networks',
    statValue: '133',
    statUnit: 'ha',
    titleKey: 'nurseriesPage.infrastructures.irrigation.title',
    descriptionKey: 'nurseriesPage.infrastructures.irrigation.description',
    featureKeys: [
      'nurseriesPage.infrastructures.irrigation.feat1',
      'nurseriesPage.infrastructures.irrigation.feat2',
      'nurseriesPage.infrastructures.irrigation.feat3',
    ],
  },
  {
    id: 'tunnels-shade',
    statValue: '28+',
    statUnit: 'unités',
    titleKey: 'nurseriesPage.infrastructures.tunnels.title',
    descriptionKey: 'nurseriesPage.infrastructures.tunnels.description',
    featureKeys: [
      'nurseriesPage.infrastructures.tunnels.feat1',
      'nurseriesPage.infrastructures.tunnels.feat2',
      'nurseriesPage.infrastructures.tunnels.feat3',
    ],
  },
  {
    id: 'useful-area',
    statValue: '165.5',
    statUnit: 'ha SAU',
    titleKey: 'nurseriesPage.infrastructures.sau.title',
    descriptionKey: 'nurseriesPage.infrastructures.sau.description',
    featureKeys: [
      'nurseriesPage.infrastructures.sau.feat1',
      'nurseriesPage.infrastructures.sau.feat2',
      'nurseriesPage.infrastructures.sau.feat3',
    ],
  },
] as const

export const nurseryDistributionPartners = [
  {
    id: 'forest-conservations',
    titleKey: 'nurseriesPage.distribution.partners.forests.title',
    descriptionKey: 'nurseriesPage.distribution.partners.forests.description',
    tagKey: 'nurseriesPage.distribution.partners.forests.tag',
  },
  {
    id: 'local-collectivities',
    titleKey: 'nurseriesPage.distribution.partners.collectivities.title',
    descriptionKey: 'nurseriesPage.distribution.partners.collectivities.description',
    tagKey: 'nurseriesPage.distribution.partners.collectivities.tag',
  },
  {
    id: 'agricultural-operators',
    titleKey: 'nurseriesPage.distribution.partners.agriculture.title',
    descriptionKey: 'nurseriesPage.distribution.partners.agriculture.description',
    tagKey: 'nurseriesPage.distribution.partners.agriculture.tag',
  },
  {
    id: 'environmental-initiatives',
    titleKey: 'nurseriesPage.distribution.partners.environment.title',
    descriptionKey: 'nurseriesPage.distribution.partners.environment.description',
    tagKey: 'nurseriesPage.distribution.partners.environment.tag',
  },
] as const

export const wilayaFilterList: { id: NurseryWilayaFilter; labelKey: string }[] = [
  { id: 'all', labelKey: 'nurseriesPage.filters.allWilayas' },
  { id: 'Bouira', labelKey: 'nurseriesPage.filters.wilayas.bouira' },
  { id: 'Aïn Defla', labelKey: 'nurseriesPage.filters.wilayas.ainDefla' },
  { id: 'Blida', labelKey: 'nurseriesPage.filters.wilayas.blida' },
  { id: 'Tipaza', labelKey: 'nurseriesPage.filters.wilayas.tipaza' },
  { id: 'Chlef', labelKey: 'nurseriesPage.filters.wilayas.chlef' },
  { id: 'Alger', labelKey: 'nurseriesPage.filters.wilayas.alger' },
]

export const regionFilterList: { id: NurseryRegionFilter; labelKey: string }[] = [
  { id: 'all', labelKey: 'nurseriesPage.filters.allRegions' },
  { id: 'Bouira', labelKey: 'nurseriesPage.filters.regions.bouira' },
  { id: 'Médéa', labelKey: 'nurseriesPage.filters.regions.medea' },
  { id: 'Chlef', labelKey: 'nurseriesPage.filters.regions.chlef' },
  { id: 'Direction Générale', labelKey: 'nurseriesPage.filters.regions.dg' },
]
