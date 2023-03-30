<template>
  <component :is="tag" class="h-full overflow-y-auto" :style="pageStyle">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: string;
    footer?: string | number | boolean;
  }>(),
  {
    tag: 'article',
    footer: false,
  }
);

const pageStyle = computed(() => ({
  paddingBottom:
    props.footer === true
      ? 'calc(80px+1.5rem)'
      : props.footer === false
      ? undefined
      : props.footer,
}));
</script>
