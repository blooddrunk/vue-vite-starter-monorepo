<template>
  <BorderedCard title="Interactive Map">
    <div class="relative">
      <div class="aspect-w-4 aspect-h-1 scale-105">
        <BaseMap
          ref="mapRef"
          :data="mapData"
          :option="mapOption"
          map="zhejiang"
          @geoselectchanged="handleCityChange"
        ></BaseMap>
      </div>

      <header
        class="text-primary shadow-primary absolute left-6 top-6 rounded-md p-2 font-semibold shadow-md"
      >
        <h3>{{ chartStore.currentCity }}</h3>
      </header>
    </div>
  </BorderedCard>
</template>

<script lang="ts" setup>
import { storeKeys } from '@/services/chart';

const chartStore = useChartStore();
const mapRef = ref<InstanceType<typeof BaseMap>>();

const mapData = shallowRef(
  storeKeys.map((name) => ({
    name,
    value: null,
    selected: name === chartStore.currentCity,
  })),
);
const mapOption = {
  tooltip: {
    show: false,
  },

  geo: {
    zoom: 1.2,
  },
};

// ! typing?
const handleCityChange = (param: any) => {
  const { selected, name } = param;
  const isSelecting = selected[name];
  if (isSelecting) {
    if (name !== chartStore.currentCity) {
      chartStore.onCityChange(name);
    }
  } else {
    // forbid unselecting
    mapRef.value?.chartRef?.chart?.dispatchAction({
      type: 'geoToggleSelect',
      geoIndex: 0,
      name,
    });
  }
};
</script>
