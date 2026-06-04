export const equipment = {
  equipmentParks: 4,
  totalInventoriedItems: 497,
  categories: [
    {
      id: 'earthworks',
      labelKey: 'equipment.categories.earthworks',
    },
    {
      id: 'agricultural',
      labelKey: 'equipment.categories.agricultural',
    },
    {
      id: 'transport',
      labelKey: 'equipment.categories.transport',
    },
    {
      id: 'construction',
      labelKey: 'equipment.categories.construction',
    },
    {
      id: 'support',
      labelKey: 'equipment.categories.support',
    },
  ],
} as const

export const equipmentInventory = [
  { id: 'bulldozers', labelKey: 'equipment.items.bulldozers', count: 20, category: 'earthworks' },
  { id: 'graders', labelKey: 'equipment.items.graders', count: 17, category: 'earthworks' },
  {
    id: 'backhoe-loaders',
    labelKey: 'equipment.items.backhoeLoaders',
    count: 15,
    category: 'earthworks',
  },
  { id: 'loaders', labelKey: 'equipment.items.loaders', count: 7, category: 'earthworks' },
  {
    id: 'agricultural-tractors',
    labelKey: 'equipment.items.agriculturalTractors',
    count: 199,
    category: 'agricultural',
  },
  {
    id: 'hydraulic-drills',
    labelKey: 'equipment.items.hydraulicDrills',
    count: 3,
    category: 'earthworks',
  },
  {
    id: 'agricultural-trucks',
    labelKey: 'equipment.items.agriculturalTrucks',
    count: 7,
    category: 'transport',
  },
  { id: 'trucks', labelKey: 'equipment.items.trucks', count: 99, category: 'transport' },
  { id: 'forklifts', labelKey: 'equipment.items.forklifts', count: 4, category: 'support' },
  { id: 'compactors', labelKey: 'equipment.items.compactors', count: 14, category: 'earthworks' },
  {
    id: 'road-tractors',
    labelKey: 'equipment.items.roadTractors',
    count: 9,
    category: 'transport',
  },
  {
    id: 'equipment-carrier-trailers',
    labelKey: 'equipment.items.equipmentCarrierTrailers',
    count: 3,
    category: 'transport',
  },
  {
    id: 'semi-trailers',
    labelKey: 'equipment.items.semiTrailers',
    count: 2,
    category: 'transport',
  },
  {
    id: 'concrete-mixers',
    labelKey: 'equipment.items.concreteMixers',
    count: 7,
    category: 'construction',
  },
  { id: 'vehicles', labelKey: 'equipment.items.vehicles', count: 91, category: 'support' },
] as const
