<template>
  <div>
    <van-pull-refresh v-model="isRefreshing" @refresh="handleRefresh">
      <template v-if="shouldShowEmptyPlaceholder">
        <div v-if="hasError">
          <van-empty image="error" description="出错了"></van-empty>
        </div>
        <div v-else>
          <van-empty description="商品列表为空"></van-empty>
        </div>
      </template>
      <van-list
        v-else
        v-model:loading="isItemsLoading"
        :finished="isLastPage"
        finished-text="没有更多了"
        :immediate-check="false"
        :error="hasError"
        :error-text="itemsLoadingErrorMessage"
        @load="fetchData"
      >
        <component
          :is="productItemOrSkeleton"
          v-for="item in itemsMaybeSkeleton"
          :key="item.id"
          :item="item"
          :loading="shouldShowSkeleton"
        >
        </component>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import type { ProductItem } from '@/typings';

import { storeToRefs } from 'pinia';

import MyProductItem from './ProductItem.vue';
import MyProductItemSkeleton from './ProductItemSkeleton.vue';

import { promiseTimeout } from '@/utils/misc';

const product = useProductStore();
const {
  items,
  isItemsLoading,
  isItemsEmpty,
  isLastPage,
  itemsLoadingErrorMessage,
} = storeToRefs(product);

const isRefreshing = ref(false);
const hasError = computed(() => !!itemsLoadingErrorMessage.value);

const shouldShowSkeleton = computed(
  () => (isItemsEmpty.value && isItemsLoading.value) || isRefreshing.value
);
const shouldShowEmptyPlaceholder = computed(
  () => isItemsEmpty.value && !isItemsLoading.value
);
const placeholderItems = [...Array(3).keys()].map((id) => ({
  id: String(id),
})) as ProductItem[];
const itemsMaybeSkeleton = computed(() =>
  shouldShowSkeleton.value ? placeholderItems : items.value
);
const productItemOrSkeleton = computed(() =>
  shouldShowSkeleton.value ? MyProductItemSkeleton : MyProductItem
);

const fetchData = () => {
  product.nextPage();
};

const handleRefresh = async () => {
  isRefreshing.value = true;
  await product.getItemsAndReset();
  await promiseTimeout(200);
  isRefreshing.value = false;
};

product.getItems();
</script>
