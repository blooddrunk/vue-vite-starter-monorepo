<template>
  <div class="w-full space-y-8">
    <HistChart></HistChart>

    <LineChart></LineChart>

    <MixedChart></MixedChart>

    <PieChart></PieChart>

    <GaugeChart></GaugeChart>

    <LiquidFill></LiquidFill>

    <ChinaMap></ChinaMap>

    <InteractiveMap></InteractiveMap>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  requiresAuth: false,
});

const chartStore = useChartStore();
chartStore.fetchData();
</script>
