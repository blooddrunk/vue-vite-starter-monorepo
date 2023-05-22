<template>
  <section class="flex h-screen flex-col items-center justify-center">
    <h3 class="py-6 text-5xl font-bold">404 NOT FOUND</h3>
    <p class="mt-6">
      <router-link to="/"> 返回首页 </router-link>
    </p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'error',
});
</script>
