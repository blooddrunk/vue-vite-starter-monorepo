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
      <van-datetime-picker
        type="datehour"
        v-bind="timePickerOptions"
        @confirm="handleServiceTimeChange"
        @cancel="isTimePickerVisible = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { CustomizationRequest } from '@/typings';
import { areaList } from '@vant/area-data';
import { format } from 'date-fns';
import { showFailToast, showSuccessToast } from 'vant';
import type { AddressEditInfo } from 'vant';
import { useRouter } from 'vue-router';

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
const timePickerOptions = {
  minDate: new Date(),
  formatter: (type: string, value: string) =>
    type === 'year'
      ? `${value}年`
      : type === 'month'
      ? `${value}月`
      : type === 'day'
      ? `${value}日`
      : type === 'hour'
      ? `${value}时`
      : value,
};
const handleServiceTimeChange = (value: Date) => {
  serviceTime.value = value;
  isTimePickerVisible.value = false;
};

const { isLoading, execute } = makeAppointment();
const handleSubmit = async (content: AddressEditInfo) => {
  const payload: CustomizationRequest = {
    contactPerson: content.name,
    servicePhone: content.tel,
    address: `${content.province} ${content.country} ${content.county} ${content.addressDetail}`,
  };
  const { error } = await execute(payload);
  if (error.value) {
    showFailToast(error.value.message);
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
