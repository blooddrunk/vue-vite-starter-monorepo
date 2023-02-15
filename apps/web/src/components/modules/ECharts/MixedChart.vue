<template>
  <BorderedCard title="Mixed">
    <div class="aspect-w-3 aspect-h-1">
      <BaseChart
        :dimensions="dimensions"
        :data="data"
        :option="option"
        type="bar"
      ></BaseChart>
    </div>
  </BorderedCard>
</template>

<script lang="ts" setup>
import { zipWith } from 'lodash-es';
import type { EChartsOption } from 'echarts';

import { normalizeSeries } from '@/utils/chart';
import { toPercentage, toCompactDisplayString } from '@/utils/math';
import { C2Item } from '@/services/chart';

const chartStore = useChartStore();

const { dimensions, series } = normalizeSeries(
  [
    'label1',
    {
      name: 'value1',
      seriesConfig: {
        // label: {
        //   show: true,
        //   color: '#f472b6',
        //   position: 'insideTop',
        //   shadowColor: 'red',
        //   shadowBlur: 6,
        // },
        barWidth: 20,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#f472b6',
              },
              {
                offset: 1,
                color: '#6366f1',
              },
            ],
          },
        },
      },
    },
    {
      name: 'value2',
      seriesConfig: {
        type: 'line',
        yAxisIndex: 1,
        label: {
          show: true,
          color: 'white',
          formatter: (params) => {
            const data = params.data as C2Item;
            return `{value1|${toCompactDisplayString(
              data.value1
            )}}/{value2|${toPercentage(data.value2)}}`;
          },
          rich: {
            value1: {
              color: '#38bdf8',
            },
            value2: {
              color: '#0e7490',
            },
          },
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0d9488',
              },
              {
                offset: 1,
                color: '#22c55e',
              },
            ],
          },
        },
      },
    },
  ],
  'bar'
);

const option: EChartsOption = {
  tooltip: {},
  yAxis: [
    {
      axisLabel: {
        formatter: (value: any) => toCompactDisplayString(value),
      },
    },
    {
      axisLabel: {
        formatter: '{value}%',
      },
    },
  ],
  series,
};

const data = computed(() => {
  const rawData = chartStore.data?.r2 ?? [];
  return zipWith(rawData, ['0~2台', '3~5台', '6~9台', '10+'], (a, b) => ({
    label1: b,
    ...a,
  }));
});
</script>
