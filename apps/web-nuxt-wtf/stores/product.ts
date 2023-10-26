import { defineStore, acceptHMRUpdate } from 'pinia';

export const useProductStore = defineStore('product', () => {
  const {
    items,
    isLoading: isItemsLoading,
    pagination,
    errorMessage: itemsLoadingErrorMessage,
    isEmpty: isItemsEmpty,
    fetchList: getItems,
    fetchListAndReset: getItemsAndReset,
  } = useProductList();

  return {
    items,
    isItemsLoading,
    isItemsEmpty,
    itemsLoadingErrorMessage,
    isLastPage: pagination.isLastPage,
    nextPage: pagination.nextPage,
    getItems,
    getItemsAndReset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
