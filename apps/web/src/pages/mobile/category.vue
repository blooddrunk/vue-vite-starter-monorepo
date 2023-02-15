<template>
  <article ref="wrapper" class="article">
    <van-sticky offset-top="46px" @change="handleStick">
      <div
        class="flex items-center justify-between pr-2"
        :class="isSticky && 'bg-white/75 -mx-6 pl-6 pr-8 py-3 shadow-md'"
      >
        <AreaPicker
          :model-value="auth.area"
          @update:model-value="handleAreaChange"
        ></AreaPicker>

        <GoToCartButton></GoToCartButton>
      </div>
    </van-sticky>

    <ProductList class="mt-4"></ProductList>
  </article>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const auth = useMobileAuthStore();

definePage({
  meta: {
    layout: 'tabbar-navbar',
    title: '商品分类',
  },
});

const handleAreaChange = (area: string) => {
  auth.updateUser({
    area,
  });
};

const isSticky = ref(false);
const handleStick = (sticky: boolean) => {
  isSticky.value = sticky;
};
</script>
