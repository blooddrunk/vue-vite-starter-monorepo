<template>
  <template v-if="loading">
    <CartItemSkeleton
      v-for="item in placeholderItems"
      :key="item.id"
    ></CartItemSkeleton>
  </template>
  <template v-else>
    <CartItem
      v-for="item in items"
      :key="item.id"
      v-model:checked="item.checked"
      v-model:quantity="item.quantity"
      :readonly="readonly"
      :item="item"
    >
    </CartItem>
  </template>
</template>

<script lang="ts" setup>
import type { CartItem } from '@/typings';

withDefaults(
  defineProps<{
    items: CartItem[];
    loading?: boolean;
    readonly?: boolean;
  }>(),
  {
    loading: false,
    readonly: false,
  }
);

const placeholderItems = [...Array(5).keys()].map((id) => ({
  id: String(id),
}));
</script>
