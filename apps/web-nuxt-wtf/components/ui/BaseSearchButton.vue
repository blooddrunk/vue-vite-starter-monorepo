<template>
  <el-button v-bind="$attrs" type="primary" native-type="submit">
    <Icon name="mdi:magnify"></Icon>
    {{ text }}
  </el-button>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
type Props = {
  text?: string;
};

withDefaults(defineProps<Props>(), {
  text: '查询',
});
</script>
