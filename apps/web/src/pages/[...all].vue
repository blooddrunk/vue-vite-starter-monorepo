<template>
  <section class="h-screen flex flex-col justify-center items-center">
    <h3 class="text-5xl font-bold py-6">404 NOT FOUND</h3>
    <p class="mt-6">
      <router-link to="/"> 返回首页 </router-link>
    </p>
  </section>
</template>

<script setup lang="ts">
definePage({
  meta: {
    layout: 'error',
  },
});
</script>
