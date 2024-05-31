import type { RuleExpression } from 'vee-validate';

import { useField } from 'vee-validate';
import { computed, toRefs, unref, ref } from 'vue';

export type ValidationMode = 'aggressive' | 'lazy' | 'aggressiveIfInvalid';

export type UseFormFieldOptions<TValue> = {
  name: string;
  label: string;
  mode?: ValidationMode;
  validateOnMount?: boolean;
  bindBlurEvent?: boolean;
  rule?: RuleExpression<TValue>;
};

export const useFormField = <TValue = unknown>(
  options: UseFormFieldOptions<TValue>
) => {
  const {
    name,
    label,
    mode = ref('aggressive'),
    validateOnMount = ref(false),
    bindBlurEvent = ref(false),
    rule,
  } = toRefs(options);

  const { errorMessage, handleChange, ...rest } = useField<TValue>(name, rule, {
    label,
    validateOnValueUpdate: false,
    validateOnMount: unref(validateOnMount),
  });

  const listeners = computed(() => {
    const validationListeners: {
      onBlur?: (e: unknown) => void;
      onChange: (e: unknown) => void;
      'onUpdate:modelValue': (e: unknown) => void;
    } = {
      onChange: handleChange,
      'onUpdate:modelValue': (e) => handleChange(e, false),
    };

    if (bindBlurEvent.value) {
      validationListeners.onBlur = handleChange;
    }

    const currentMode = unref(mode);
    if (
      currentMode === 'aggressive' ||
      (currentMode === 'aggressiveIfInvalid' && errorMessage.value)
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
