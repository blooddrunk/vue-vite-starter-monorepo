<template>
  <div class="flex items-center text-xs leading-tight">
    <div
      class="w-6 h-3 3xl:w-8 3xl:h-3 rounded-sm"
      :style="indicatorStyle"
    ></div>
    <div>
      <div class="ml-1.5">{{ label }}</div>
      <div class="ml-1.5 text-primary">
        {{ toCompactDisplayString(value ?? 0) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toCompactDisplayString } from '@/utils/math';

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
