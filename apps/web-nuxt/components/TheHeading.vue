<template>
  <nav
    class="bg-primary flex h-[var(--app-header-height)] flex-shrink-0 items-center p-4"
  >
    <AppLogo is-link></AppLogo>

    <TheTopNav v-if="!menuStore.isSystemSole" class="!ml-6"></TheTopNav>

    <el-dropdown class="ml-auto" size="medium" @command="handleCommand">
      <div class="flex items-center text-white">
        <Icon name="mdi:account-circle" class="text-[1.3em]"></Icon>
        <span class="ml-1">{{ authStore.userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="password">
            修改密码
            <Icon name="mdi:key" class="ml-1"> </Icon>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出登录
            <Icon name="mdi:logout" class="ml-1"> </Icon>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const menuStore = useMenuStore();

const handleCommand = async (command: string) => {
  switch (command) {
    case 'logout':
      await authStore.logout();
      router.push({ name: '/sign-in' });
      break;

    default:
      break;
  }
};
</script>
