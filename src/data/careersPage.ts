export const careersHeroProofKeys = [
  'careersPage.hero.proof.headcount',
  'careersPage.hero.proof.coverage',
  'careersPage.hero.proof.training',
  'careersPage.hero.proof.safety',
] as const

export interface CareersHeroStat {
  value: string
  labelKey: string
  helperKey: string
}

export const careersHeroStats: CareersHeroStat[] = [
  {
    value: '1 200+',
    labelKey: 'careersPage.hero.stats.headcount.label',
    helperKey: 'careersPage.hero.stats.headcount.helper',
  },
  {
    value: '8',
    labelKey: 'careersPage.hero.stats.wilayas.label',
    helperKey: 'careersPage.hero.stats.wilayas.helper',
  },
  {
    value: '45+',
    labelKey: 'careersPage.hero.stats.engineers.label',
    helperKey: 'careersPage.hero.stats.engineers.helper',
  },
  {
    value: '100%',
    labelKey: 'careersPage.hero.stats.coverage.label',
    helperKey: 'careersPage.hero.stats.coverage.helper',
  },
]

export type CareerDomain =
  | 'all'
  | 'forestry-agronomy'
  | 'heavy-equipment'
  | 'nurseries'
  | 'engineering-sig'
  | 'administration'

export type ContractType = 'all' | 'cdi' | 'cdd-project' | 'internship-pfe'

export type CareerWilaya =
  | 'all'
  | 'ain-defla'
  | 'medea'
  | 'bouira'
  | 'alger'
  | 'blida'
  | 'chlef'
  | 'djelfa'
  | 'tipaza'

export interface HRValue {
  id: string
  titleKey: string
  descKey: string
  iconName: 'ShieldAlert' | 'Award' | 'GraduationCap' | 'MapPin'
}

export const hrValuesData: HRValue[] = [
  {
    id: 'hse-safety',
    titleKey: 'careersPage.values.items.hse.title',
    descKey: 'careersPage.values.items.hse.desc',
    iconName: 'ShieldAlert',
  },
  {
    id: 'internal-promotion',
    titleKey: 'careersPage.values.items.merit.title',
    descKey: 'careersPage.values.items.merit.desc',
    iconName: 'Award',
  },
  {
    id: 'knowledge-transfer',
    titleKey: 'careersPage.values.items.transfer.title',
    descKey: 'careersPage.values.items.transfer.desc',
    iconName: 'GraduationCap',
  },
  {
    id: 'local-roots',
    titleKey: 'careersPage.values.items.territory.title',
    descKey: 'careersPage.values.items.territory.desc',
    iconName: 'MapPin',
  },
]

export interface CareerJobOffer {
  id: string
  ref: string
  titleKey: string
  summaryKey: string
  domain: Exclude<CareerDomain, 'all'>
  contractType: Exclude<ContractType, 'all'>
  wilaya: Exclude<CareerWilaya, 'all'>
  locationKey: string
  experienceKey: string
  educationKey: string
  deadline: string
  isFeatured?: boolean
  missionsKeys: string[]
  requirementsKeys: string[]
  benefitsKeys: string[]
}

export const careerDomainOptions: { id: CareerDomain; labelKey: string }[] = [
  { id: 'all', labelKey: 'careersPage.filters.domains.all' },
  { id: 'forestry-agronomy', labelKey: 'careersPage.filters.domains.forestryAgronomy' },
  { id: 'heavy-equipment', labelKey: 'careersPage.filters.domains.heavyEquipment' },
  { id: 'nurseries', labelKey: 'careersPage.filters.domains.nurseries' },
  { id: 'engineering-sig', labelKey: 'careersPage.filters.domains.engineeringSig' },
  { id: 'administration', labelKey: 'careersPage.filters.domains.administration' },
]

export const contractTypeOptions: { id: ContractType; labelKey: string }[] = [
  { id: 'all', labelKey: 'careersPage.filters.contracts.all' },
  { id: 'cdi', labelKey: 'careersPage.filters.contracts.cdi' },
  { id: 'cdd-project', labelKey: 'careersPage.filters.contracts.cddProject' },
  { id: 'internship-pfe', labelKey: 'careersPage.filters.contracts.internshipPfe' },
]

export const careerWilayaOptions: { id: CareerWilaya; labelKey: string }[] = [
  { id: 'all', labelKey: 'careersPage.filters.wilayas.all' },
  { id: 'ain-defla', labelKey: 'careersPage.filters.wilayas.ainDefla' },
  { id: 'medea', labelKey: 'careersPage.filters.wilayas.medea' },
  { id: 'bouira', labelKey: 'careersPage.filters.wilayas.bouira' },
  { id: 'alger', labelKey: 'careersPage.filters.wilayas.alger' },
  { id: 'blida', labelKey: 'careersPage.filters.wilayas.blida' },
  { id: 'chlef', labelKey: 'careersPage.filters.wilayas.chlef' },
  { id: 'djelfa', labelKey: 'careersPage.filters.wilayas.djelfa' },
  { id: 'tipaza', labelKey: 'careersPage.filters.wilayas.tipaza' },
]

export const careerJobOffersData: CareerJobOffer[] = [
  {
    id: 'ing-agronome-barrage-vert-2026',
    ref: 'REC-2026-01',
    titleKey: 'careersPage.jobs.offers.agronomeBarrageVert.title',
    summaryKey: 'careersPage.jobs.offers.agronomeBarrageVert.summary',
    domain: 'forestry-agronomy',
    contractType: 'cdi',
    wilaya: 'medea',
    locationKey: 'careersPage.jobs.locations.medeaDjelfa',
    experienceKey: 'careersPage.jobs.experience.min3Years',
    educationKey: 'careersPage.jobs.education.engineerState',
    deadline: '30/04/2026',
    isFeatured: true,
    missionsKeys: [
      'careersPage.jobs.offers.agronomeBarrageVert.missions.m1',
      'careersPage.jobs.offers.agronomeBarrageVert.missions.m2',
      'careersPage.jobs.offers.agronomeBarrageVert.missions.m3',
      'careersPage.jobs.offers.agronomeBarrageVert.missions.m4',
    ],
    requirementsKeys: [
      'careersPage.jobs.offers.agronomeBarrageVert.requirements.r1',
      'careersPage.jobs.offers.agronomeBarrageVert.requirements.r2',
      'careersPage.jobs.offers.agronomeBarrageVert.requirements.r3',
      'careersPage.jobs.offers.agronomeBarrageVert.requirements.r4',
    ],
    benefitsKeys: [
      'careersPage.jobs.offers.agronomeBarrageVert.benefits.b1',
      'careersPage.jobs.offers.agronomeBarrageVert.benefits.b2',
      'careersPage.jobs.offers.agronomeBarrageVert.benefits.b3',
    ],
  },
  {
    id: 'chef-atelier-parc-engins-2026',
    ref: 'REC-2026-02',
    titleKey: 'careersPage.jobs.offers.chefAtelierEngins.title',
    summaryKey: 'careersPage.jobs.offers.chefAtelierEngins.summary',
    domain: 'heavy-equipment',
    contractType: 'cdi',
    wilaya: 'ain-defla',
    locationKey: 'careersPage.jobs.locations.parcAinDefla',
    experienceKey: 'careersPage.jobs.experience.min5Years',
    educationKey: 'careersPage.jobs.education.tsMaintenance',
    deadline: '15/04/2026',
    isFeatured: true,
    missionsKeys: [
      'careersPage.jobs.offers.chefAtelierEngins.missions.m1',
      'careersPage.jobs.offers.chefAtelierEngins.missions.m2',
      'careersPage.jobs.offers.chefAtelierEngins.missions.m3',
      'careersPage.jobs.offers.chefAtelierEngins.missions.m4',
    ],
    requirementsKeys: [
      'careersPage.jobs.offers.chefAtelierEngins.requirements.r1',
      'careersPage.jobs.offers.chefAtelierEngins.requirements.r2',
      'careersPage.jobs.offers.chefAtelierEngins.requirements.r3',
    ],
    benefitsKeys: [
      'careersPage.jobs.offers.chefAtelierEngins.benefits.b1',
      'careersPage.jobs.offers.chefAtelierEngins.benefits.b2',
    ],
  },
  {
    id: 'conducteurs-bulldozers-pistes-2026',
    ref: 'REC-2026-03',
    titleKey: 'careersPage.jobs.offers.conducteurBulls.title',
    summaryKey: 'careersPage.jobs.offers.conducteurBulls.summary',
    domain: 'heavy-equipment',
    contractType: 'cdd-project',
    wilaya: 'ain-defla',
    locationKey: 'careersPage.jobs.locations.chantiersMiliana',
    experienceKey: 'careersPage.jobs.experience.min3Years',
    educationKey: 'careersPage.jobs.education.permisCACES',
    deadline: '20/04/2026',
    missionsKeys: [
      'careersPage.jobs.offers.conducteurBulls.missions.m1',
      'careersPage.jobs.offers.conducteurBulls.missions.m2',
      'careersPage.jobs.offers.conducteurBulls.missions.m3',
    ],
    requirementsKeys: [
      'careersPage.jobs.offers.conducteurBulls.requirements.r1',
      'careersPage.jobs.offers.conducteurBulls.requirements.r2',
      'careersPage.jobs.offers.conducteurBulls.requirements.r3',
    ],
    benefitsKeys: [
      'careersPage.jobs.offers.conducteurBulls.benefits.b1',
      'careersPage.jobs.offers.conducteurBulls.benefits.b2',
    ],
  },
  {
    id: 'responsable-pepiniere-micro-irrigation-2026',
    ref: 'REC-2026-04',
    titleKey: 'careersPage.jobs.offers.responsablePepiniere.title',
    summaryKey: 'careersPage.jobs.offers.responsablePepiniere.summary',
    domain: 'nurseries',
    contractType: 'cdi',
    wilaya: 'tipaza',
    locationKey: 'careersPage.jobs.locations.pepiniereHadjout',
    experienceKey: 'careersPage.jobs.experience.min2Years',
    educationKey: 'careersPage.jobs.education.ingHorticulture',
    deadline: '25/04/2026',
    missionsKeys: [
      'careersPage.jobs.offers.responsablePepiniere.missions.m1',
      'careersPage.jobs.offers.responsablePepiniere.missions.m2',
      'careersPage.jobs.offers.responsablePepiniere.missions.m3',
    ],
    requirementsKeys: [
      'careersPage.jobs.offers.responsablePepiniere.requirements.r1',
      'careersPage.jobs.offers.responsablePepiniere.requirements.r2',
      'careersPage.jobs.offers.responsablePepiniere.requirements.r3',
    ],
    benefitsKeys: [
      'careersPage.jobs.offers.responsablePepiniere.benefits.b1',
      'careersPage.jobs.offers.responsablePepiniere.benefits.b2',
    ],
  },
  {
    id: 'expert-sig-topographie-drones-2026',
    ref: 'REC-2026-05',
    titleKey: 'careersPage.jobs.offers.expertSigDrones.title',
    summaryKey: 'careersPage.jobs.offers.expertSigDrones.summary',
    domain: 'engineering-sig',
    contractType: 'cdi',
    wilaya: 'alger',
    locationKey: 'careersPage.jobs.locations.dgRouiba',
    experienceKey: 'careersPage.jobs.experience.min2Years',
    educationKey: 'careersPage.jobs.education.masterGeomatique',
    deadline: '10/05/2026',
    missionsKeys: [
      'careersPage.jobs.offers.expertSigDrones.missions.m1',
      'careersPage.jobs.offers.expertSigDrones.missions.m2',
      'careersPage.jobs.offers.expertSigDrones.missions.m3',
    ],
    requirementsKeys: [
      'careersPage.jobs.offers.expertSigDrones.requirements.r1',
      'careersPage.jobs.offers.expertSigDrones.requirements.r2',
      'careersPage.jobs.offers.expertSigDrones.requirements.r3',
    ],
    benefitsKeys: [
      'careersPage.jobs.offers.expertSigDrones.benefits.b1',
      'careersPage.jobs.offers.expertSigDrones.benefits.b2',
    ],
  },
  {
    id: 'cadre-marches-publics-2026',
    ref: 'REC-2026-06',
    titleKey: 'careersPage.jobs.offers.cadreMarchesPublics.title',
    summaryKey: 'careersPage.jobs.offers.cadreMarchesPublics.summary',
    domain: 'administration',
    contractType: 'cdi',
    wilaya: 'alger',
    locationKey: 'careersPage.jobs.locations.siegeRouiba',
    experienceKey: 'careersPage.jobs.experience.min4Years',
    educationKey: 'careersPage.jobs.education.licenceDroitGestion',
    deadline: '05/05/2026',
    missionsKeys: [
      'careersPage.jobs.offers.cadreMarchesPublics.missions.m1',
      'careersPage.jobs.offers.cadreMarchesPublics.missions.m2',
      'careersPage.jobs.offers.cadreMarchesPublics.missions.m3',
    ],
    requirementsKeys: [
      'careersPage.jobs.offers.cadreMarchesPublics.requirements.r1',
      'careersPage.jobs.offers.cadreMarchesPublics.requirements.r2',
      'careersPage.jobs.offers.cadreMarchesPublics.requirements.r3',
    ],
    benefitsKeys: [
      'careersPage.jobs.offers.cadreMarchesPublics.benefits.b1',
      'careersPage.jobs.offers.cadreMarchesPublics.benefits.b2',
    ],
  },
]

export interface InternshipTrack {
  id: string
  titleKey: string
  descKey: string
  durationKey: string
  targetKey: string
  partnerKey: string
}

export const internshipTracksData: InternshipTrack[] = [
  {
    id: 'pfe-ingenieur-agronomie',
    titleKey: 'careersPage.internships.tracks.agronomy.title',
    descKey: 'careersPage.internships.tracks.agronomy.desc',
    durationKey: 'careersPage.internships.tracks.agronomy.duration',
    targetKey: 'careersPage.internships.tracks.agronomy.target',
    partnerKey: 'careersPage.internships.tracks.agronomy.partner',
  },
  {
    id: 'pfe-master-sig-foret',
    titleKey: 'careersPage.internships.tracks.sigForest.title',
    descKey: 'careersPage.internships.tracks.sigForest.desc',
    durationKey: 'careersPage.internships.tracks.sigForest.duration',
    targetKey: 'careersPage.internships.tracks.sigForest.target',
    partnerKey: 'careersPage.internships.tracks.sigForest.partner',
  },
  {
    id: 'stage-technicien-pepiniere',
    titleKey: 'careersPage.internships.tracks.nurseryTechnician.title',
    descKey: 'careersPage.internships.tracks.nurseryTechnician.desc',
    durationKey: 'careersPage.internships.tracks.nurseryTechnician.duration',
    targetKey: 'careersPage.internships.tracks.nurseryTechnician.target',
    partnerKey: 'careersPage.internships.tracks.nurseryTechnician.partner',
  },
]

export const hrContactInfo = {
  departmentName: 'Direction des Ressources Humaines & Formation',
  headquarters: 'Haouch Rouiba, BP 34, Rouiba 16012, Alger',
  phone: '+213 (0) 23 85 41 20 (Poste RH 118)',
  fax: '+213 (0) 23 85 41 21',
  email: 'recrutement@ergr-zaccar.dz',
  hours: 'Dimanche au Jeudi : 08h30 - 16h00',
  charterNoteKey: 'careersPage.cta.charterNote',
} as const
