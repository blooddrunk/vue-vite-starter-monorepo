import type { FetchResult, UseFetchOptions } from '#app';
import type { KeysOf } from '#app/composables/asyncData';
import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack';
import type { FetchError } from 'ofetch';

import { defu } from 'defu';
import { isPlainObject } from 'lodash-es';

type ErrorHandler = (e: unknown) => void;

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

export function useCustomFetch<
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void
    ? 'get' extends AvailableRouterMethod<ReqT>
      ? 'get'
      : AvailableRouterMethod<ReqT>
    : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = null,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  options: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method> & {
    validateResponse?: boolean;
    alertOnError?: boolean;
    onError?: ErrorHandler;
  } = {
    validateResponse: true,
    alertOnError: true,
  },
) {
  const defaults: UseFetchOptions<
    _ResT,
    DataT,
    PickKeys,
    DefaultT,
    ReqT,
    Method
  > = {
    ignoreResponseError: true,

    // ! how...
    transform: (data: _ResT) => {
      if (isServerResponse<DataT>(data)) {
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

  return useFetch<ResT, ErrorT, ReqT, Method, _ResT, DataT, PickKeys, DefaultT>(
    request,
    params,
  );
}
