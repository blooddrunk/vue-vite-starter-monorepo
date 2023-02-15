<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-checkbox v-bind="slotProps">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-checkbox>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>
