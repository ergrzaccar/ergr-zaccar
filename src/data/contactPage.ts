export const contactHeroProofKeys = [
  'contactPage.hero.proof.headquarters',
  'contactPage.hero.proof.hours',
  'contactPage.hero.proof.regionalDirections',
  'contactPage.hero.proof.emergency',
] as const

export const hqContactInfo = {
  nameKey: 'contactPage.hq.name',
  address: 'Haouch Rouiba - BP 34, Rouiba 16012, Alger',
  phonePrimary: '+213 (0) 23 85 41 20',
  phoneSecondary: '+213 (0) 23 85 41 22',
  fax: '+213 (0) 23 85 41 21',
  email: 'contact@ergr-zaccar.dz',
  workingDaysKey: 'contactPage.hq.workingDays',
  workingHoursKey: 'contactPage.hq.workingHours',
  geoCoordinates: {
    lat: 36.7372,
    lng: 3.2845,
  },
  mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Rouiba+Alger',
} as const

export const centralDepartments = [
  {
    id: 'dg-secretariat',
    titleKey: 'contactPage.departments.dg.title',
    roleKey: 'contactPage.departments.dg.role',
    email: 'contact@ergr-zaccar.dz',
    phone: '+213 (0) 23 85 41 20 (Poste 101)',
  },
  {
    id: 'technical-direction',
    titleKey: 'contactPage.departments.technical.title',
    roleKey: 'contactPage.departments.technical.role',
    email: 'technique@ergr-zaccar.dz',
    phone: '+213 (0) 23 85 41 20 (Poste 204)',
  },
  {
    id: 'nurseries-direction',
    titleKey: 'contactPage.departments.nurseries.title',
    roleKey: 'contactPage.departments.nurseries.role',
    email: 'pepinieres@ergr-zaccar.dz',
    phone: '+213 (0) 23 85 41 20 (Poste 308)',
  },
  {
    id: 'tenders-direction',
    titleKey: 'contactPage.departments.tenders.title',
    roleKey: 'contactPage.departments.tenders.role',
    email: 'marches@ergr-zaccar.dz',
    phone: '+213 (0) 23 85 41 20 (Poste 412)',
  },
] as const

export const contactSubjectKeys = [
  { id: 'partnership', labelKey: 'contactPage.form.subjects.partnership' },
  { id: 'nurseries', labelKey: 'contactPage.form.subjects.nurseries' },
  { id: 'works', labelKey: 'contactPage.form.subjects.works' },
  { id: 'general', labelKey: 'contactPage.form.subjects.general' },
] as const

export const wilayaOptions = [
  'Aïn Defla',
  'Alger',
  'Blida',
  'Bouira',
  'Boumerdès',
  'Chlef',
  'Médéa',
  'Tipaza',
  'Tissemsilt',
  'Autre wilaya',
] as const

export const regionalContactCards = [
  {
    id: 'bouira',
    nameKey: 'contactPage.regional.bouira.name',
    city: 'Bouira',
    address: 'Zone des Parcs, Route de Constantine, Bouira',
    phone: '+213 (0) 26 93 18 40',
    fax: '+213 (0) 26 93 18 41',
    email: 'dr.bouira@ergr-zaccar.dz',
    wilayasKey: 'contactPage.regional.bouira.wilayas',
    unitsKey: 'contactPage.regional.bouira.units',
    parksKey: 'contactPage.regional.bouira.parks',
  },
  {
    id: 'chlef',
    nameKey: 'contactPage.regional.chlef.name',
    city: 'Oued Sly / Chlef',
    address: 'Zone Industrielle Oued Sly, BP 12, Chlef',
    phone: '+213 (0) 27 72 34 50',
    fax: '+213 (0) 27 72 34 51',
    email: 'dr.chlef@ergr-zaccar.dz',
    wilayasKey: 'contactPage.regional.chlef.wilayas',
    unitsKey: 'contactPage.regional.chlef.units',
    parksKey: 'contactPage.regional.chlef.parks',
  },
  {
    id: 'medea',
    nameKey: 'contactPage.regional.medea.name',
    city: 'Médéa',
    address: 'Pôle d’Activités Régional, RN 1, Médéa',
    phone: '+213 (0) 25 58 60 70',
    fax: '+213 (0) 25 58 60 71',
    email: 'dr.medea@ergr-zaccar.dz',
    wilayasKey: 'contactPage.regional.medea.wilayas',
    unitsKey: 'contactPage.regional.medea.units',
    parksKey: 'contactPage.regional.medea.parks',
  },
] as const

export const contactFaqItems = [
  {
    id: 'faq-plants',
    questionKey: 'contactPage.faq.plants.q',
    answerKey: 'contactPage.faq.plants.a',
  },
  {
    id: 'faq-machinery',
    questionKey: 'contactPage.faq.machinery.q',
    answerKey: 'contactPage.faq.machinery.a',
  },
  {
    id: 'faq-convention',
    questionKey: 'contactPage.faq.convention.q',
    answerKey: 'contactPage.faq.convention.a',
  },
  {
    id: 'faq-tenders',
    questionKey: 'contactPage.faq.tenders.q',
    answerKey: 'contactPage.faq.tenders.a',
  },
  {
    id: 'faq-retail',
    questionKey: 'contactPage.faq.retail.q',
    answerKey: 'contactPage.faq.retail.a',
  },
] as const

export const emergencyHotlines = [
  {
    id: 'dgf',
    labelKey: 'contactPage.emergency.dgfLabel',
    number: '1070',
    descKey: 'contactPage.emergency.dgfDesc',
  },
  {
    id: 'civil-defense',
    labelKey: 'contactPage.emergency.civilDefenseLabel',
    number: '14 / 1021',
    descKey: 'contactPage.emergency.civilDefenseDesc',
  },
  {
    id: 'ergr-duty',
    labelKey: 'contactPage.emergency.ergrDutyLabel',
    number: '+213 (0) 23 85 41 20',
    descKey: 'contactPage.emergency.ergrDutyDesc',
  },
] as const
