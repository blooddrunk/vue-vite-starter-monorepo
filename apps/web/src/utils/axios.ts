import { ServerResponse } from '@/typings';
import { jsonToUrlParams } from '@/utils/misc';
import type {
  AxiosError,
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
} from 'axios';
import { default as axiosDefault } from 'axios';
import { defaultsDeep, isPlainObject } from 'lodash-es';
import Nprogress from 'nprogress';

declare module 'axios' {
  export interface AxiosRequestConfig {
    __cancellable?: boolean | string;
    __showProgress?: boolean;
    __needValidation?: boolean;
    __urlEncoded?: boolean;
    __transformData?: boolean | ((data: any, response: AxiosResponse) => any);
  }
}

export const defaultDataTransformer = (data: unknown = {}) => data;

// biz logic
export const validateResponse = (response: ServerResponse) => {
  const { errcode = 200, errmsg = '未知错误', ...ret } = response;

  switch (`${errcode}`) {
    case '200':
      return ret;
    default: {
      throw new Error(errmsg);
    }
  }
};

// http status
// const validateStatus = (response: AxiosResponse) => {
//   const { status, data } = response;

//   console.error(`服务异常: ${status}`, data);

//   return data;
// };

export const setupInterceptor = (instance: AxiosInstance) => {
  const onError = (error: AxiosError) => {
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
      config: { __needValidation = true, __transformData = true },
    } = response;

    if (__needValidation) {
      try {
        response.data = validateResponse(response.data as ServerResponse);
      } catch (error) {
        (error as any).config = response.config;
        console.error(error);
        throw error;
      }
    }

    try {
      if (typeof __transformData === 'function') {
        response.data = __transformData(response.data, response);
      } else if (__transformData === true) {
        response.data = defaultDataTransformer(response.data);
      }

      return response;
    } catch (error) {
      (error as any).config = response.config;
      throw error;
    }
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

const axios = axiosDefault.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
});

setupInterceptor(axios);
setupProgress(axios);

export default axios;
