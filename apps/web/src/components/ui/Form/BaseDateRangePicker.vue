<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-date-picker
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :editable="false"
        type="daterange"
        :disabled-date="dateLimiter"
        v-bind="slotProps"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="props">
          <slot :name="slotName" v-bind="props"></slot>
        </template>
      </el-date-picker>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { isAfter } from 'date-fns';

withDefaults(defineProps<{ dateLimiter?: (time: Date) => boolean }>(), {
  dateLimiter: (time: Date) => {
    return isAfter(time, new Date());
  },
});
</script>
