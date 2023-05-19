import type { UseAxiosOptions } from '@jn/shared';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useAxios as _useAxios, createAxios } from '@jn/shared';
import { isPlainObject } from 'lodash-es';
import { showFailToast } from 'vant';

export type ServerResponse<D = any> = {
  code: string;
  message: string;
  data: D;
  [key: string]: any;
};

const isServerResponse = (r: any): r is ServerResponse => {
  return isPlainObject(r) && 'code' in r && 'message' in r;
};

export const axios = createAxios({
  __validateResponse: (data) => {
    if (isServerResponse(data)) {
      const { code = 200, message = '未知错误', ...rest } = data;

      switch (`${code}`) {
        case '200':
          return rest;
        default: {
          throw new Error(message);
        }
      }
    }

    return data;
  },

  __transformData: (data) => data && data.data,
});

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  initialData: T,
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions & {
    alertOnError?: boolean;
  }
) {
  const alertOnError = !!options?.alertOnError;
  if (alertOnError && !options?.onError) {
    options.onError = (e: any) => {
      showFailToast(e.message || '出错了');
    };
  }
  if (config) {
    return _useAxios<T, R, D>(initialData, config, axios, options);
  } else {
    return _useAxios<T, R>(initialData, axios, options);
  }
}
