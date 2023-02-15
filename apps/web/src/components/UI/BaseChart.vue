<template>
  <ECharts
    ref="chartRef"
    :autoresize="autoResize"
    :theme="currentTheme"
    :option="mergedOption"
    v-bind="$attrs"
  ></ECharts>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import type { CommonChartProps } from '@/utils/chart';

const props = withDefaults(defineProps<CommonChartProps>(), {
  autoResize: true,
  loading: false,
  theme: 'primary',
});

const { chartRef, mergedOption } = useEcharts(props, props.type);

/**
 * ! this will not work reactively
 */
const isDark = useDark();
const currentTheme = computed(() => (isDark.value ? 'dark' : props.theme));
</script>
