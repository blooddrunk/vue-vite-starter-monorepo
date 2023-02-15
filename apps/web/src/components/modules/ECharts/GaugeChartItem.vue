<template>
  <div class="flex flex-col items-center text-lg">
    <div class="aspect-w-1 aspect-h-1 w-full relative">
      <ECharts ref="chartRef" autoresize :option="chartOption"></ECharts>
    </div>

    <div class="space-y-2">
      <GaugeChartLegend
        :color="primaryColor"
        :label="item.label1"
        :value="item.value1"
      ></GaugeChartLegend>
      <GaugeChartLegend
        :color="secondaryColor"
        :label="item.label2"
        :value="item.value2"
      ></GaugeChartLegend>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { C1Item } from '@/services/chart';
import { toPercentage } from '@/utils/math';

type Props = {
  item: C1Item;
};

const props = withDefaults(defineProps<Props>(), {
  item: () => ({} as C1Item),
});

const primaryColor = computed(() => props.item.color?.[0] ?? '#0891b2');
const secondaryColor = computed(() => props.item.color?.[1] ?? '#0891b2');
const tertiaryColor = computed(() => props.item.color?.[2] ?? '#0891b2');
const max = computed(() => props.item.value1 / 0.8);

const chartOption = computed(() => ({
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  color: props.item.color,

  media: [
    {
      query: {
        minWidth: 1920,
      },

      option: {
        detail: {
          fontSize: 20,
        },
      },
    },
  ],

  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      radius: '50%',
      max: max.value,
      splitNumber: 10000,

      data: [
        {
          value: props.item.value1,
        },
        {
          value: props.item.value2,
        },
      ],

      pointer: {
        show: false,
      },

      title: {
        show: false,
      },

      progress: {
        show: true,
        overlap: false,
        roundCap: true,
      },

      axisLine: {
        lineStyle: {
          width: 40,
          color: [[1, 'transparent']],
        },
      },

      splitLine: {
        show: false,
      },

      axisLabel: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      detail: {
        color: primaryColor.value,
        fontSize: 20,
        lineHeight: 32,
        offsetCenter: ['0%', '0%'],
        formatter: () =>
          `${props.item.title}\n{value3|${toPercentage(props.item.value3)}}`,
        rich: {
          value3: {
            color: tertiaryColor.value,
            fontSize: 18,
          },
        },
      },
    },
  ],
}));
</script>
