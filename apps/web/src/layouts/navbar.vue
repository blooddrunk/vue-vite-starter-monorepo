<template>
  <main class="h-screen bg-lighter pt-[46px]" :class="hasTabbar && 'pb-[50px]'">
    <van-nav-bar
      class="!fixed left-0 top-0 right-0"
      :title="meta.title"
      :left-arrow="meta.canNavBack"
      @click-left="navBack"
    >
    </van-nav-bar>

    <div class="h-full overflow-y-auto">
      <router-view></router-view>
    </div>

    <TheTabbar v-if="hasTabbar"></TheTabbar>
  </main>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ hasTabbar?: boolean }>(), {
  hasTabbar: false,
});

const router = useRouter();
const navBack = () => {
  router.back();
};

const route = useRoute();
const meta = computed(() => route.meta);
</script>
