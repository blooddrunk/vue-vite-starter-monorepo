<template>
  <BorderedCard title="Line">
    <div class="aspect-w-4 aspect-h-1">
      <BaseChart
        :dimensions="dimensions"
        :data="dataSource"
        :option="option"
        type="line"
      ></BaseChart>
    </div>
  </BorderedCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { normalizeSeries } from '@/utils/chart';

const random = () => {
  return Math.round(300 + Math.random() * 700) / 10;
};

const { dimensions, series } = normalizeSeries(
  [
    'product',
    {
      name: '2015',
      displayName: '2015年',
      displayDimension: '2015Tooltip',
    },
    { name: '2016', displayName: '二零一六', isPercentage: true },
    '2017',
  ],
  'line'
);

const dataSource = ref(
  ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'].map(
    (product) => ({
      product,
      '2015': random(),
      '2015Tooltip': `${random()}!`,
      '2016': random(),
      '2016_Percentage': `${random()}%`,
      '2017': random(),
    })
  )
);

const option = {
  series,
  legend: {},
};
</script>
