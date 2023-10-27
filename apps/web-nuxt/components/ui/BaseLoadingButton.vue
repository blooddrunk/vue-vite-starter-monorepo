<template>
  <el-button
    class="!px-1.5"
    :loading="isLoading"
    :disabled="isLoading"
    :type="type"
    :link="link"
    :size="size"
    v-bind="$attrs"
    @click="handleButtonClick"
  >
    <slot v-if="isLoading && hasLoadingSlot" name="loading"> </slot>
    <slot v-else></slot>
  </el-button>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import type { ButtonType, ComponentSize } from 'element-plus';

import { ElMessageBox } from 'element-plus';

const slots = useSlots();
const hasLoadingSlot = computed(() => !!slots.loading);

type Props = {
  action: () => Promise<void>;
  confirmText?: string;
  size?: ComponentSize;
  type?: ButtonType;
  link?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  confirmText: '',
  size: 'default',
  type: 'primary',
  link: true,
});

const { isLoading, execute } = useAsyncState<any>(props.action, null, {
  immediate: false,
});
const handleButtonClick = async () => {
  if (props.confirmText) {
    try {
      await ElMessageBox.confirm(props.confirmText, '提示', {
        type: 'warning',
      });

      execute();
    } catch (error) {
      // cancel
    }
  } else {
    execute();
  }
};
</script>
