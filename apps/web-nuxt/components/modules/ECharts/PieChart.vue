<template>
  <BorderedCard title="Pie">
    <div class="relative">
      <div class="aspect-w-3 aspect-h-1">
        <BaseChart :data="data" :option="chartOption" type="pie"></BaseChart>
      </div>

      <div class="text-lg 3xl:2xl text-primary font-semibold">
        <div
          class="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          昨日
        </div>
        <div
          class="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          今日
        </div>
      </div>
    </div>
  </BorderedCard>
</template>

<script setup lang="ts">
import type { EChartsOption, PieSeriesOption } from 'echarts';
import { zipWith } from 'lodash-es';

const chartStore = useChartStore();

const data = computed(() => {
  const rawData = chartStore.data?.c2 ?? [];
  return zipWith(rawData, ['90分+', '75-90分', '60-75分', '<60分'], (a, b) => ({
    label1: b,
    ...a,
  }));
});

const defaultSeries: PieSeriesOption = {
  type: 'pie',
  radius: ['25%', '45%'],
  label: {
    color: 'inherit',
    formatter: '{d}%',
  },
  labelLine: {
    show: false,
    length: 4,
    length2: 0,
  },
};

const chartOption: EChartsOption = {
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  legend: {},
  series: [
    {
      ...defaultSeries,
      center: ['25%', '50%'],
      encode: {
        itemName: 'label1',
        value: 'value1',
      },
    },
    {
      ...defaultSeries,
      center: ['75%', '50%'],
      encode: {
        itemName: 'label1',
        value: 'value2',
      },
    },
  ],
};
</script>
