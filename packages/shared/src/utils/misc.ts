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
