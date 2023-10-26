import type { UseFetchOptions } from 'nuxt/app';

import { defu } from 'defu';
import { isPlainObject } from 'lodash-es';

type ErrorHandler = (e: unknown) => void;

export type UseCustomFetchOptions<T> = UseFetchOptions<T> & {
  validateResponse?: boolean;
  alertOnError?: boolean;
  onError?: ErrorHandler;
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

const defaultErrorHandler = (error: Error) => {
  console.error(error);
  alert(error.message || '出错了');
};

// ? see https://github.com/nuxt/nuxt/issues/14936
// ? and https://github.com/nuxt/nuxt/issues/14736

export function useCustomFetch<T>(
  url: string,
  options: UseCustomFetchOptions<T> = {
    validateResponse: true,
    alertOnError: true,
  }
) {
  const defaults: UseCustomFetchOptions<T> = {
    ignoreResponseError: true,

    transform: (data) => {
      if (isServerResponse<T>(data)) {
        return data.data;
      }
      return data;
    },

    onRequestError({ error }) {
      if (options.onError) {
        options.onError?.(error);
      } else if (options.alertOnError) {
        defaultErrorHandler(error);
      }
    },

    onResponse({ response }) {
      if (options.validateResponse && isServerResponse(response._data)) {
        const { code = 200, message = '未知错误', ...rest } = response._data;
        switch (`${code}`) {
          case '200':
            response._data = rest;
            break;
          default: {
            throw new Error(message);
          }
        }
      }
    },

    onResponseError(_ctx) {
      const error = new Error(_ctx.response.statusText);
      if (options.onError) {
        options.onError?.(error);
      } else if (options.alertOnError) {
        defaultErrorHandler(error);
      }
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
