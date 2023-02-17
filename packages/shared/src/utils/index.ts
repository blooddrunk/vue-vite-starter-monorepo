export * from './types';
export * from './math';
export * from './misc';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const promiseTimeout = (
  ms: number,
  throwOnTimeout = false,
  reason = 'Timeout'
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms);
    else setTimeout(resolve, ms);
  });

export const isPromise = (promise: any) =>
  !!promise && typeof promise.then === 'function';
