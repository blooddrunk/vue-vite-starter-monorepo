import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { UnwrapRef } from 'vue';

import type { UseAxiosOptions } from './useAxios';
import type { UsePaginationOptions } from './usePagination';

import { cloneDeep, merge } from 'lodash-es';
import { computed, readonly, ref, shallowRef, unref, watch } from 'vue';

import { trimValues } from '../utils';
import { useAxios } from './useAxios';
import { usePagination } from './usePagination';

export type Pagination = ReturnType<typeof usePagination>;

type PaginationToQuery = Record<keyof Pagination, string>;

export type ListResult<T = any> = {
  items: T[];
  total: number;
};

export type UsePaginatedListOptions<TValue, TFilter> = {
  filter?: TFilter;
  paginationToQuery?: Partial<PaginationToQuery>;
  initialItems?: TValue[];
  transformPaginationToQuery?: (pagination: Pagination) => Record<string, any>;
  infinite?: boolean;
  axios?: AxiosInstance;
} & UsePaginationOptions &
  Pick<UseAxiosOptions, 'onSuccess' | 'onError'>;

/**
 *
 * @param requestConfig request config will pass to useAxios
 * @param options
 */
export const usePaginatedList = <
  TValue extends object = object,
  TFilter extends Record<string, any> = UnwrapRef<Record<string, any>>
>(
  requestConfig: AxiosRequestConfig,
  options: UsePaginatedListOptions<TValue, TFilter> = {}
) => {
  const {
    filter = {} as TFilter,
    initialItems = [],
    transformPaginationToQuery = (pagination) => ({
      currentPage: pagination.currentPage.value,
      pageSize: pagination.pageSize.value,
    }),
    infinite = false,
    axios,
    onSuccess,
    onError,
  } = options;

  const __filter = ref(filter);
  const lastAppliedFilter = ref({} as TFilter);

  const pagination = usePagination(options);

  // data fetch
  const getRequestConfig = (config?: AxiosRequestConfig) => {
    const payloadValues: Record<string, any> = {
      ...trimValues(unref(lastAppliedFilter)),
      ...transformPaginationToQuery(pagination),
    };

    const mergedConfig = merge({}, requestConfig, config);
    const method = (mergedConfig?.method ?? 'get').toLowerCase();
    const payload =
      method === 'get' ? { params: payloadValues } : { data: payloadValues };

    return {
      ...mergedConfig,
      ...payload,
    };
  };

  const { data, isLoading, error, errorMessage, execute } = axios
    ? useAxios<ListResult<TValue>>(
        {
          items: [],
          total: 0,
        },
        getRequestConfig(),
        axios,
        {
          immediate: false,
          onSuccess,
          onError,
        }
      )
    : useAxios<ListResult<TValue>>(
        {
          items: [],
          total: 0,
        },
        getRequestConfig(),
        {
          immediate: false,
          onSuccess,
          onError,
        }
      );

  const items = shallowRef<TValue[]>(initialItems);

  watch(data, (value) => {
    if (!value || !value.items || !Array.isArray(value.items)) {
      throw new Error(
        `[fetchList] expects response data to be an object with 'items' and 'total'(optional) as keys, do you forget to define a proper data transformer?`
      );
    }

    if (infinite && !pagination.isFirstPage.value) {
      items.value = items.value.concat(value.items);
    } else {
      items.value = value.items;
    }

    pagination.total.value = value.total || 0;
  });

  const fetchList = (config?: AxiosRequestConfig) => {
    // apply filter first
    lastAppliedFilter.value = cloneDeep(unref(__filter));

    return execute(getRequestConfig(config));
  };

  const fetchListAndReset = (config?: AxiosRequestConfig) => {
    if (pagination.isFirstPage.value) {
      return fetchList(config);
    } else {
      pagination.currentPage.value = 1;
    }
  };

  watch(pagination.currentPage, () => {
    fetchList();
  });
  watch(pagination.pageSize, () => {
    fetchList();
  });

  // for Element Table
  const elementTableProps = computed(() => ({
    items: items.value,
    loading: isLoading.value,
    total: pagination.total.value,
    page: pagination.currentPage.value,
    updatePage: pagination.jumpToPage,
    pageSize: pagination.pageSize.value,
    updatePageSize: (pageSize: number) => {
      pagination.pageSize.value = pageSize;
    },
  }));

  return {
    items,
    isLoading,
    error,
    errorMessage,
    isEmpty: computed(() => !items.value.length),

    pagination,

    fetchList,
    fetchListAndReset,

    filter: __filter,
    lastAppliedFilter: readonly(lastAppliedFilter),

    // for Element Table only
    elementTableProps,
  };
};
