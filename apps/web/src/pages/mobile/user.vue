<template>
  <article class="article">
    <div v-if="hasError">
      <van-empty image="error" description="出错了"></van-empty>
    </div>
    <div v-else-if="shouldShowEmptyPlaceholder">
      <van-empty description="出错了"></van-empty>
    </div>
    <OrderList v-else :items="items" :loading="shouldShowSkeleton"></OrderList>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

definePage({
  meta: {
    layout: 'tabbar-navbar',
    title: '我的订单',
  },
});

const order = useOrderStore();

const { items, isItemsLoading, isItemsEmpty, error } = storeToRefs(order);

// ! test code
if (!__DEV__ || isItemsEmpty.value) {
  order.getItems();
}

const hasError = computed(() => !!error.value);

const shouldShowSkeleton = computed(
  () => isItemsEmpty.value && isItemsLoading.value
);

const shouldShowEmptyPlaceholder = computed(
  () => isItemsEmpty.value && !isItemsLoading.value
);
</script>
