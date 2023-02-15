import { MaybeRef } from '@/typings';
import type { EChartsOption, SeriesOption } from 'echarts';
import type { GeoJSONCompressed } from 'echarts/types/src/coord/geo/geoTypes';
import { merge } from 'lodash-es';
import { unref } from 'vue';
// import type { SeriesEncodeOptionMixin } from 'echarts/types/src/util/types';
import ECharts from 'vue-echarts';

export type VueEchartsComponent = InstanceType<typeof ECharts>;

export type ChartTheme = 'primary' | 'secondary' | 'dark' | Record<string, any>;

export type CommonChartType = 'pie' | 'bar' | 'line' | 'scatter' | 'map';

export interface CommonChartProps {
  autoResize?: boolean;
  dimensions?: EnhancedDimensionDefinition[];
  data: any[];
  loading?: boolean;
  option: EChartsOption;
  theme?: ChartTheme;
  type?: CommonChartType;
}
export interface MapChartProps {
  autoResize?: boolean;
  data: any[];
  loading?: boolean;
  option: EChartsOption;
  theme?: ChartTheme;
  map?: string;
}

export type EnhancedDimensionDefinition =
  | {
      name: string;
      displayName?: string;
      displayDimension?: string;
      isPercentage?: boolean;
      seriesConfig?: SeriesOption;
    }
  | string;
export type NormalizedDimensionDefinition = {
  name: string;
  displayName?: string;
};

export const normalizeSeries = (
  enhancedDimensions: MaybeRef<EnhancedDimensionDefinition[]>,
  type?: 'line' | 'bar' | 'scatter' | 'effectScatter',
  { hasCategoryDimension = true } = {}
) => {
  const dimensions: EnhancedDimensionDefinition[] = [];
  const series: SeriesOption[] = [];

  unref(enhancedDimensions).forEach((dimension, index) => {
    // first row is category dimension
    if (hasCategoryDimension && index === 0) {
      dimensions.push(dimension);
      return;
    }

    const definitionItem =
      typeof dimension === 'string'
        ? {
            name: dimension,
          }
        : dimension;
    const { name, displayName, displayDimension, isPercentage, seriesConfig } =
      definitionItem;

    dimensions.push({
      name,
      displayName,
    });

    let maybePercentageDimension = displayDimension;
    if (isPercentage && !displayDimension) {
      maybePercentageDimension = `${name}_Percentage`;
    }

    const extraSeriesConfig = seriesConfig || {};
    extraSeriesConfig.type = extraSeriesConfig.type || type;

    if (!extraSeriesConfig.type) {
      throw new Error(`series type of [${name}] is missing`);
    }

    const seriesItem: any = merge(
      {
        encode: {
          x: [0],
          y: name,
          seriesName: name,
          tooltip: name,
        },
      },
      extraSeriesConfig
    );

    if (maybePercentageDimension) {
      dimensions.push(maybePercentageDimension);
      if (seriesItem.encode) {
        seriesItem.encode.tooltip = maybePercentageDimension;
      }
    }

    series.push(seriesItem);
  });

  return {
    dimensions,
    series,
  };
};

export const getRegionNameList = (geojson: GeoJSONCompressed) =>
  geojson.features.map(({ properties }) => properties.name);
