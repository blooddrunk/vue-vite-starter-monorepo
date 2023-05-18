import { defineStore, acceptHMRUpdate } from 'pinia';

import type { MenuItem } from './menu';

export const useNavTabStore = defineStore('navTab', () => {
  const maxNavTabCount = ref(10);
  const experimentalNavTab = ref(false);
  const currentNavTabList = ref<MenuItem[]>([]);
  const currentActiveTab = ref('');

  const canRemoveNavTab = computed(() => currentNavTabList.value.length > 1);
  const isNavTabEnabled = computed(
    () => experimentalNavTab.value && currentNavTabList.value.length > 0
  );
  const currentNavTabNameList = computed(() =>
    currentNavTabList.value.map((item) => item.route!)
  );

  const setActiveTab = (name?: string) => {
    if (name) {
      currentActiveTab.value = name;
    } else {
      currentActiveTab.value = currentNavTabList.value.length
        ? currentNavTabList.value[currentNavTabList.value.length - 1].route!
        : '';
    }
  };

  const addTab = (menu: MenuItem) => {
    if (currentNavTabList.value.length >= maxNavTabCount.value) {
      currentNavTabList.value.shift();
    }

    if (!currentNavTabList.value.some((item) => item.route === menu.route)) {
      currentNavTabList.value = [...currentNavTabList.value, menu];
    }

    setActiveTab(menu.route!);
  };

  const removeTab = (name: string) => {
    if (!canRemoveNavTab.value) {
      console.warn(`Can not remove ${name}, as it's the last tab remains`);
      return;
    }

    currentNavTabList.value = currentNavTabList.value.filter(
      (item) => item.route !== name
    );

    if (currentActiveTab.value === name) {
      setActiveTab();
    }
  };

  const clearNavTab = () => {
    currentNavTabList.value = [];
    currentActiveTab.value = '';
  };

  return {
    maxNavTabCount,
    experimentalNavTab,
    currentNavTabList,
    currentActiveTab,

    canRemoveNavTab,
    isNavTabEnabled,
    currentNavTabNameList,

    addTab,
    removeTab,
    setActiveTab,
    clearNavTab,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavTabStore, import.meta.hot));
}
