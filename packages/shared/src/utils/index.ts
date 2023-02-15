export * from './types';
export * from './math';
export * from './misc';

export const promiseTimeout = (
  ms: number,
  throwOnTimeout = false,
  reason = 'Timeout'
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms);
    else setTimeout(resolve, ms);
  });

export const isNumeric = (num: string | number) =>
  !Number.isNaN(Number.parseFloat(String(num)));
export const isNumericStrict = (num: string | number) =>
  !isNaN(Number(num)) && isNumeric(num);

export const isPromise = (promise: any) =>
  !!promise && typeof promise.then === 'function';
