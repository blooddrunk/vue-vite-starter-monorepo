import type {
  AxiosError,
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

import { default as axiosDefault } from 'axios';
import { defaultsDeep, isPlainObject } from 'lodash-es';
import Nprogress from 'nprogress';

import { jsonToUrlParams } from './misc';

declare module 'axios' {
  export interface AxiosRequestConfig {
    __showProgress?: boolean;
    __urlEncoded?: boolean;
    __validateResponse?:
      | false
      | ((data: unknown, response: AxiosResponse) => any);
    __transformData?: false | ((data: any, response: AxiosResponse) => any);
  }
}

// http status
// const validateStatus = (response: AxiosResponse) => {
//   const { status, data } = response;

//   console.error(`服务异常: ${status}`, data);

//   return data;
// };

export const setupInterceptor = (instance: AxiosInstance) => {
  const onError = (error: AxiosError) => {
    // * see https://axios-http.com/docs/handling_errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // const handled = validateStatus(error.response);
      // if (typeof handled === 'string') {
      //   error.message = handled;
      // }
    }

    return Promise.reject(error);
  };

  instance.interceptors.request.use(({ __urlEncoded, ...config }) => {
    const presetConfig: AxiosRequestConfig = { method: 'GET' };

    if (__urlEncoded) {
      presetConfig.headers!['content-type'] =
        'application/x-www-form-urlencoded';
      if (isPlainObject(config.data)) {
        config.data = jsonToUrlParams(config.data);
      }
    }

    config = defaultsDeep(config, presetConfig);

    return config;
  }, onError);

  instance.interceptors.response.use((response) => {
    const {
      config: { __validateResponse, __transformData },
    } = response;

    try {
      if (typeof __validateResponse === 'function') {
        response.data = __validateResponse(response.data, response);
      }

      if (typeof __transformData === 'function') {
        response.data = __transformData(response.data, response);
      }
    } catch (error) {
      (error as any).config = response.config;
      console.error(error);
      throw error;
    }

    return response;
  }, onError);
};

export const setupProgress = (instance: AxiosInstance) => {
  let pendingRequests = 0;
  let showProgress: boolean | undefined = true;

  const onError = (error: AxiosError) => {
    if (showProgress === false) {
      return;
    }

    pendingRequests--;

    if (pendingRequests <= 0) {
      pendingRequests = 0;

      Nprogress.done();
    }

    return Promise.reject(error);
  };

  instance.interceptors.request.use((config) => {
    showProgress = config.__showProgress;

    if (showProgress !== false) {
      if (pendingRequests === 0) {
        Nprogress.start();
      }

      pendingRequests++;
    }

    return config;
  }, onError);

  instance.interceptors.response.use((response) => {
    if (showProgress !== false) {
      pendingRequests--;
      if (pendingRequests <= 0) {
        pendingRequests = 0;

        Nprogress.done();
      }
    }

    return response;
  }, onError);

  const onProgress = (event: AxiosProgressEvent) => {
    if (!pendingRequests) {
      return;
    }

    const progress = event.loaded / (event.total ?? 0 * pendingRequests) || 0;
    Nprogress.set(Math.min(1, progress));
  };

  instance.defaults.onUploadProgress = onProgress;
  instance.defaults.onDownloadProgress = onProgress;
};

export const createAxios = (config: CreateAxiosDefaults) => {
  const axios = axiosDefault.create(
    defaultsDeep(
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
        },
      },
      config
    )
  );

  setupInterceptor(axios);
  setupProgress(axios);

  return axios;
};
