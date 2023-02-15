<template>
  <el-menu
    class="!border-b-0"
    :default-active="currentSystem"
    mode="horizontal"
    :ellipsis="false"
    background-color="transparent"
    text-color="white"
    active-text-color="var(--color-secondary)"
    @select="handleSystemSwitch"
  >
    <el-menu-item
      v-for="system in systemList"
      :key="system.value"
      :index="system.value"
    >
      {{ system.label }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import type { SystemValue } from '@/stores/menu';
import { getRouteOfMenuItem } from '@/utils/biz/menu';
import { promiseTimeout } from '@/utils/misc';

const menuStore = useMenuStore();
const authStore = useAuthStore();
const { systemList, currentSystem } = storeToRefs(menuStore);
const router = useRouter();

const handleSystemSwitch = async (key: string) => {
  menuStore.currentMenuList = [];

  await promiseTimeout(300);
  menuStore.switchSystem(key as SystemValue);

  const nextRoute = getRouteOfMenuItem(authStore.firstPermittedMenuBySystem);
  if (nextRoute) {
    router.push(nextRoute);
  }
};
</script>
