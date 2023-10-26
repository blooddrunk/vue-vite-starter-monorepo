import type { BreadcrumbItem } from '@/typings';

import { useStorage } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
  const breadcrumbList = ref<BreadcrumbItem[]>([]);

  const isSidebarCollapsed = useStorage('is_sidebar_collapsed', false);
  const toggleIsSidebarCollapsed = useToggle(isSidebarCollapsed);

  return {
    breadcrumbList,

    isSidebarCollapsed,
    toggleIsSidebarCollapsed,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
