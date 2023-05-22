<template>
  <div class="flex items-center text-xs leading-tight">
    <div
      class="3xl:w-8 3xl:h-3 h-3 w-6 rounded-sm"
      :style="indicatorStyle"
    ></div>
    <div>
      <div class="ml-1.5">{{ label }}</div>
      <div class="text-primary ml-1.5">
        {{ toCompactDisplayString(value ?? 0) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toCompactDisplayString } from '@jn/shared';

type Props = {
  color?: string;
  label?: string;
  value?: number;
};

const props = defineProps<Props>();

const indicatorStyle = computed(() => ({
  backgroundColor: props.color,
}));
</script>
