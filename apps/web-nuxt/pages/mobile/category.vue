<template>
  <article ref="wrapper" class="article">
    <van-sticky offset-top="46px" @change="handleStick">
      <div
        class="flex items-center justify-between pr-2"
        :class="isSticky && '-mx-6 bg-white/75 py-3 pl-6 pr-8 shadow-md'"
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
const auth = useMobileAuthStore();

definePageMeta({
  layout: 'tabbar-navbar',
  title: '商品分类',
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
