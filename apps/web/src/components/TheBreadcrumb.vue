<template>
  <nav v-if="shouldShowBreadcrumb" class="py-3">
    <el-breadcrumb>
      <el-breadcrumb-item
        v-for="breadcrumb in visibleBreadcrumbs"
        :key="breadcrumb.title"
        :to="getRoute(breadcrumb.route)"
      >
        {{ breadcrumb.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </nav>
</template>

<script lang="ts" setup>
const uiStore = useUIStore();
const authStore = useAuthStore();

const visibleBreadcrumbs = computed(() =>
  uiStore.breadcrumbList.filter((breadcrumb) => breadcrumb.isVisible !== false)
);
const shouldShowBreadcrumb = computed(
  () => visibleBreadcrumbs.value.length > 0
);
const getRoute = (name?: string) =>
  name
    ? authStore.permittedMenuLookupByRoute[name]
      ? { name }
      : undefined
    : undefined;
</script>
