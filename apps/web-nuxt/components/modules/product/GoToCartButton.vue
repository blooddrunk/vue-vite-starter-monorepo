<template>
  <van-badge class="leading-none" :content="cart.quantity" max="99">
    <router-link to="/mobile/cart">
      <IconMdiCart class="text-[1.3em]"></IconMdiCart>
    </router-link>
  </van-badge>
</template>

<script lang="ts" setup>
const cart = useCartStore();
</script>
