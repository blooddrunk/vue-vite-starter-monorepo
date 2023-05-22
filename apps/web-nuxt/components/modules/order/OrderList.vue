<template>
  <template v-if="loading">
    <OrderItemSkeleton
      v-for="item in placeholderItems"
      :key="item.id"
    ></OrderItemSkeleton>
  </template>
  <template v-else>
    <OrderItem v-for="item in items" :key="item.orderNumber" :item="item">
    </OrderItem>
  </template>
</template>

<script lang="ts" setup>
import type { OrderItem } from '@/typings';

withDefaults(
  defineProps<{
    items: OrderItem[];
    loading?: boolean;
    readonly?: boolean;
  }>(),
  {
    loading: false,
    readonly: false,
  }
);

const placeholderItems = [...Array(3).keys()].map((id) => ({
  id: String(id),
}));
</script>
