<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
definePageMeta({
  breadcrumb: true,
});

useFirstNavigableRoute('main-admin');
</script>
