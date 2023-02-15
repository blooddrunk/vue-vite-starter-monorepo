import { defineStore, acceptHMRUpdate } from 'pinia';
import type { RouteNamedMap } from 'vue-router/auto/routes';
import type { RouteLocationNamedRaw } from 'vue-router/auto';

import {
  getFirstNavigableMenu as _getFirstNavigableMenu,
  menuLookup as rawMenuLookup,
  menuPerSystem as rawMenuPerSystem,
  allMenuList,
} from '@/utils/biz/menu';
import { flattenTree } from '@/utils/misc';

const availableSystemList = [
  { label: '默认系统', value: 'main' },
  { label: '系统二', value: 'secondary' },
] as const;
export type SystemList = typeof availableSystemList;
export type SystemValue = (typeof availableSystemList)[number]['value'];
export type MenuItem = {
  id: string;
  title?: string;
  icon?: string;
  route?: keyof RouteNamedMap;
  routeProps?: Omit<RouteLocationNamedRaw, 'name'>;
  children?: MenuItem[];
  system: SystemValue;
  isVisible?: boolean;
};

export const useMenuStore = defineStore('menu', () => {
  const currentMenuList = shallowRef<MenuItem[]>([]);
  const menuLookup = shallowRef(rawMenuLookup);
  const menuPerSystem = shallowRef(rawMenuPerSystem);
  const menuList = shallowRef(flattenTree(allMenuList));

  const currentFlattenedMenuList = computed(() =>
    flattenTree(currentMenuList.value)
  );
  const menuLookupById = computed(() => menuLookup.value.byId);
  const menuLookupByRoute = computed(() => menuLookup.value.byRoute);
  const menuIdList = computed(() => menuList.value.map((item) => item.id));
  const whitelistedMenuList = computed(() =>
    menuList.value.filter((item) => item.id.startsWith('__whitelisted_'))
  );
  const whitelistedMenuIdList = computed(() =>
    whitelistedMenuList.value.map((item) => item.id)
  );
  const getFirstNavigableMenu = ({
    excludeRoutes,
  }: { excludeRoutes?: string[] } = {}) => {
    const target = _getFirstNavigableMenu(currentMenuList.value, {
      excludeRoutes,
    });
    if (target) {
      return menuLookupByRoute.value[target.route!];
    }
    return null;
  };
  const firstNavigableMenu = computed(() => {
    return getFirstNavigableMenu();
  });

  const systemList = ref<SystemList>(availableSystemList);
  const currentSystem = ref('');
  const systemValueList = computed(() =>
    systemList.value.map((item) => item.value)
  );
  const isSystemSole = computed(() => systemValueList.value.length <= 1);
  const firstAvailableSystem = computed(() => systemList.value[0]);

  const switchSystem = (system: SystemValue) => {
    currentSystem.value = system;
    currentMenuList.value = menuPerSystem.value[system];
  };

  const clearSystem = () => {
    currentSystem.value = '';
    currentMenuList.value = [];
  };

  return {
    currentMenuList,
    menuLookup,
    menuList,
    currentFlattenedMenuList,
    menuLookupById,
    menuLookupByRoute,
    menuIdList,
    whitelistedMenuList,
    whitelistedMenuIdList,
    firstNavigableMenu,
    getFirstNavigableMenu,

    systemList,
    currentSystem,
    isSystemSole,
    firstAvailableSystem,
    switchSystem,
    clearSystem,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot));
}
