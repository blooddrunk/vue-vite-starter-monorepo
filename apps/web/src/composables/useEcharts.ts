import {
  CommonChartProps,
  CommonChartType,
  MapChartProps,
  VueEchartsComponent,
} from '@jn/shared/echarts';
import { EChartsOption } from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import { merge } from 'lodash-es';
import { computed, ref } from 'vue';

export const usePieChart = (props: CommonChartProps) =>
  computed<EChartsCoreOption>(() => ({
    dataset: {
      sourceHeader: false,
      dimensions: props.dimensions,
      source: props.data,
    },

    series: {
      type: 'pie',
      label: {
        alignTo: 'edge',
        edgeDistance: '10%',
      },
    },
    tooltip: {
      confine: true,
    },
  }));

export const useCartesianChart = (props: CommonChartProps) => {
  const seriesCount = computed(() => props.dimensions!.length - 1);

  const presetSeries = computed(() =>
    Array(seriesCount.value).fill({
      type: props.type,
    })
  );

  const defaultOption = computed<EChartsOption>(() => ({
    dataset: {
      sourceHeader: false,
      dimensions: props.dimensions,
      source: props.data,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: props.option?.series ?? presetSeries.value,
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
  }));

  return defaultOption;
};

export const useMapChart = (props: MapChartProps) =>
  computed<EChartsCoreOption>(() => ({
    geo: {
      map: props.map,
      roam: false,
      zoom: 1,
      selectedMode: 'single',
      regions: props.data,
    },

    tooltip: {
      confine: true,
    },
  }));

export const useEcharts = (props: CommonChartProps, type?: CommonChartType) => {
  const defaultOption =
    type === 'pie'
      ? usePieChart(props)
      : type === 'map'
      ? useMapChart(props)
      : useCartesianChart(props);

  const mergedOption = computed<EChartsCoreOption>(() =>
    merge({}, defaultOption.value, props.option)
  );
  const chartRef = ref<VueEchartsComponent | null>(null);

  return {
    mergedOption,
    chartRef,
  };
};
