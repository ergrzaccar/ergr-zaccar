export const company = {
  id: 'ergr-zaccar',
  shortName: 'ERGR Zaccar',
  legalName: 'Entreprise Régionale de Génie Rural Zaccar',
  arabicName: 'المؤسسة الجهوية للهندسة الريفية زكار',
  groupName: 'Groupe Génie Rural - GGR',
  legalStatus: {
    fr: 'Entreprise publique économique par actions, soumise aux dispositions du code de commerce.',
    ar: 'مؤسسة عمومية اقتصادية ذات أسهم تخضع لأحكام القانون التجاري.',
  },
  ownership: {
    fr: 'Capital détenu entièrement par le Groupe Génie Rural.',
    ar: 'رأس مالها مملوك بالكامل لمجمع الهندسة الريفية.',
  },
  headquarters: {
    label: 'Haouch Rouiba / Rouiba, Alger',
    city: 'Rouiba',
    wilaya: 'Alger',
    country: 'Algérie',
  },
  shareCapital: {
    amount: 471_100_000,
    currency: 'DZD',
    display: '471 100 000 DA',
  },
  positioning: {
    fr: 'Entreprise publique spécialisée dans le génie rural, la foresterie et le développement rural.',
    ar: 'مؤسسة عمومية متخصصة في الهندسة الريفية والغابات والتنمية الريفية.',
  },
  history: [
    {
      period: '1971-1990',
      nameFr: 'Office National des Travaux Forestiers',
      nameAr: 'الديوان الوطني للأشغال الغابية',
    },
    {
      period: '1990-1998',
      nameFr: 'Office Régional de Développement Forestier',
      nameAr: 'الديوان الجهوي للتنمية الغابية',
    },
    {
      period: "1998-aujourd'hui",
      nameFr: 'Entreprise Régionale de Génie Rural Zaccar',
      nameAr: 'المؤسسة الجهوية للهندسة الريفية زكار',
    },
  ],
  missionFamilies: [
    'forest-heritage-restoration',
    'land-development-watersheds',
    'forest-maintenance',
    'forestry-engineering',
    'desertification-control',
    'wood-cork-secondary-products',
    'plant-production',
    'green-spaces',
  ],
  sourceDocuments: [
    'docs-source/presentations/fiche technique.ppt',
    'docs-source/organigrammes/Organigramme.pptx',
  ],
} as const

export const companyIdentity = {
  legalName: company.legalName,
  arabicName: company.arabicName,
  legalStatus: 'EPE / SPA (Entreprise Publique Économique par actions)',
  tutelle: "Ministère de l'Agriculture et du Développement Rural",
  ownership: '100% Groupe Génie Rural (GGR)',
  shareCapital: company.shareCapital.display,
  headquarters: {
    address: 'Haouch Rouiba - Rouiba, Alger',
    city: company.headquarters.city,
    wilaya: company.headquarters.wilaya,
  },
} as const
