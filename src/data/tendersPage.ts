export const tendersHeroProofKeys = [
  'tendersPage.hero.proof.decree',
  'tendersPage.hero.proof.office',
  'tendersPage.hero.proof.publication',
  'tendersPage.hero.proof.opening',
] as const

export type TenderStatus = 'all' | 'open' | 'evaluating' | 'awarded' | 'cancelled'
export type TenderDomain =
  | 'all'
  | 'civil-engineering'
  | 'gabions'
  | 'machinery'
  | 'nurseries'
  | 'studies'

export type TenderItem = {
  id: string
  reference: string
  type: 'aon' | 'consultation' | 'award' | 'cancelled'
  status: 'open' | 'evaluating' | 'awarded' | 'cancelled'
  domain: 'civil-engineering' | 'gabions' | 'machinery' | 'nurseries' | 'studies'
  titleKey: string
  summaryKey: string
  publishDate: string
  deadlineDate: string
  openingTime: string
  cdcFee: string
  bankGuarantee: string
  qualificationKey: string
  location: string
  wilayas: string[]
  awardedTo?: string
  awardedAmount?: string
  cancellationReasonKey?: string
}

export const tendersData: TenderItem[] = [
  {
    id: 'aon-gabions-2026',
    reference: 'AON n° 04/ERGR-Z/2026',
    type: 'aon',
    status: 'open',
    domain: 'gabions',
    titleKey: 'tendersPage.items.aonGabions.title',
    summaryKey: 'tendersPage.items.aonGabions.summary',
    publishDate: '28/02/2026',
    deadlineDate: '25/03/2026',
    openingTime: '13:30',
    cdcFee: '5 000 DA',
    bankGuarantee: '1% du montant de l’offre',
    qualificationKey: 'tendersPage.items.aonGabions.qualification',
    location: 'Oued Chélif (Chlef / Aïn Defla)',
    wilayas: ['Chlef', 'Aïn Defla'],
  },
  {
    id: 'aon-machinery-parts-2026',
    reference: 'AON n° 03/ERGR-Z/2026',
    type: 'aon',
    status: 'open',
    domain: 'machinery',
    titleKey: 'tendersPage.items.aonMachinery.title',
    summaryKey: 'tendersPage.items.aonMachinery.summary',
    publishDate: '20/02/2026',
    deadlineDate: '18/03/2026',
    openingTime: '14:00',
    cdcFee: '6 000 DA',
    bankGuarantee: '1% du montant de l’offre',
    qualificationKey: 'tendersPage.items.aonMachinery.qualification',
    location: 'Parcs centraux (Bouira, Sidi Lakhdar)',
    wilayas: ['Bouira', 'Chlef'],
  },
  {
    id: 'consultation-nurseries-uv-2026',
    reference: 'Consultation n° 08/DP/2026',
    type: 'consultation',
    status: 'open',
    domain: 'nurseries',
    titleKey: 'tendersPage.items.consultationNurseries.title',
    summaryKey: 'tendersPage.items.consultationNurseries.summary',
    publishDate: '25/02/2026',
    deadlineDate: '12/03/2026',
    openingTime: '11:00',
    cdcFee: 'Gratuit sur demande officielle',
    bankGuarantee: 'Non exigée',
    qualificationKey: 'tendersPage.items.consultationNurseries.qualification',
    location: '9 Pépinières régionales',
    wilayas: ['Alger', 'Blida', 'Médéa', 'Bouira', 'Chlef'],
  },
  {
    id: 'aon-tracks-forest-2026',
    reference: 'AON n° 02/ERGR-Z/2026',
    type: 'aon',
    status: 'evaluating',
    domain: 'civil-engineering',
    titleKey: 'tendersPage.items.aonTracks.title',
    summaryKey: 'tendersPage.items.aonTracks.summary',
    publishDate: '15/01/2026',
    deadlineDate: '15/02/2026',
    openingTime: '10:00',
    cdcFee: '8 000 DA',
    bankGuarantee: '1% du montant de l’offre',
    qualificationKey: 'tendersPage.items.aonTracks.qualification',
    location: 'Massifs de Médéa & Bouira',
    wilayas: ['Médéa', 'Bouira'],
  },
  {
    id: 'award-irrigation-2026',
    reference: 'Attribution n° 01/ERGR-Z/2026',
    type: 'award',
    status: 'awarded',
    domain: 'nurseries',
    titleKey: 'tendersPage.items.awardIrrigation.title',
    summaryKey: 'tendersPage.items.awardIrrigation.summary',
    publishDate: '10/01/2026',
    deadlineDate: '05/02/2026',
    openingTime: '10:30',
    cdcFee: '5 000 DA',
    bankGuarantee: 'Garantie de bonne exécution (5%)',
    qualificationKey: 'tendersPage.items.awardIrrigation.qualification',
    location: 'Pépinière Sidi Lakhdar',
    wilayas: ['Aïn Defla'],
    awardedTo: 'SARL Hydraulique & Arrosage Moderne',
    awardedAmount: '24 850 000 DA TTC',
  },
  {
    id: 'infructueux-drones-2025',
    reference: 'Infructuosité n° 09/ERGR-Z/2025',
    type: 'cancelled',
    status: 'cancelled',
    domain: 'studies',
    titleKey: 'tendersPage.items.cancelledDrones.title',
    summaryKey: 'tendersPage.items.cancelledDrones.summary',
    publishDate: '20/11/2025',
    deadlineDate: '22/12/2025',
    openingTime: '14:00',
    cdcFee: '4 000 DA',
    bankGuarantee: '1% du montant',
    qualificationKey: 'tendersPage.items.cancelledDrones.qualification',
    location: 'Direction Générale (Rouiba)',
    wilayas: ['Alger'],
    cancellationReasonKey: 'tendersPage.items.cancelledDrones.reason',
  },
]

export const tenderStatusOptions: { id: TenderStatus; labelKey: string }[] = [
  { id: 'all', labelKey: 'tendersPage.filters.statusAll' },
  { id: 'open', labelKey: 'tendersPage.filters.statusOpen' },
  { id: 'evaluating', labelKey: 'tendersPage.filters.statusEvaluating' },
  { id: 'awarded', labelKey: 'tendersPage.filters.statusAwarded' },
  { id: 'cancelled', labelKey: 'tendersPage.filters.statusCancelled' },
]

export const tenderDomainOptions: { id: TenderDomain; labelKey: string }[] = [
  { id: 'all', labelKey: 'tendersPage.filters.domainAll' },
  { id: 'civil-engineering', labelKey: 'tendersPage.filters.domainCivil' },
  { id: 'gabions', labelKey: 'tendersPage.filters.domainGabions' },
  { id: 'machinery', labelKey: 'tendersPage.filters.domainMachinery' },
  { id: 'nurseries', labelKey: 'tendersPage.filters.domainNurseries' },
  { id: 'studies', labelKey: 'tendersPage.filters.domainStudies' },
]

export const procurementGuideSteps = [
  {
    number: '01',
    titleKey: 'tendersPage.guide.step1.title',
    descKey: 'tendersPage.guide.step1.desc',
  },
  {
    number: '02',
    titleKey: 'tendersPage.guide.step2.title',
    descKey: 'tendersPage.guide.step2.desc',
  },
  {
    number: '03',
    titleKey: 'tendersPage.guide.step3.title',
    descKey: 'tendersPage.guide.step3.desc',
  },
  {
    number: '04',
    titleKey: 'tendersPage.guide.step4.title',
    descKey: 'tendersPage.guide.step4.desc',
  },
] as const

export const procurementOfficeInfo = {
  phone: '+213 (0) 23 85 41 20 (Poste 412)',
  fax: '+213 (0) 23 85 41 21',
  email: 'marches@ergr-zaccar.dz',
  address: 'Bureau des Marchés Publics - Haouch Rouiba, BP 34, Rouiba 16012, Alger',
  hours: 'Dimanche au Jeudi : 08h30 - 15h30',
} as const
