import type { RouterTyped } from 'vue-router/auto';

import { BreadcrumbItem } from '@/stores/ui';

export default (router: RouterTyped) => {
  router.beforeEach((to) => {
    const uiStore = useUIStore();
    const menuStore = useMenuStore();

    const { matched } = to;
    let breadcrumbList: BreadcrumbItem[] = [];

    const { meta } = matched[matched.length - 1];

    if (Array.isArray(meta.breadcrumb)) {
      breadcrumbList = meta.breadcrumb;
    } else if (meta.breadcrumb) {
      breadcrumbList = matched.reduce<BreadcrumbItem[]>((acc, record) => {
        if (record.meta?.breadcrumb === true) {
          const matchedMenu =
            menuStore.menuLookupByRoute[record.name as string];
          if (matchedMenu) {
            acc.push({
              route: matchedMenu.route,
              title: matchedMenu.title ?? '未命名',
            });
          } else {
            console.warn(
              `failed to find a matched menu item for route '${
                record.name as string
              }'`
            );
          }
        } else if (record.meta?.breadcrumb) {
          acc = acc.concat(record.meta?.breadcrumb);
        }

        return acc;
      }, []);
    }

    uiStore.breadcrumbList = breadcrumbList;
  });
};
