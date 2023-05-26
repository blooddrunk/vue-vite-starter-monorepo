<template>
  <van-badge class="leading-none" :content="cart.quantity" max="99">
    <NuxtLink to="/mobile/cart">
      <Icon name="mdi:cart" class="text-[1.3em]"></Icon>
    </NuxtLink>
  </van-badge>
</template>

<script lang="ts" setup>
const cart = useCartStore();
</script>
