import { equipment, equipmentInventory } from './equipment'

export { equipment, equipmentInventory }

export type EquipmentCategoryFilter =
  | 'all'
  | 'earthworks'
  | 'agricultural'
  | 'transport'
  | 'construction'
  | 'support'

export const resourcesHeroMedia = [
  {
    id: 'heavy-machinery',
    src: '/images/481154225_949917167259137_413692787791323918_n.jpg',
    altKey: 'resourcesPage.media.machineryAlt',
    labelKey: 'resourcesPage.media.machineryLabel',
  },
  {
    id: 'field-operations',
    src: '/images/502952989_1015512027366317_3116709720755076002_n.jpg',
    altKey: 'resourcesPage.media.operationsAlt',
    labelKey: 'resourcesPage.media.operationsLabel',
  },
] as const

export const resourcesHeroProofKeys = [
  'resourcesPage.hero.proof.totalFleet',
  'resourcesPage.hero.proof.parks',
  'resourcesPage.hero.proof.earthworks',
] as const

export const categoryFilterList: { id: EquipmentCategoryFilter; labelKey: string }[] = [
  { id: 'all', labelKey: 'resourcesPage.filters.allCategories' },
  { id: 'earthworks', labelKey: 'equipment.categories.earthworks' },
  { id: 'agricultural', labelKey: 'equipment.categories.agricultural' },
  { id: 'transport', labelKey: 'equipment.categories.transport' },
  { id: 'construction', labelKey: 'equipment.categories.construction' },
  { id: 'support', labelKey: 'equipment.categories.support' },
]

export const humanCapitalProfiles = [
  {
    id: 'engineers',
    iconName: 'GraduationCap',
    titleKey: 'resourcesPage.humanCapital.engineers.title',
    descriptionKey: 'resourcesPage.humanCapital.engineers.description',
    roleKeys: [
      'resourcesPage.humanCapital.engineers.role1',
      'resourcesPage.humanCapital.engineers.role2',
      'resourcesPage.humanCapital.engineers.role3',
    ],
  },
  {
    id: 'operators',
    iconName: 'HardHat',
    titleKey: 'resourcesPage.humanCapital.operators.title',
    descriptionKey: 'resourcesPage.humanCapital.operators.description',
    roleKeys: [
      'resourcesPage.humanCapital.operators.role1',
      'resourcesPage.humanCapital.operators.role2',
      'resourcesPage.humanCapital.operators.role3',
    ],
  },
  {
    id: 'technicians',
    iconName: 'Wrench',
    titleKey: 'resourcesPage.humanCapital.technicians.title',
    descriptionKey: 'resourcesPage.humanCapital.technicians.description',
    roleKeys: [
      'resourcesPage.humanCapital.technicians.role1',
      'resourcesPage.humanCapital.technicians.role2',
      'resourcesPage.humanCapital.technicians.role3',
    ],
  },
  {
    id: 'nurserymen',
    iconName: 'Sprout',
    titleKey: 'resourcesPage.humanCapital.nurserymen.title',
    descriptionKey: 'resourcesPage.humanCapital.nurserymen.description',
    roleKeys: [
      'resourcesPage.humanCapital.nurserymen.role1',
      'resourcesPage.humanCapital.nurserymen.role2',
      'resourcesPage.humanCapital.nurserymen.role3',
    ],
  },
] as const

export const emergencyInterventions = [
  {
    id: 'fire-fighting',
    iconName: 'Flame',
    titleKey: 'resourcesPage.interventions.fires.title',
    descriptionKey: 'resourcesPage.interventions.fires.description',
    actionKey: 'resourcesPage.interventions.fires.action',
  },
  {
    id: 'winter-clearance',
    iconName: 'Snowflake',
    titleKey: 'resourcesPage.interventions.snow.title',
    descriptionKey: 'resourcesPage.interventions.snow.description',
    actionKey: 'resourcesPage.interventions.snow.action',
  },
  {
    id: 'flood-protection',
    iconName: 'Waves',
    titleKey: 'resourcesPage.interventions.floods.title',
    descriptionKey: 'resourcesPage.interventions.floods.description',
    actionKey: 'resourcesPage.interventions.floods.action',
  },
] as const
