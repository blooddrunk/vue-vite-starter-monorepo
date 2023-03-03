import type { MenuItem } from '@/stores/menu';

export default [
  {
    id: '/secondary/about',
    title: '关于',
    route: '/secondary/about',
    icon: 'information',
  },
  {
    id: '/secondary/acknowledgements',
    title: '致谢',
    route: '/secondary/acknowledgements',
    icon: 'hand-heart',
  },
] as MenuItem[];
