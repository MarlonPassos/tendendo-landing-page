export interface Group {
  id: string;
  name: string;
  description: string;
  icon: 'flame' | 'laptop' | 'fitness' | 'book' | 'home';
  inviteUrl: `https://chat.whatsapp.com/${string}`;
  category: string;
  enabled: boolean;
  order: number;
}

export const groups: Group[] = [
  {
    id: 'radar-de-ofertas',
    name: 'Radar de Ofertas',
    description: 'Oportunidades de diferentes categorias: produtos populares, promoções, achados e novidades em um só lugar.',
    icon: 'flame',
    inviteUrl: 'https://chat.whatsapp.com/Hv6LSL0y0Z04ZODzvAlgPd',
    category: 'radar',
    enabled: true,
    order: 1,
  },
  {
    id: 'tecnologia',
    name: 'Ofertas de Tecnologia',
    description: 'Eletrônicos, acessórios, informática, gadgets e produtos inteligentes.',
    icon: 'laptop',
    inviteUrl: 'https://chat.whatsapp.com/CC4v27uoukuKeyEIAeOn57',
    category: 'tecnologia',
    enabled: true,
    order: 2,
  },
  {
    id: 'esportes-e-fitness',
    name: 'Esportes e Fitness',
    description: 'Esportes, exercícios, atividades físicas, acessórios esportivos e bem-estar.',
    icon: 'fitness',
    inviteUrl: 'https://chat.whatsapp.com/ECCm9RHJNF04smRSx66cC0',
    category: 'esportes',
    enabled: true,
    order: 3,
  },
  {
    id: 'escolar-e-pedagogico',
    name: 'Escolar e Pedagógico',
    description: 'Materiais escolares, papelaria, recursos pedagógicos e organização dos estudos.',
    icon: 'book',
    inviteUrl: 'https://chat.whatsapp.com/BQNHvawkTSFF9JZKnppy7u',
    category: 'escolar',
    enabled: true,
    order: 4,
  },
  {
    id: 'casa-e-estilo',
    name: 'Ofertas Casa e Estilo',
    description: 'Casa, decoração, cozinha, organização e utilidades domésticas.',
    icon: 'home',
    inviteUrl: 'https://chat.whatsapp.com/CygPqiCg21kFtgQZ7xB5LK',
    category: 'casa',
    enabled: true,
    order: 5,
  },
];
