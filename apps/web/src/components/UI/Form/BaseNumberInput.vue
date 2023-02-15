<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="{ modelValue, ...props }">
      <el-input-number :model-value="toNumber(modelValue)" v-bind="props">
        <template v-for="(index, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-input-number>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { toNumber } from '@/utils/math';
</script>
