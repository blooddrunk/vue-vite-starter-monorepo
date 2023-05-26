<template>
  <article class="relative h-full bg-white pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <div class="article leading-normal">
      <van-skeleton title avatar :row="3" :loading="isLoading">
        <div class="space-y-3">
          <p>
            <span class="text-primary text-lg font-bold">
              {{ data.price }}
            </span>
            <span class="text-primary ml-1 text-xs">元/月</span>
          </p>
          <p class="font-bold">{{ data.title }}</p>
          <p class="text-medium text-sm">{{ data.body }}</p>
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

      <NuxtLink v-slot="{ navigate }" custom :to="checkoutRoute">
        <van-button
          class="!ml-3"
          type="primary"
          round
          :disabled="isLoading"
          @click="navigate"
        >
          立刻购买
        </van-button>
      </NuxtLink>
    </PageFooter>
  </article>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router';

import { useRouteParams } from '@vueuse/router';
import { showFailToast } from 'vant';

definePageMeta({
  layout: 'navbar',
  title: '商品详情',
  canNavBack: true,
});

const id = useRouteParams('id', '', { transform: String });

const { data, isLoading, execute } = useProductDetail();
execute(id.value);

const cart = useCartStore();
const addToCart = async () => {
  const { errorMessage } = await cart.addItem({
    ...data.value,
    quantity: 1,
  });
  if (errorMessage.value) {
    showFailToast(errorMessage.value);
  }
};

const checkoutRoute = computed<RouteLocationRaw<'mobile-order'>>(() => ({
  name: 'mobile-order',
  query: {
    productId: id.value,
  },
}));
</script>
