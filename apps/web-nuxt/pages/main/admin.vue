<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
definePage({
  meta: {
    breadcrumb: true,
  },
});

useFirstNavigableRoute('/main/admin');
</script>
