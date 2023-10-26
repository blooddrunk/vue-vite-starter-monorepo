<template>
  <el-button v-bind="buttonProps" :loading="isLoading" :disabled="isLoading">
    <slot v-if="!isLoading"></slot>
  </el-button>
</template>

<script lang="ts" setup>
import { ComponentSize, ButtonType } from 'element-plus';

type ButtonProps = Partial<{
  size: ComponentSize;
  type: ButtonType;
  plain: boolean;
}>;

type RowProps = {
  row: {
    loading: boolean;
    [x: string]: any;
  };
  $index: number;
};

type Props = {
  buttonProps?: ButtonProps;
  rowProps: RowProps;
};

const props = defineProps<Props>();

const buttonProps = computed(() =>
  Object.assign(
    {},
    {
      type: 'text',
      size: 'mini',
    },
    props.buttonProps
  )
);

const isLoading = computed(() => props.rowProps.row.loading);
</script>
