import { createNamedEntryForGlobImport } from '@jn/shared';

import 'echarts-liquidfill';

import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  MapSeriesOption,
  PieSeriesOption,
} from 'echarts/charts';
import type {
  DatasetComponentOption,
  GeoComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
// import * as echarts from 'echarts';
import type { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import type { JsonObject } from 'type-fest';

import {
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PieChart,
} from 'echarts/charts';
import {
  DatasetComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { registerMap, registerTheme, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VueEcharts from 'vue-echarts';

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GaugeSeriesOption
  | MapSeriesOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GeoComponentOption
>;

export default defineNuxtPlugin((nuxtApp) => {
  use([
    CanvasRenderer,

    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    MapChart,

    DatasetComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GeoComponent,
  ]);

  /**
   * register themes
   * TODO: static theme type
   */
  const themeModules = import.meta.glob<JsonObject>('./echarts/theme/*.ts', {
    import: 'default',
  });
  createNamedEntryForGlobImport(themeModules).forEach(async ([key, m]) => {
    registerTheme(key, await m());
  });

  /**
   * register maps
   * TODO: static map type
   */
  const mapModules = import.meta.glob<GeoJSONSourceInput>(
    './echarts/map/*.json',
    {
      import: 'default',
    },
  );
  createNamedEntryForGlobImport(mapModules).forEach(async ([key, m]) => {
    registerMap(key, await m());
  });

  nuxtApp.vueApp.component('ECharts', VueEcharts);
});

declare module 'vue' {
  export interface GlobalComponents {
    ECharts: typeof VueEcharts;
  }
}
