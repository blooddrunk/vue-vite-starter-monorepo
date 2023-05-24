<template>
  <router-link :to="routeLocation">
    <figure class="shadow-light mt-3 rounded-md bg-white p-2 shadow">
      <van-image
        class="h-32 w-full"
        :src="item.thumbnail"
        fit="cover"
        round
        radius="8px"
      ></van-image>
      <div class="text-medium line-clamp-3 break-all">
        <figcaption class="text-dark inline">
          {{ item.title }}
        </figcaption>
        <span class="text-light ml-2 text-xs">
          {{ item.body }}
        </span>
      </div>
      <div class="flex items-center py-1">
        <span class="text-primary font-bold">{{ item.price }}</span>
        <span class="text-primary ml-1 text-xs">元/月</span>

        <span class="ml-auto">
          <van-button
            round
            size="small"
            type="primary"
            :disabled="cart.isItemAdding"
            @click.prevent.stop="addToCart"
          >
            <Icon name="mdi:cart-plus"></Icon>
          </van-button>
        </span>
      </div>
    </figure>
  </router-link>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router';
import type { ProductItem } from '@/typings';

import { showFailToast } from 'vant';

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

const routeLocation: RouteLocationRaw<'mobile-products-id'> = {
  name: 'mobile-products-id',
  params: {
    id: props.item.id,
  },
};
</script>
