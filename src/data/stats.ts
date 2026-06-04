export const keyStats = [
  {
    id: 'share-capital',
    value: 471_100_000,
    displayValue: '471 100 000 DA',
    labelKey: 'stats.shareCapital',
  },
  {
    id: 'regional-directions',
    value: 3,
    labelKey: 'stats.regionalDirections',
  },
  {
    id: 'implementation-units',
    value: 8,
    labelKey: 'stats.implementationUnits',
  },
  {
    id: 'nurseries',
    value: 9,
    labelKey: 'stats.nurseries',
  },
  {
    id: 'equipment-parks',
    value: 4,
    labelKey: 'stats.equipmentParks',
  },
  {
    id: 'nursery-total-area',
    value: 195.9,
    unit: 'ha',
    labelKey: 'stats.nurseryTotalArea',
  },
  {
    id: 'useful-agricultural-area',
    value: 165.5,
    unit: 'ha',
    labelKey: 'stats.usefulAgriculturalArea',
    note: 'La table detaillee des pepinieres totalise 163,5 ha de surface agricole utile.',
  },
  {
    id: 'irrigated-area',
    value: 133,
    unit: 'ha',
    labelKey: 'stats.irrigatedArea',
  },
] as const

export const productionCapacities = [
  {
    id: 'forest-plants',
    labelKey: 'production.forestPlants',
    capacity: 3_780_000,
    yearlyProduction: {
      2023: 2_247_366,
      2024: 2_538_300,
      2025: 3_149_000,
    },
  },
  {
    id: 'fruit-trees',
    labelKey: 'production.fruitTrees',
    capacity: 600_000,
    yearlyProduction: {
      2023: 1_006_531,
      2024: 295_229,
      2025: 248_020,
    },
  },
  {
    id: 'long-stem-trees',
    labelKey: 'production.longStemTrees',
    capacity: 2_000_000,
    yearlyProduction: {
      2023: 375_703,
      2024: 49_800,
      2025: 473_800,
    },
  },
  {
    id: 'ornamental-plants',
    labelKey: 'production.ornamentalPlants',
    capacity: 400_000,
    yearlyProduction: {
      2023: 134_343,
      2024: 220_940,
      2025: 93_550,
    },
  },
] as const

export const managementIndicators = [
  {
    id: 'turnover',
    labelKey: 'managementIndicators.turnover',
    values: {
      2022: 848_430,
      2023: 934_110,
      2024: 1_479_247,
    },
  },
  {
    id: 'production',
    labelKey: 'managementIndicators.production',
    values: {
      2022: 877_632,
      2023: 1_121_179,
      2024: 1_479_247,
    },
  },
  {
    id: 'added-value',
    labelKey: 'managementIndicators.addedValue',
    values: {
      2022: 587_790,
      2023: 729_975,
      2024: 1_201_927,
    },
  },
  {
    id: 'gross-operating-surplus',
    labelKey: 'managementIndicators.grossOperatingSurplus',
    values: {
      2022: -84_681,
      2023: 47_199,
      2024: 342_103,
    },
  },
  {
    id: 'net-result',
    labelKey: 'managementIndicators.netResult',
    values: {
      2022: -171_077,
      2023: -70_179,
      2024: 94_977,
    },
  },
] as const
