import { computed } from 'vue';

import usePaginatedList from './usePaginatedList';

export const useElementPaginatedTable = (...args) => {
  const result = usePaginatedList(...args);

  const elementTableProps = computed(() => ({
    items: result.items.value,
    loading: result.isLoading.value,
    total: result.pagination.total.value,
    page: result.pagination.currentPage.value,
    pageSize: result.pagination.pageSize.value,

    updatePage: result.pagination.jumpToPage,
    updatePageSize: (pageSize) => {
      result.pagination.pageSize.value = pageSize;
    },
  }));

  return {
    ...result,
    elementTableProps,
  };
};
