import type { MaybeRef } from './types';

import { isNil, mapKeys, mapValues, omit, pickBy } from 'lodash-es';
import { unref } from 'vue';

export const isNumeric = (num: string | number) =>
  !Number.isNaN(Number.parseFloat(String(num)));

export const isNumericStrict = (num: string | number) =>
  !isNaN(Number(num)) && isNumeric(num);

export type GetPlaceholderForNonValueOption = Partial<{
  fallback: string;
  isValueNumeric: boolean;
}>;
export const getPlaceholderForNonValue = (
  value: MaybeRef<any>,
  {
    fallback = '--',
    isValueNumeric = false,
  }: GetPlaceholderForNonValueOption = {}
): { value: any; hasUsedFallback: boolean } => {
  const unwrappedValue = unref(value);
  const shouldUseFallback = Array.isArray(unwrappedValue)
    ? unwrappedValue.length === 0
    : isValueNumeric
    ? !isNumeric(unwrappedValue)
    : isNil(unwrappedValue);
  if (shouldUseFallback) {
    return {
      value: fallback,
      hasUsedFallback: true,
    };
  }

  return {
    value,
    hasUsedFallback: false,
  };
};

export const jsonToUrlParams = (obj: Record<string, any>) =>
  Object.entries(obj).reduce((params, [key, value]) => {
    params.append(key, value);
    return params;
  }, new URLSearchParams());

export const breakStringBy = (
  str: string,
  {
    breakpoint = 2,
    breakWith = '\n',
  }: {
    breakpoint?: ((input: string) => number) | number;
    breakWith?: string;
  } = {}
) => {
  if (!str) {
    return str;
  }

  let _breakpoint: number;
  if (typeof breakpoint === 'function') {
    _breakpoint = breakpoint(str);
  } else {
    _breakpoint = breakpoint;
  }

  if (_breakpoint <= 0) {
    return str;
  }

  return str.replace(new RegExp(`(.{${_breakpoint}})`, 'g'), `$1${breakWith}`);
};

export const trimValues = (filter: Record<string, any>) =>
  mapValues(filter, (value) => {
    if (value && typeof value === 'string') {
      return value.trim();
    }

    return value;
  });

export const getFileNameOfResource = (path: string) => {
  const matches = path.match(/([^/]+)(?=\.\w+$)/);
  return matches ? matches[0] : '';
};
export const createNamedMapForGlobImport = <M>(modules: Record<string, M>) => {
  const modulesWithFileNameAsKey = mapKeys(modules, (value, key) =>
    getFileNameOfResource(key)
  );

  return pickBy(modulesWithFileNameAsKey, (value, key) => !key.startsWith('_'));
};
export const createNamedEntryForGlobImport = <M>(
  modules: Record<string, M>
) => {
  return Object.entries(createNamedMapForGlobImport(modules));
};

export const flattenTree = <
  T extends Record<string, any> = any,
  C extends keyof T = 'children'
>(
  tree: T[],
  childrenKey: C = 'children' as C
) => {
  const result: (Omit<T, C> & {
    children: Omit<T, C>[];
    isLeaf: boolean;
  })[] = [];

  const traverse = (subTree: T[]) => {
    subTree.forEach((item) => {
      const children = item[childrenKey] as T[];
      const rest = omit(item, [childrenKey]);

      const hasChildren = !!(children && children.length);
      result.push({
        ...rest,
        isLeaf: !hasChildren,
        children: children || [],
      });

      if (hasChildren) {
        traverse(children);
      }
    });
  };

  traverse(tree || []);

  return result;
};
