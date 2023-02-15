<template>
  <van-tabbar v-model="activeItem" class="!fixed">
    <van-tabbar-item
      v-for="tab in tabbarItems"
      :key="tab.name"
      :name="tab.routeName"
      :to="tab.path"
      :dot="tab.dot"
      :badge="tab.badge"
    >
      <span>{{ tab.name }}</span>

      <template #icon="{ active }">
        <component :is="tab.icon" :class="active && 'text-primary'"></component>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { shallowRef, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import IconMdiApps from '~icons/mdi/apps';
import IconMdiGiftOpen from '~icons/mdi/gift-open';
import IconMdiCart from '~icons/mdi/cart';
import IconMdiAccount from '~icons/mdi/account';

const route = useRoute();
const tabbarItems = shallowRef([
  {
    name: '分类',
    path: '/mobile/category',
    routeName: 'mobile-category',
    icon: IconMdiApps,
    dot: false,
    badge: '',
  },
  {
    name: '定制',
    path: '/mobile/customization',
    routeName: 'mobile-customization',
    icon: IconMdiGiftOpen,
    dot: false,
    badge: '',
  },
  {
    name: '购物车',
    path: '/mobile/cart',
    routeName: 'mobile-cart',
    icon: IconMdiCart,
    dot: false,
    badge: '',
  },
  {
    name: '我的',
    path: '/mobile/user',
    routeName: 'mobile-user',
    icon: IconMdiAccount,
    dot: false,
    badge: '',
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
