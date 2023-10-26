<template>
  <component :is="tag" class="flex items-center" :to="route">
    <img :class="classMap.logo" src="@/assets/logo.png" alt="logo" />
    <h1
      :class="classMap.text"
      class="ml-3 text-white font-semibold tracking-wide"
    >
      {{ $appName }}
    </h1>
  </component>
</template>

<script lang="ts" setup>
type Props = {
  size?: 'normal' | 'large';
  isLink?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  isLink: false,
});

const tag = computed(() => (props.isLink ? 'router-link' : 'header'));
const route = computed(() => (props.isLink ? '/' : undefined));
const classMap = computed(() =>
  props.size === 'large'
    ? {
        logo: 'h-12 w-12',
        text: 'text-5xl',
      }
    : {
        logo: 'h-6 w-6',
        text: 'text-2xl',
      }
);
</script>
