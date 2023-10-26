<template>
  <van-tabbar v-model="activeItem" class="!fixed">
    <van-tabbar-item
      v-for="tab in tabbarItems"
      :key="tab.name"
      :name="tab.routeName"
      :to="tab.path"
      :dot="tab.dot"
    >
      <span>{{ tab.name }}</span>

      <template #icon="{ active }">
        <Icon
          :class="(active as boolean) ? 'text-primary' : ''"
          :name="tab.icon"
        ></Icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router';
import type { RouteNamedMap } from 'vue-router/auto/routes';

import { ref, shallowRef, watch } from 'vue';

const route = useRoute();
const tabbarItems = shallowRef<
  {
    name: string;
    path: RouteLocationRaw;
    routeName: keyof RouteNamedMap;
    icon: string;
    dot: boolean;
  }[]
>([
  {
    name: '分类',
    path: '/mobile/category',
    routeName: 'mobile-category',
    icon: 'mdi:apps',
    dot: false,
  },
  {
    name: '定制',
    path: '/mobile/customization',
    routeName: 'mobile-customization',
    icon: 'mdi:gift-open',
    dot: false,
  },
  {
    name: '购物车',
    path: '/mobile/cart',
    routeName: 'mobile-cart',
    icon: 'mdi:cart',
    dot: false,
  },
  {
    name: '我的',
    path: '/mobile/user',
    routeName: 'mobile-user',
    icon: 'mdi:account',
    dot: false,
  },
]);
const activeItem = ref(route.name as string);

watch(
  () => route.name as string,
  (value) => {
    activeItem.value = value;
  }
);
</script>
