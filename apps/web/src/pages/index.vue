<template>
  <ul class="m-auto w-2/3 list-none text-lg md:w-1/2">
    <li v-for="item in menuList" :key="item.text" class="border-b px-2 py-3">
      <router-link
        class="flex cursor-pointer items-center justify-between"
        :to="item.to"
      >
        {{ item.text }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { RouteNamedMap } from 'vue-router/auto/routes';

definePage({
  meta: {
    requiresAuth: false,
  },
});

const menuList = ref<
  {
    text: string;
    to: keyof RouteNamedMap;
  }[]
>([
  {
    text: 'Simple list',
    to: '/simple-list',
  },

  {
    text: 'Virtual list',
    to: '/virtual-list',
  },

  {
    text: 'Simple Form',
    to: '/simple-form',
  },

  {
    text: 'ECharts',
    to: '/echarts',
  },

  {
    text: 'Biz Admin',
    to: '/main/admin',
  },

  {
    text: 'Mobile layout with vant',
    to: '/mobile/',
  },
]);
</script>
