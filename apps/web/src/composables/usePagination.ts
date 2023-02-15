/**
 * stolen from https://github.com/pikax/vue-composable
 */
import { MaybeRef } from '@/typings';
import { isNumeric } from '@/utils/misc';
import { computed, ref, watch } from 'vue';

const ensureNumber = (value: number | string) => {
  if (typeof value !== 'undefined' && !isNumeric(value)) {
    throw new Error(`[usePagination]: (${value}) must be of number type`);
  }
};

const minmax = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

export type UsePaginationOptions = Partial<{
  pageSize: MaybeRef<number>;
  total: MaybeRef<number>;
  currentPage: MaybeRef<number>;
}>;

export const usePagination = ({
  pageSize: defaultPageSize = 20,
  total: defaultTotal = 0,
  currentPage: defaultPage = 1,
}: UsePaginationOptions = {}) => {
  const _currentPage = ref(defaultPage);
  const _pageSize = ref(defaultPageSize);
  const _total = ref(defaultTotal);

  const total = computed({
    get: () => _total.value,
    set: (value) => {
      ensureNumber(value);
      _total.value = value;
    },
  });

  const pageSize = computed({
    get: () => _pageSize.value,
    set: (value) => {
      ensureNumber(value);
      _pageSize.value = value;
    },
  });

  const lastPagePage = computed(() =>
    total.value ? Math.ceil(total.value / pageSize.value) : 1
  );
  // public getter & setter
  const currentPage = computed({
    get: () => _currentPage.value,
    set: (value) => {
      ensureNumber(value);
      _currentPage.value = minmax(value, 1, lastPagePage.value);
    },
  });

  const offset = computed(() =>
    Math.min((currentPage.value - 1) * pageSize.value, total.value)
  );
  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === lastPagePage.value);

  const prevPage = () => {
    --currentPage.value;
  };
  const nextPage = () => {
    ++currentPage.value;
  };
  const firstPage = () => {
    currentPage.value = 1;
  };
  const lastPage = () => {
    currentPage.value = lastPagePage.value;
  };
  const jumpToPage = (target: number) => {
    currentPage.value = target;
  };

  // lastPagePage may never be < currentPage
  watch([total, pageSize], () => {
    if (currentPage.value > lastPagePage.value) {
      currentPage.value = lastPagePage.value;
    }
  });

  return {
    pageSize,
    total,
    currentPage,

    //computed
    lastPagePage,
    offset,
    isFirstPage,
    isLastPage,

    // Functions
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    jumpToPage,
  };
};
