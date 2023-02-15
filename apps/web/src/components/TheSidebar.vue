<template>
  <aside :class="$style.sidebar">
    <div class="border-b border-gray-100">
      <el-button
        class="w-full !h-[var(--el-menu-item-height)]"
        link
        type="primary"
        @click="handleSidebarCollapse"
      >
        <IconMdiMenu v-if="uiStore.isSidebarCollapsed"></IconMdiMenu>
        <IconMdiMenuOpen v-else></IconMdiMenuOpen>
      </el-button>
    </div>

    <el-menu
      :default-active="defaultActiveName"
      :collapse="uiStore.isSidebarCollapsed"
    >
      <TheSidebarItem
        v-for="menu in filterPermittedMenu(menuStore.currentMenuList)"
        :key="menu.id"
        :item="menu"
        :filter="filterPermittedMenu"
      ></TheSidebarItem>
    </el-menu>
  </aside>
</template>

<script lang="ts" setup>
import type { MenuItem } from '@/stores/menu';

const uiStore = useUIStore();
const menuStore = useMenuStore();

const handleSidebarCollapse = () => uiStore.toggleIsSidebarCollapsed();

const route = useRoute();
const defaultActiveName = computed(() => {
  const matched = menuStore.menuLookupByRoute[route.name as string];
  return matched ? matched.id : '';
});

const authStore = useAuthStore();
const filterPermittedMenu = (items?: MenuItem[]) =>
  items
    ? items.filter(
        (item) =>
          !!authStore.permittedMenuLookupById[item.id] &&
          item.isVisible !== false
      )
    : [];
</script>

<style lang="postcss" module>
.sidebar {
  @apply flex-shrink-0 h-[var(--app-content-height)];
  @apply overflow-y-auto border-r border-gray-200;

  :global {
    .el-menu {
      @apply min-h-80;
      @apply border-none !important;

      &:not(.el-menu--collapse) {
        @apply w-56;
      }
    }
  }
}
</style>
