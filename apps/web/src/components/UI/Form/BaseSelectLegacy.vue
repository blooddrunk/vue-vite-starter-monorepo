<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-select v-bind="slotProps">
        <el-option
          v-for="item in items"
          :key="item.value"
          v-bind="item"
        ></el-option>
      </el-select>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import type { CommonSelectOption } from '@/typings';

type Props = {
  items: CommonSelectOption[];
};

defineProps<Props>();
</script>
