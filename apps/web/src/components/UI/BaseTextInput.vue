<template>
  <div
    :class="[
      $style.input,
      wrapperClass,
      showValidationError && 'relative mb-4',
    ]"
  >
    <div
      :class="{
        [$style.control]: true,
        [$style.controlActive]: isFocused,
      }"
    >
      <label
        v-if="showLabel && hasLabel"
        :class="{ [$style.labelActive]: isLabelActive }"
        :for="name"
        @click="input!.focus()"
        @touchstart.stop="input!.focus()"
      >
        <slot name="label">
          <span>{{ label }}</span>
        </slot>
      </label>

      <input
        :id="name"
        ref="input"
        :value="value"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
      />

      <div v-if="$slots.append" class="ml-auto pl-1 flex-shrink-0">
        <slot name="append"></slot>
      </div>
    </div>

    <p
      v-if="showValidationError && errorMessage"
      class="absolute top-full left-0"
    >
      <span class="px-2 text-xs text-red-500 font-medium leading-none">
        <slot name="error" :error="errorMessage">
          {{ errorMessage }}
        </slot>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
type Props = {
  name: string;
  label?: string;
  showLabel?: boolean;
  placeholder?: string;
  showValidationError?: boolean;
  wrapperClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  label: '',
  showLabel: false,
  placeholder: '',
  showValidationError: true,
  wrapperClass: undefined,
});

const emit = defineEmits<{
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'input', value: string): string;
  (e: 'change', value: string): string;
}>();

// tempalte ref
const input = ref<HTMLInputElement | null>(null);
const slots = useSlots();
const hasLabel = computed(() => !!(slots.label || props.label));

const { listeners, errorMessage, value, meta } = useFormField<string>({
  name: props.name,
  label: props.label,
});

const isFocused = ref(false);
const handleFocus = () => {
  isFocused.value = true;
  emit('focus');
};
const handleBlur = (e: FocusEvent) => {
  listeners.value.onBlur!(e);
  isFocused.value = false;
  emit('blur');
};
const handleInput = (e: Event) => {
  listeners.value['onUpdate:modelValue'](e);
  emit('input', (e.target as HTMLInputElement).value);
};
const handleChange = (e: Event) => {
  listeners.value.onChange(e);
  emit('change', (e.target as HTMLInputElement).value);
};

const isLabelActive = computed(
  () => isFocused.value || (meta.dirty && value.value) || props.placeholder
);
</script>

<style lang="postcss" module>
.input {
  @apply max-w-full pt-5;

  & .control {
    @apply relative flex flex-grow items-center mb-1;

    &:hover {
      @apply border-primary;
    }

    &::before,
    &::after {
      content: '';
      @apply absolute inset-x-0 bottom-0;
      @apply transition duration-300 ease-out;
    }

    &::before {
      @apply border-b border-inherit;
    }

    &::after {
      @apply border-b-2 border-inherit;
      @apply transform scale-0;
    }
  }

  & .controlActive {
    &::after {
      @apply transform scale-100;
    }
  }

  & label {
    @apply absolute left-0;
    @apply h-6 ml-2;
    @apply transition origin-top-left duration-500 ease-in-out;
    @apply leading-6 text-primary;
  }

  & .labelActive {
    @apply translate-y-[-1.5rem] scale-75;
  }

  & input {
    @apply flex-grow;
    @apply w-full p-2;
    @apply appearance-none bg-transparent leading-normal;

    &::placeholder {
      @apply text-medium;
    }

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
