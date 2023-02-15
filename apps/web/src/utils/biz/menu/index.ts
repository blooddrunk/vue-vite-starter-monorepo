import { mergeWith } from 'lodash-es';

import type { SystemValue, MenuItem } from '@/stores/menu';
import { createNamedMapForGlobImport } from '@/utils/misc';

export const createMenuLookup = (menuList: MenuItem[], system: SystemValue) => {
  const byId = {} as Record<string, MenuItem>;
  const byRoute = {} as Record<string, MenuItem>;

  const traverse = (tree: MenuItem[]) =>
    tree.forEach((item) => {
      if (!item.id) {
        throw new Error(`Menu item must have a 'id' field: ${item}`);
      }

      const newItem = {
        ...item,
        system,
      };

      byId[item.id] = { ...newItem };
      if (item.route) {
        byRoute[item.route] = { ...newItem };
      }

      if (item.children && item.children.length) {
        traverse(item.children);
      }
    }, {});

  traverse(menuList);

  return {
    byId,
    byRoute,
  };
};

export const getFirstNavigableMenu = (
  menuList: MenuItem[],
  { excludeRoutes }: { excludeRoutes?: string[] } = {}
): MenuItem | null | undefined => {
  for (const item of menuList) {
    if (item.route) {
      if (excludeRoutes) {
        if (!excludeRoutes.includes(item.route)) {
          return item;
        }
      } else {
        return item;
      }
    } else if (item.children) {
      return getFirstNavigableMenu(item.children);
    } else {
      return null;
    }
  }
};

export const getRouteOfMenuItem = (item?: MenuItem | null) => {
  if (item && item.route && item.id) {
    if (typeof item.route !== 'string') {
      throw new Error(`[route] property of menu item must be route name`);
    }
    return { name: item.route };
  }

  return undefined;
};

const menuModules = createNamedMapForGlobImport(
  import.meta.glob<MenuItem[]>(['./system/*.ts'], {
    import: 'default',
    eager: true,
  })
);

export const allMenuList = Object.values(menuModules).flat();

export const menuLookup = mergeWith(
  {},
  createMenuLookup(menuModules['main'], 'main'),
  createMenuLookup(menuModules['secondary'], 'secondary'),
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }
);

export const menuPerSystem: { [Key in SystemValue]: MenuItem[] } = {
  main: menuModules['main'],
  secondary: menuModules['secondary'],
};
