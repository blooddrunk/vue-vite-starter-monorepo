<template>
  <div class="article">
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      save-button-text="确认提交"
      detail-maxlength="50"
      :validator="handleValidate"
      :is-saving="isLoading"
      @save="handleSubmit"
    >
      <van-field
        :model-value="displayServiceTime"
        readonly
        is-link
        placeholder="上门时间"
        label="上门时间"
        :rules="serviceTimeRule"
        @click="isTimePickerVisible = true"
      ></van-field>
    </van-address-edit>

    <van-popup
      v-model:show="isTimePickerVisible"
      position="bottom"
      close-on-popstate
    >
      <van-picker-group
        title="上门时间"
        :tabs="['选择日期', '选择时间']"
        @confirm="handleServiceTimeChange"
        @cancel="isTimePickerVisible = false"
      >
        <van-date-picker v-model="currentDate" :min-date="minDate" />
        <van-time-picker
          v-model="currentTime"
          :columns-type="['hour', 'minute', 'second']"
        />
      </van-picker-group>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import type { AddressEditInfo, PickerConfirmEventParams } from 'vant';

import { areaList } from '@vant/area-data';
import { addDays, format } from 'date-fns';
import { showFailToast, showSuccessToast } from 'vant';
import { useRouter } from 'vue-router';

import { CustomizationRequest } from '@/typings';

definePage({
  meta: {
    layout: 'navbar',
    title: '全屋智能定制',
    canNavBack: true,
  },
});

const router = useRouter();

const handleValidate = (name: string, value: string) => {
  if (name === 'name' && value && value.length > 10) {
    return '姓名不能超过10个字符';
  }
  return '';
};

const serviceTime = ref<Date>();
const displayServiceTime = computed(() =>
  serviceTime.value ? format(serviceTime.value, 'yyyy-MM-dd HH:mm:ss') : ''
);
const serviceTimeRule = [
  {
    required: true,
    message: '请选择上门时间',
  },
];
const isTimePickerVisible = ref(false);
const minDate = addDays(new Date(), 1);
const currentDate = ref([]);
const currentTime = ref([]);

const handleServiceTimeChange = (value: PickerConfirmEventParams[]) => {
  serviceTime.value = new Date(
    +value[0].selectedValues[0],
    +value[0].selectedValues[1] - 1,
    +value[0].selectedValues[2],
    +value[1].selectedValues[0],
    +value[1].selectedValues[1],
    +value[1].selectedValues[2]
  );
  isTimePickerVisible.value = false;
};

const { isLoading, execute } = makeAppointment();
const handleSubmit = async (content: AddressEditInfo) => {
  const payload: CustomizationRequest = {
    contactPerson: content.name,
    servicePhone: content.tel,
    address: `${content.province} ${content.country} ${content.county} ${content.addressDetail}`,
  };
  const { errorMessage } = await execute(payload);
  if (errorMessage.value) {
    showFailToast(errorMessage.value);
  } else {
    showSuccessToast({
      message: '预约成功!',
      onClose: () => {
        router.push('/mobile/user');
      },
    });
  }
};
</script>
