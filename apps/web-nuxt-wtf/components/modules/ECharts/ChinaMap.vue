<template>
  <BorderedCard title="China Map">
    <div class="aspect-w-4 aspect-h-1">
      <BaseMap :data="dataSource" :option="option" map="china"></BaseMap>
    </div>
  </BorderedCard>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts';

const dataSource = [] as any[];
const option = {} as EChartsOption;
</script>
