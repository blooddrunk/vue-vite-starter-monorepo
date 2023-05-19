<template>
  <nav
    v-if="shouldShowBreadcrumb"
    class="rounded-sm bg-white px-3 py-4 shadow-md"
  >
    <el-breadcrumb class="flex items-center">
      <el-breadcrumb-item
        v-for="(breadcrumb, index) in visibleBreadcrumbs"
        :key="breadcrumb.title"
      >
        <div
          class="flex items-center"
          :class="{ 'text-primary': isLast(index) }"
        >
          <Icon
            v-if="breadcrumb.icon"
            class="mr-1"
            :icon="getIcon(breadcrumb.icon)"
            width="18px"
            height="18px"
          ></Icon>

          <span :class="{ 'font-semibold': isLast(index) }">
            {{ breadcrumb.title }}
          </span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </nav>
</template>

<script lang="ts" setup>
import type { IconifyJSON } from '@iconify/types';

import { icons } from '@iconify-json/mdi';
import { getIconData } from '@iconify/utils';
import { Icon } from '@iconify/vue';

const uiStore = useUIStore();
// const authStore = useAuthStore();

const visibleBreadcrumbs = computed(() =>
  uiStore.breadcrumbList.filter((breadcrumb) => breadcrumb.isVisible !== false)
);
const shouldShowBreadcrumb = computed(
  () => visibleBreadcrumbs.value.length > 0
);
// const getRoute = (name?: string) =>
//   name
//     ? authStore.permittedMenuLookupByRoute[name]
//       ? { name }
//       : undefined
//     : undefined;

const isLast = (index: number) => index === visibleBreadcrumbs.value.length - 1;

const getIcon = (shortname: string) =>
  getIconData(icons as IconifyJSON, shortname) || '';
</script>
