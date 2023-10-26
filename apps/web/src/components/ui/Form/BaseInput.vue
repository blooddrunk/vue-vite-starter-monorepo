<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-input v-bind="slotProps">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-input>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>
