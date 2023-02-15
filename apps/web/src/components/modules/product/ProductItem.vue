<template>
  <router-link :to="routeLocation">
    <figure class="mt-3 rounded-md bg-white p-2 shadow shadow-light">
      <van-image
        class="h-32 w-full"
        :src="item.thumbnail"
        fit="cover"
        round
        radius="8px"
      ></van-image>
      <div class="break-all text-medium line-clamp-3">
        <figcaption class="inline text-dark">
          {{ item.title }}
        </figcaption>
        <span class="ml-2 text-xs text-light">
          {{ item.body }}
        </span>
      </div>
      <div class="flex items-center py-1">
        <span class="font-bold text-primary">{{ item.price }}</span>
        <span class="ml-1 text-xs text-primary">元/月</span>

        <span class="ml-auto">
          <van-button
            round
            size="small"
            type="primary"
            :disabled="cart.isItemAdding"
            @click.prevent.stop="addToCart"
          >
            <IconMdiCartPlus></IconMdiCartPlus>
          </van-button>
        </span>
      </div>
    </figure>
  </router-link>
</template>

<script lang="ts" setup>
import { showFailToast } from 'vant';
import type { RouteLocationRaw } from 'vue-router/auto';

import type { ProductItem } from '@/typings';

type Props = {
  item: ProductItem;
};

const props = defineProps<Props>();

const cart = useCartStore();

const addToCart = async () => {
  await cart.addItem({
    ...props.item,
    quantity: 1,
  });
  if (cart.itemAddingError) {
    showFailToast(cart.itemAddingError.message);
  }
};

const routeLocation: RouteLocationRaw<'/mobile/products/[id]'> = {
  name: '/mobile/products/[id]',
  params: {
    id: props.item.id,
  },
};
</script>
