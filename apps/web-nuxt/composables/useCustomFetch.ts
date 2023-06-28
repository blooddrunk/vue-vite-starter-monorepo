import type { UseFetchOptions } from 'nuxt/app';

import { defu } from 'defu';
import { isPlainObject } from 'lodash-es';

type ErrorHandler = UseFetchOptions<any>['onRequestError'];

export type UseCustomFetchOptions<T> = UseFetchOptions<T> & {
  alertOnError?: boolean;
  onError: ErrorHandler;
};

export type ServerResponse<T = any> = {
  code: string;
  message: string;
  data: T;
  [key: string]: any;
};

const isServerResponse = <T>(r: any): r is ServerResponse<T> => {
  return isPlainObject(r) && 'code' in r && 'message' in r;
};

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const defaults: UseFetchOptions<T> = {
    ignoreResponseError: true,

    transform: (data) => {
      if (isServerResponse<T>(data)) {
        return data.data;
      }
      return data;
    },

    onResponse(_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data);
    },

    onResponseError(_ctx) {
      // throw new myBusinessError()
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
