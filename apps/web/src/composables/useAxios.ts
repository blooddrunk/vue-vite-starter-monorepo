/**
 * a modified version of https://vueuse.org/integrations/useAxios/
 */

import type { ComputedRef, Ref, ShallowRef } from 'vue';
import { ref, shallowRef } from 'vue';
import { until } from '@vueuse/core';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import axiosDefault from 'axios';
import { merge } from 'lodash-es';

import axios from '@/utils/axios';

export interface UseAxiosReturn<T, R = AxiosResponse<T>, D = any> {
  /**
   * Axios Response
   */
  response: ShallowRef<R | undefined>;

  /**
   * Axios response data
   */
  data: Ref<T>;

  /**
   * Indicates if the request has finished
   */
  isFinished: Ref<boolean>;

  /**
   * Indicates if the request is currently loading
   */
  isLoading: Ref<boolean>;

  /**
   * Indicates if the request was canceled
   */
  isAborted: Ref<boolean>;

  /**
   * Any errors that may have occurred
   */
  error: ShallowRef<AxiosError<T, D> | undefined>;
  errorMessage: ComputedRef<string | undefined>;

  /**
   * Aborts the current request
   */
  abort: (message?: string | undefined) => void;

  /**
   * isAborted alias
   */
  isCanceled: Ref<boolean>;

  /**
   * Manually call the axios request
   */
  execute: (
    config?: AxiosRequestConfig<D>
  ) => PromiseLike<UseAxiosReturn<T, R, D>>;
}

export interface UseAxiosOptions {
  /**
   * Will automatically run axios request when `useAxios` is used
   *
   */
  immediate?: boolean;
  /**
   * Use shallowRef.
   *
   * @default true
   */
  shallow?: boolean;
}

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  initialData: T,
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions
): UseAxiosReturn<T, R, D> & PromiseLike<UseAxiosReturn<T, R, D>>;
export function useAxios<T = any, R = AxiosResponse<T>>(
  initialData: T,
  instance?: AxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T, R> & PromiseLike<UseAxiosReturn<T, R>>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  initialData: T,
  config: AxiosRequestConfig<D>,
  instance: AxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T, R, D> & PromiseLike<UseAxiosReturn<T, R, D>>;

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  ...args: any[]
): UseAxiosReturn<T, R, D> & PromiseLike<UseAxiosReturn<T, R, D>> {
  const initialData: T = args[0];
  let defaultConfig: AxiosRequestConfig = {};
  let instance: AxiosInstance = axios;

  const isAxiosInstance = (val: any) => !!val?.request;

  if (args.length > 1) {
    if (isAxiosInstance(args[1])) {
      instance = args[1];
    } else {
      defaultConfig = args[1];
    }
  }

  let options: UseAxiosOptions = {
    immediate: !!defaultConfig.url,
    shallow: true,
  };
  if (args.length > 2) {
    options = {
      ...options,
      ...args[args.length - 1],
    };
  }

  if (args.length === 4) {
    instance = args[2];
  }

  const response = shallowRef<R>();
  const data = shallowRef<T>(initialData);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef<AxiosError<T>>();

  const cancelToken: CancelTokenSource = axiosDefault.CancelToken.source();
  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return;

    cancelToken.cancel(message);
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };
  const loading = (loading: boolean) => {
    isLoading.value = loading;
    isFinished.value = !loading;
  };
  const waitUntilFinished = () =>
    new Promise<UseAxiosReturn<T, R, D>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => resolve(result))
        .catch(reject);
    });
  const then: PromiseLike<UseAxiosReturn<T, R, D>>['then'] = (
    onFulfilled,
    onRejected
  ) => waitUntilFinished().then(onFulfilled, onRejected);
  const execute: UseAxiosReturn<T, R, D>['execute'] = async (
    config?: AxiosRequestConfig
  ) => {
    const _config = merge(
      { cancelToken: cancelToken.token },
      defaultConfig,
      config
    );

    loading(true);
    error.value = undefined;
    try {
      const r = await instance.request<T, any>(_config);
      response.value = r;
      data.value = r.data;
    } catch (e: any) {
      error.value = e;
      console.error(error.value);
    } finally {
      loading(false);
    }

    return { then };
  };
  if (options.immediate && defaultConfig.url) {
    execute();
  }

  const result = {
    response,
    data,
    error,
    errorMessage: computed(() => error.value?.message),
    finished: isFinished,
    loading: isLoading,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    canceled: isAborted,
    aborted: isAborted,
    isCanceled: isAborted,
    abort,
    execute,
  } as UseAxiosReturn<T, R, D>;

  return {
    ...result,
    then,
  };
}
