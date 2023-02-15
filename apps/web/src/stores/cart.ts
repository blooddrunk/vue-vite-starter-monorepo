import type { CartItem, StagedOrderInfo } from '@/typings';
import { precisionFixed } from '@/utils/math';
import { cloneDeep } from 'lodash-es';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const stagedOrderInfo = useStorage<StagedOrderInfo>('staged_order_info', {
    remarks: '',
    isServiceAgreementChecked: false,
  });

  const items = ref<CartItem[]>([]);
  const {
    data,
    isLoading: isItemsLoading,
    errorMessage: itemsLoadingErrorMessage,
    execute: getItems,
  } = useCartList();

  const {
    data: addedItem,
    isLoading: isItemAdding,
    execute: addItem,
    error: itemAddingError,
  } = addCartItem();
  watch(data, (value) => {
    items.value = cloneDeep(value ?? []);
  });

  const {
    data: patchedItem,
    isLoading: isItemPatching,
    execute: patchItem,
    error: itemPatchingError,
  } = patchCartItem();

  const {
    data: removedItem,
    isLoading: isItemRemoving,
    execute: removeItem,
    error: itemRemovingError,
  } = removeCartItem();

  const quantity = computed(() =>
    items.value.reduce((acc, item) => item.quantity + acc, 0)
  );

  const totalPrice = computed(() =>
    precisionFixed(
      items.value.reduce((acc, item) => item.quantity * item.price + acc, 0)
    )
  );

  const checkedItems = computed(() =>
    items.value.filter((item) => item.checked)
  );
  const hasCheckedItems = computed(() => !!checkedItems.value.length);
  const checkedQuantity = computed(() =>
    checkedItems.value.reduce((acc, item) => item.quantity + acc, 0)
  );
  const checkedTotalPrice = computed(() =>
    precisionFixed(
      checkedItems.value.reduce(
        (acc, item) => item.quantity * item.price + acc,
        0
      )
    )
  );
  const isAllItemsChecked = computed(
    () => items.value.length === checkedItems.value.length
  );

  return {
    stagedOrderInfo,

    items,
    isItemsLoading,
    itemsLoadingErrorMessage,
    isItemsEmpty: computed(() => !items.value.length),
    getItems,

    addedItem,
    isItemAdding,
    addItem,
    itemAddingError,

    patchedItem,
    isItemPatching,
    patchItem,
    itemPatchingError,

    removedItem,
    isItemRemoving,
    removeItem,
    itemRemovingError,

    quantity,
    totalPrice,
    checkedItems,
    hasCheckedItems,
    checkedQuantity,
    checkedTotalPrice,
    isAllItemsChecked,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
