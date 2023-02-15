<template>
  <BorderedCard title="LiquidFill">
    <div class="p-2 grid grid-cols-4 2xl:gap-2 gap-1">
      <div
        v-for="item in data"
        :key="item.label1"
        class="aspect-w-1 aspect-h-1 w-full relative"
      >
        <ECharts
          ref="chartRef"
          autoresize
          :option="getChartOption(item)"
        ></ECharts>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-2xl 3xl:text-3xl"
        >
          <div class="text-emerald-800 font-semibold">
            {{ toCompactDisplayString(item.value2) }}
          </div>
          <div class="2x:mt-3 mt-2 text-cyan-200">
            {{ toPercentage(item.value1) }}
          </div>
        </div>
      </div>
    </div>
  </BorderedCard>
</template>

<script setup lang="ts">
import { L2Item } from '@/services/chart';
import {
  toPercentage,
  toCompactDisplayString,
  precisionRound,
} from '@/utils/math';

const chartStore = useChartStore();

const data = computed(() => {
  return chartStore.data?.l2 ?? [];
});

const getChartOption = (item: L2Item) => ({
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  series: [
    {
      type: 'liquidFill',
      data: [precisionRound(item.value1 / 100)],
      color: ['#064e3b'],
      radius: '50%',

      label: {
        show: false,
        color: '#0891b2',
      },

      backgroundStyle: {
        color: '#34d399',
      },

      outline: {
        show: true,
        itemStyle: {
          borderWidth: 3,
          borderColor: '#047857',
        },
      },

      itemStyle: {
        opacity: 0.6,
      },

      emphasis: {
        itemStyle: {
          opacity: 0.9,
        },
      },
    },
  ],
});
</script>
