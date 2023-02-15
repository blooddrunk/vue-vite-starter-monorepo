<template>
  <article class="article article_has-footer">
    <div v-if="hasError">
      <van-empty image="error" description="出错了"></van-empty>
    </div>
    <div v-else-if="shouldShowEmptyPlaceholder">
      <van-empty description="购物车为空"></van-empty>
    </div>
    <CartList v-else :items="items" :loading="shouldShowSkeleton"></CartList>

    <PageFooter class="bottom-[50px]">
      <van-checkbox v-model="isAllChecked" icon-size="18px">
        全选
      </van-checkbox>

      <span class="ml-3">
        合计： ￥
        <strong class="font-semibold">
          {{ cart.checkedTotalPrice }}
        </strong>
      </span>

      <router-link v-slot="{ navigate }" custom to="/mobile/order">
        <van-button
          class="!ml-auto min-w-28"
          type="primary"
          round
          :disabled="!cart.hasCheckedItems"
          @click="navigate"
        >
          去结算({{ cart.checkedQuantity }})
        </van-button>
      </router-link>
    </PageFooter>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

definePage({
  meta: {
    layout: 'tabbar-navbar',
    title: '购物车',
  },
});

const cart = useCartStore();

const { items, isItemsLoading, isItemsEmpty, itemsLoadingErrorMessage } =
  storeToRefs(cart);

const hasError = computed(() => !!itemsLoadingErrorMessage.value);

const shouldShowSkeleton = computed(
  () => isItemsEmpty.value && isItemsLoading.value
);

const shouldShowEmptyPlaceholder = computed(
  () => isItemsEmpty.value && !isItemsLoading.value
);

// ! test code
if (!__DEV__ || isItemsEmpty.value) {
  cart.getItems();
}

const isAllChecked = ref(false);
watch(isAllChecked, (checked) => {
  if (checked || (!checked && cart.isAllItemsChecked)) {
    cart.$patch((state) => {
      state.items.forEach((item) => {
        item.checked = checked;
      });
    });
  }
});
watch(
  () => cart.isAllItemsChecked,
  (value) => {
    isAllChecked.value = value;
  },
  { immediate: true }
);
</script>
