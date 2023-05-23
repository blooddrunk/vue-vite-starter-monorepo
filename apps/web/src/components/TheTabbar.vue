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
        <component :is="tab.icon" :class="active && 'text-primary'"></component>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router/auto';
import type { RouteNamedMap } from 'vue-router/auto/routes';

import { ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router/auto';
import IconMdiAccount from '~icons/mdi/account';
import IconMdiApps from '~icons/mdi/apps';
import IconMdiCart from '~icons/mdi/cart';
import IconMdiGiftOpen from '~icons/mdi/gift-open';

const route = useRoute();
const tabbarItems = shallowRef<
  {
    name: string;
    path: RouteLocationRaw;
    routeName: keyof RouteNamedMap;
    icon: any;
    dot: boolean;
  }[]
>([
  {
    name: '分类',
    path: '/mobile/category',
    routeName: '/mobile/category',
    icon: IconMdiApps,
    dot: false,
  },
  {
    name: '定制',
    path: '/mobile/customization',
    routeName: '/mobile/customization',
    icon: IconMdiGiftOpen,
    dot: false,
  },
  {
    name: '购物车',
    path: '/mobile/cart',
    routeName: '/mobile/cart',
    icon: IconMdiCart,
    dot: false,
  },
  {
    name: '我的',
    path: '/mobile/user',
    routeName: '/mobile/user',
    icon: IconMdiAccount,
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
