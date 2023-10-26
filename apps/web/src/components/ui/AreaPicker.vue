<template>
  <div>
    <a
      :class="buttonClass"
      class="max-w-40 inline-flex items-center px-3 py-1.5 shadow shadow-primary rounded bg-white"
      @click.prevent="togglePickerVisible()"
    >
      <span class="truncate">{{ displayValue }}</span>
      <IconMdiChevronRight class="ml-2"></IconMdiChevronRight>
    </a>

    <van-popup
      v-model:show="isPickerVisible"
      position="bottom"
      close-on-popstate
      :lazy-render="false"
    >
      <van-area
        ref="areaPicker"
        :model-value="value"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      ></van-area>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { last } from 'lodash-es';

import { areaList } from '@vant/area-data';
import type { AreaInstance, PickerOption } from 'vant';

type Props = {
  modelValue?: string;
  placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '310000',
  placeholder: '省/市/区',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const value = toRef(props, 'modelValue');
const isPickerVisible = ref(false);
const togglePickerVisible = useToggle(isPickerVisible);
const selectedAreaList = ref<PickerOption[]>([]);
const isEmpty = computed(() => !selectedAreaList.value.length);
('');
const displayValue = computed(() =>
  isEmpty.value
    ? props.placeholder
    : selectedAreaList.value
        .map((item) => item.text)
        .filter((name) => !!name)
        .join('/')
);
const buttonClass = computed(() =>
  isEmpty.value ? 'text-medium' : 'text-primary'
);

const areaPicker = ref<AreaInstance>();

const handleCancel = () => {
  togglePickerVisible(false);
};

const normalizeAreaItems = (items: PickerOption[]) =>
  items.filter((item) => !!item).filter((item) => item.value !== '000000');
const getValue = (items: PickerOption[]) => {
  const lastItem = last(items);
  if (lastItem) {
    return lastItem.value === '00000' ? '' : (lastItem.value as string);
  }
  return '';
};
const handleConfirm = ({
  selectedOptions,
}: {
  selectedOptions: PickerOption[];
}) => {
  selectedAreaList.value = normalizeAreaItems(selectedOptions);
  emit('update:modelValue', getValue(selectedAreaList.value));
  togglePickerVisible(false);
};
</script>
