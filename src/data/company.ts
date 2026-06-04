export const company = {
  id: 'ergr-zaccar',
  shortName: 'ERGR Zaccar',
  legalName: 'Entreprise Regionale de Genie Rural Zaccar',
  arabicName: 'المؤسسة الجهوية للهندسة الريفية زكار',
  groupName: 'Groupe Genie Rural - GGR',
  legalStatus: {
    fr: 'Entreprise publique economique par actions, soumise aux dispositions du code de commerce.',
    ar: 'مؤسسة عمومية اقتصادية ذات أسهم تخضع لأحكام القانون التجاري.',
  },
  ownership: {
    fr: 'Capital detenu entierement par le Groupe Genie Rural.',
    ar: 'رأس مالها مملوك بالكامل لمجمع الهندسة الريفية.',
  },
  headquarters: {
    label: 'Haouch Rouiba / Rouiba, Alger',
    city: 'Rouiba',
    wilaya: 'Alger',
    country: 'Algerie',
  },
  shareCapital: {
    amount: 471_100_000,
    currency: 'DZD',
    display: '471 100 000 DA',
  },
  positioning: {
    fr: 'Entreprise publique specialisee dans le genie rural, la foresterie et le developpement rural.',
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
      nameFr: 'Office Regional de Developpement Forestier',
      nameAr: 'الديوان الجهوي للتنمية الغابية',
    },
    {
      period: '1998-aujourd hui',
      nameFr: 'Entreprise Regionale de Genie Rural Zaccar',
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
