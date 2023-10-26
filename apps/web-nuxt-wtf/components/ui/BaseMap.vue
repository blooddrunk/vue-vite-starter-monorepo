<template>
  <ECharts
    ref="chartRef"
    :autoresize="autoResize"
    :theme="theme"
    :option="mergedOption"
    v-bind="$attrs"
  ></ECharts>
</template>

<script lang="ts" setup>
import type { MapChartProps } from '@jn/shared';

import { useEcharts } from '@jn/shared';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MapChartProps>(), {
  autoResize: true,
  loading: false,
  theme: 'primary',
});

const { chartRef, mergedOption } = useEcharts(props, 'map');

defineExpose({
  chartRef,
});
</script>
