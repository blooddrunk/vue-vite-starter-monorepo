<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-checkbox-group v-bind="slotProps">
        <el-checkbox-button
          v-for="item in props.items"
          :key="item.value"
          v-bind="item"
        ></el-checkbox-button>
      </el-checkbox-group>
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

const props = defineProps<Props>();
</script>
