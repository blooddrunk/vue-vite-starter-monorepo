<template>
  <BorderedCard title="Gauge">
    <div class="p-2 grid grid-cols-4 2x:gap-3 gap-1">
      <GaugeChartItem
        v-for="item in data"
        :key="item.label1"
        :item="item"
      ></GaugeChartItem>
    </div>
  </BorderedCard>
</template>

<script lang="ts" setup>
const chartStore = useChartStore();

const data = computed(() => {
  return chartStore.data?.c1 ?? [];
});
</script>
