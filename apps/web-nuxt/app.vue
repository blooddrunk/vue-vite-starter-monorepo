<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Vue 3 starter template using Vite',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite/Vue 3 Starter Template',
    },
  ],
});
</script>
