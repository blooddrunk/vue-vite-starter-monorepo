<template>
  <article class="relative h-full bg-white pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <div class="article leading-normal">
      <van-skeleton title avatar :row="3" :loading="isLoading">
        <div class="space-y-3">
          <p>
            <span class="font-bold text-primary text-lg">
              {{ data.price }}
            </span>
            <span class="ml-1 text-xs text-primary">元/月</span>
          </p>
          <p class="font-bold">{{ data.title }}</p>
          <p class="text-sm text-medium">{{ data.body }}</p>
        </div>
      </van-skeleton>
    </div>

    <van-image
      v-if="data.detailImage"
      class="w-full"
      fit="cover"
      :src="data.detailImage"
    >
    </van-image>

    <PageFooter>
      <GoToCartButton></GoToCartButton>

      <van-button
        class="!ml-auto"
        color="var(--color-secondary)"
        round
        :disabled="cart.isItemAdding"
        @click="addToCart"
      >
        加入购物车
      </van-button>

      <router-link v-slot="{ navigate }" custom :to="checkoutRoute">
        <van-button
          class="!ml-3"
          type="primary"
          round
          :disabled="isLoading"
          @click="navigate"
        >
          立刻购买
        </van-button>
      </router-link>
    </PageFooter>
  </article>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router/auto';

import { showFailToast } from 'vant';

definePage({
  meta: {
    layout: 'navbar',
    title: '商品详情',
    canNavBack: true,
  },
});

const props = defineProps<{
  id: string;
}>();

const { data, isLoading, execute } = useProductDetail();
execute(props.id);

const cart = useCartStore();
const addToCart = async () => {
  const { error } = await cart.addItem({
    ...data.value,
    quantity: 1,
  });
  if (error.value) {
    showFailToast(error.value.message);
  }
};

const checkoutRoute = computed<RouteLocationRaw<'/mobile/order'>>(() => ({
  name: '/mobile/order',
  query: {
    productId: props.id,
  },
}));
</script>
