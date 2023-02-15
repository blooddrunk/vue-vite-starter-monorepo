<template>
  <fieldset>
    <slot name="title">
      <BaseLinedTitle v-if="title">
        {{ title }}
      </BaseLinedTitle>
    </slot>

    <div class="grid">
      <el-form-item v-for="(row, index) in rows" :key="index">
        <template #label>
          {{ row.label }}
        </template>

        <Cell v-bind="evaluate(row)"></Cell>
      </el-form-item>
    </div>
  </fieldset>
</template>

<script lang="tsx" setup>
import type { ReadonlyFieldsetData, ReadonlyFieldsetRow } from '@/typings';
import { getPlaceholderForNonValue } from '@/utils/misc';
import { get } from 'lodash-es';

const props = withDefaults(
  defineProps<{
    data: ReadonlyFieldsetData;
    rows: ReadonlyFieldsetRow[];
    title?: string;
  }>(),
  {
    title: '',
  }
);

const evaluate = (row: ReadonlyFieldsetRow) => {
  let textContent = '';

  if ('value' in row) {
    if (typeof row.value === 'function') {
      textContent = getPlaceholderForNonValue(row.value(props.data)).value;
    } else {
      textContent = getPlaceholderForNonValue(row.value).value;
    }
  } else if (Array.isArray(row.valueKey)) {
    textContent = row.valueKey
      .map((k) => getPlaceholderForNonValue(get(props.data, k)).value)
      .join('/');
  } else if ('valueKey' in row) {
    textContent = getPlaceholderForNonValue(
      get(props.data, row.valueKey!)
    ).value;
  }

  let className = '';
  if (row.className) {
    if (typeof row.className === 'function') {
      className = row.className(textContent);
    } else {
      className = row.className;
    }
  }

  return {
    className,
    textContent,
  };
};

const Cell = defineComponent<ReturnType<typeof evaluate>>((props) => {
  return () => <span class={props.className}>{props.textContent}</span>;
});
</script>
