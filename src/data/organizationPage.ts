import { organization } from './organization'

export { organization }

export const organizationHeroMedia = [
  {
    id: 'headquarters-admin',
    src: '/images/Administration.jpg',
    altKey: 'organizationPage.media.adminAlt',
    labelKey: 'organizationPage.media.adminLabel',
  },
  {
    id: 'team-supervision',
    src: '/images/572399479_1127777472806438_7111055563292563474_n.jpg',
    altKey: 'organizationPage.media.teamAlt',
    labelKey: 'organizationPage.media.teamLabel',
  },
] as const

export const organizationHeroProofKeys = [
  'organizationPage.hero.proof.regionalDirections',
  'organizationPage.hero.proof.units',
  'organizationPage.hero.proof.equipmentParks',
] as const

export const governanceLevels = [
  {
    id: 'central-functional',
    levelNumber: '01',
    iconName: 'Building2',
    titleKey: 'organization.levels.centralFunctional',
    descriptionKey: 'organization.levels.centralFunctionalDescription',
    detailsKey: 'organizationPage.governance.centralDetails',
  },
  {
    id: 'operational',
    levelNumber: '02',
    iconName: 'Network',
    titleKey: 'organization.levels.operational',
    descriptionKey: 'organization.levels.operationalDescription',
    detailsKey: 'organizationPage.governance.operationalDetails',
  },
  {
    id: 'support-production',
    levelNumber: '03',
    iconName: 'Wrench',
    titleKey: 'organization.levels.supportProduction',
    descriptionKey: 'organization.levels.supportProductionDescription',
    detailsKey: 'organizationPage.governance.supportDetails',
  },
] as const

export const centralDirectorates = [
  {
    id: 'technical-direction',
    code: 'DT',
    titleKey: 'organizationPage.central.technical.title',
    descriptionKey: 'organizationPage.central.technical.description',
  },
  {
    id: 'nurseries-direction',
    code: 'DP',
    titleKey: 'organizationPage.central.nurseries.title',
    descriptionKey: 'organizationPage.central.nurseries.description',
  },
  {
    id: 'finance-accounting-direction',
    code: 'DFC',
    titleKey: 'organizationPage.central.finance.title',
    descriptionKey: 'organizationPage.central.finance.description',
  },
  {
    id: 'administration-resources-direction',
    code: 'DARH',
    titleKey: 'organizationPage.central.administration.title',
    descriptionKey: 'organizationPage.central.administration.description',
  },
  {
    id: 'qhse',
    code: 'QHSE',
    titleKey: 'organizationPage.central.qhse.title',
    descriptionKey: 'organizationPage.central.qhse.description',
  },
  {
    id: 'audit-control',
    code: 'AC',
    titleKey: 'organizationPage.central.audit.title',
    descriptionKey: 'organizationPage.central.audit.description',
  },
  {
    id: 'it-security',
    code: 'DSI',
    titleKey: 'organizationPage.central.it.title',
    descriptionKey: 'organizationPage.central.it.description',
  },
  {
    id: 'marketing-communication',
    code: 'MC',
    titleKey: 'organizationPage.central.marketing.title',
    descriptionKey: 'organizationPage.central.marketing.description',
  },
] as const

export type RegionalDirectionTabId = 'all' | 'dg' | 'bouira' | 'chlef' | 'medea'
