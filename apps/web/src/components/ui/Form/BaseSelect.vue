<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-select-v2 v-bind="slotProps">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-select-v2>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>
