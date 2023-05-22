import type { BreadcrumbItem } from '@/typings';
import type { RouteRecordRaw, RouterTyped } from 'vue-router/auto';

import { createNamedEntryForGlobImport } from '@jn/shared';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto/routes';

export const routerHistory = createWebHashHistory(import.meta.env.BASE_URL);

declare module 'vue-router' {
  interface RouteMeta {
    layout?:
      | 'default'
      | 'error'
      | 'empty'
      | 'sidebar'
      | 'navbar'
      | 'tabbar'
      | 'tabbar-navbar';
    requiresAuth?: boolean;
    breadcrumb?: BreadcrumbItem | BreadcrumbItem[] | true;
    title?: string;
    canNavBack?: boolean;
    keepAlive?: boolean;
    openInTab?: boolean;
  }
}

/**
 * ! see https://github.com/posva/unplugin-vue-router/issues/121
 * &
 * https://github.com/zynth17/unplugin-vue-router-bug-dynamic-path/blob/main/src/modules/router.ts?rgh-link-date=2023-01-16T14%3A55%3A24Z
 */
function patchLayouts(route: RouteRecordRaw) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++) {
      route.children[i] = patchLayouts(route.children[i]);
    }

    return route;
  }

  return setupLayouts([route])[0];
}

const router = createRouter({
  history: routerHistory,
  routes: routes.map((route) => patchLayouts(route)),
});

const middlewareModules = import.meta.glob<(router: RouterTyped) => void>(
  ['./middleware/*.ts', '!./middleware/_*.ts'],
  {
    import: 'default',
    eager: true,
  }
);
createNamedEntryForGlobImport(
  middlewareModules
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
).forEach(([_, m]) => {
  m(router as RouterTyped);
});

export { router };
