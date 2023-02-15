<template>
  <el-sub-menu v-if="hasChildren" :index="item.id">
    <template #title>
      <Icon
        v-if="item.icon"
        :icon="getIcon(item.icon)"
        width="1.2em"
        height="1.2em"
      ></Icon>
      <span class="ml-1.5">{{ item.title }}</span>
    </template>

    <TheSidebarItem
      v-for="child in filter(item.children)"
      :key="child.id"
      :item="child"
      :filter="filter"
    ></TheSidebarItem>
  </el-sub-menu>

  <el-menu-item v-else :index="item.id" @click="handleItemClick(item)">
    <Icon
      v-if="item.icon"
      :icon="getIcon(item.icon)"
      width="1.2em"
      height="1.2em"
    ></Icon>
    <span class="ml-1.5">{{ item.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { icons } from '@iconify-json/mdi';
import { getIconData } from '@iconify/utils';
import type { IconifyJSON } from '@iconify/types';
import { Icon } from '@iconify/vue';

import type { MenuItem } from '@/stores/menu';

const props = defineProps<{
  item: MenuItem;
  filter: (items?: MenuItem[]) => MenuItem[];
}>();

const hasChildren = computed(() => !!props.item.children?.length);

const router = useRouter();
const handleItemClick = (item: MenuItem) => {
  if (item.route) {
    router.push({
      name: item.route,
    });
  } else {
    console.warn(`No route config found for '${item.id}'`);
  }
};

const getIcon = (shortname: string) =>
  getIconData(icons as IconifyJSON, shortname);
</script>
