import { usePaginatedList as _usePaginatedList } from '@jn/shared';

import { axios } from './useAxios';

export const usePaginatedList: typeof _usePaginatedList = (
  requestConfig,
  options
) =>
  _usePaginatedList(requestConfig, {
    ...options,
    axios,
  });
