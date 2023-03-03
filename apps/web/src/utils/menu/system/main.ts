import type { MenuItem } from '@/stores/menu';

export default [
  {
    id: '/main/home',
    title: '首页',
    route: '/main/home',
    icon: 'view-dashboard',
  },
  {
    id: '/main/admin',
    title: '系统管理',
    route: '/main/admin',
    icon: 'cogs',
    children: [
      {
        id: '/main/admin.account',
        title: '账号管理',
        route: '/main/admin.account',
      },
      {
        id: '/main/admin.role',
        title: '角色管理',
        route: '/main/admin.role',
      },
    ],
  },
] as MenuItem[];
