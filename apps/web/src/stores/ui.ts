import { defineStore, acceptHMRUpdate } from 'pinia';
import type { RouteNamedMap } from 'vue-router/auto/routes';

export type BreadcrumbItem = {
  title: string;
  route?: keyof RouteNamedMap;
  isVisible?: boolean;
};

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
