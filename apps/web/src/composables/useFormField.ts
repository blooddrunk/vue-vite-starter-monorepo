import { MaybeRef } from '@/typings';
import { type RuleExpression, useField } from 'vee-validate';
import { computed, unref } from 'vue';

export type ValidationMode = 'aggressive' | 'lazy' | 'aggressiveIfInvalid';

export type UseFormFieldOption<TValue> = {
  name: MaybeRef<string>;
  label: MaybeRef<string>;
  mode?: MaybeRef<ValidationMode>;
  validateOnMount?: boolean;
  bindBlurEvent?: boolean;
  rule?: MaybeRef<RuleExpression<TValue>>;
};

export const useFormField = <TValue = unknown>({
  name,
  label,
  mode = 'aggressiveIfInvalid',
  validateOnMount = false,
  bindBlurEvent = true,
  rule,
}: UseFormFieldOption<TValue>) => {
  const { errorMessage, handleChange, ...rest } = useField<TValue>(
    unref(name),
    rule,
    {
      label,
      validateOnValueUpdate: false,
      validateOnMount,
    }
  );

  const listeners = computed(() => {
    const validationListeners: {
      onBlur?: (e: unknown) => void;
      onChange: (e: unknown) => void;
      'onUpdate:modelValue': (e: unknown) => void;
    } = {
      onChange: handleChange,
      'onUpdate:modelValue': (e) => handleChange(e, false),
    };

    if (bindBlurEvent) {
      validationListeners.onBlur = handleChange;
    }

    if (
      mode === 'aggressive' ||
      (mode === 'aggressiveIfInvalid' && errorMessage.value)
    ) {
      validationListeners['onUpdate:modelValue'] = handleChange;
    }

    return validationListeners;
  });

  return {
    /** original useForm return */
    errorMessage,
    handleChange,
    ...rest,

    listeners,
  };
};
