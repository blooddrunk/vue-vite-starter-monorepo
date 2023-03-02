import {
  getPlaceholderForNonValue,
  GetPlaceholderForNonValueOption,
} from './misc';

export const now = () => Date.now();
export const timestamp = () => +Date.now();

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const toNumber = (val: any): any => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

export const precisionRound = (number: number | string, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(Number.parseFloat(String(number)) * factor) / factor;
};

export const precisionFixed = (number: number | string, precision = 2) => {
  const result = precisionRound(number, precision);
  return result.toFixed(precision);
};

/**
 * stolen from vuetify
 * https://github.com/vuetifyjs/vuetify/blob/v3.0.5/packages/vuetify/src/util/helpers.ts
 */
export function convertToUnit(str: number, unit?: string): string;
export function convertToUnit(
  str: string | number | null | undefined,
  unit?: string
): string | undefined;
export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str!)) {
    return String(str);
  } else if (!isFinite(+str!)) {
    return undefined;
  } else {
    return `${Number(str)}${unit}`;
  }
}

export type ToPercentageOption = Partial<{
  precision: number;
  multiplier: 1 | 100;
  symbol: string;
}> &
  GetPlaceholderForNonValueOption;
export const toPercentage = (
  number: number | string,
  { precision = 2, multiplier = 1, symbol = '%', ...rest } = {}
) => {
  const { value, hasUsedFallback } = getPlaceholderForNonValue(number, {
    isValueNumeric: true,
    ...rest,
  });

  if (hasUsedFallback) {
    return value;
  }

  return `${precisionRound(value * multiplier, precision)}${symbol || ''}`;
};

export type ToDisplayStringOption = Partial<{
  precision?: number;
  fixed?: boolean;
}> &
  GetPlaceholderForNonValueOption;
export const toDisplayString = (
  number?: number | string,
  { precision = 2, fixed = false, ...rest }: ToDisplayStringOption = {}
) => {
  const { value, hasUsedFallback } = getPlaceholderForNonValue(number, {
    isValueNumeric: true,
    ...rest,
  });
  return hasUsedFallback
    ? value
    : new Intl.NumberFormat('en-US', {
        minimumFractionDigits: fixed ? precision : 0,
        maximumFractionDigits: precision,
      }).format(Number(value));
};

// * notation option of Intl.NumberFormat is not supported in Safari & IE
export type ToCompactDisplayStringOption = Partial<{
  breakpoints: [number, string][];
  withSuffix: boolean;
  precision: number;
}> &
  GetPlaceholderForNonValueOption;
export const toCompactDisplayString = (
  number?: number | string,
  {
    breakpoints = [
      [10_000, '万'],
      [100_000_000, '亿'],
    ],
    withSuffix = true,
    precision,
    ...rest
  }: ToCompactDisplayStringOption = {}
) => {
  const { value, hasUsedFallback } = getPlaceholderForNonValue(number, {
    isValueNumeric: true,
    ...rest,
  });

  if (hasUsedFallback) {
    return value;
  }

  const num = Number.parseFloat(String(value));
  const hitBreakpoint = breakpoints
    .slice()
    .reverse()
    .find((breakpoint) => {
      const breakpointConfig = Array.isArray(breakpoint)
        ? breakpoint
        : [breakpoint];
      const [breakValue] = breakpointConfig;
      return Math.abs(num) >= breakValue;
    });

  if (hitBreakpoint) {
    const [breakValue, valueSuffix] = hitBreakpoint;

    return `${precisionRound(num / breakValue, precision)}${
      withSuffix && valueSuffix ? valueSuffix : ''
    }`;
  }

  return num;
};
