<template>
  <el-button v-bind="$attrs" type="info" native-type="reset" plain>
    <Icon name="mdi:arrow-u-left-top"></Icon>
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
  text: '重置',
});
</script>
