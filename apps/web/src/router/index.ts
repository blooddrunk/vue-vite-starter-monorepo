import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouterTyped } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto/routes';

import type { BreadcrumbItem } from '@/stores/ui';
import { createNamedEntryForGlobImport } from '@/utils/misc';

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

const router = createRouter({
  history: routerHistory,
  routes: setupLayouts(routes),
});

const middlewareModules = import.meta.glob<(router: RouterTyped) => void>(
  './middleware/*.ts',
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
