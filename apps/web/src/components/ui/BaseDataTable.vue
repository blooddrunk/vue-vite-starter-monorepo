<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="items"
      border
      stripe
      header-cell-class-name="!bg-emerald-100 bg-opacity-75 text-primary"
      v-bind="$attrs"
    >
      <slot></slot>
    </el-table>

    <el-pagination
      class="!py-3"
      v-bind="__paginationProps"
      :total="total"
      :current-page="page"
      :page-size="pageSize"
      @update:current-page="updatePage"
      @update:page-size="updatePageSize"
    >
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import type { PaginationProps } from 'element-plus';

type Props = {
  items?: any[];
  loading?: boolean;
  total?: number;
  paginationProps?: Partial<PaginationProps>;
  page: number;
  updatePage: (page: number) => void;
  pageSize: number;
  updatePageSize: (pageSize: number) => void;
};

const defaultPaginationProps: Partial<PaginationProps> = {
  background: true,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper, ->, slot',
};

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  loading: false,
  total: 0,
  paginationProps: () => ({}),
});

const __paginationProps = computed(() => ({
  ...defaultPaginationProps,
  ...props.paginationProps,
}));
</script>
