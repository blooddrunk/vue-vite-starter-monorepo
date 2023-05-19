<template>
  <div class="article">
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      save-button-text="确认提交"
      detail-maxlength="50"
      detail-rows="2"
      :validator="handleValidate"
      :is-saving="isLoading"
      @save="handleSubmit"
    >
    </van-address-edit>
  </div>
</template>

<script lang="ts" setup>
import { areaList } from '@vant/area-data';
import { showFailToast, showSuccessToast } from 'vant';

import type { AddressEditInfo } from 'vant';

definePage({
  meta: {
    layout: 'navbar',
    breadcrumb: {
      title: '服务地址填写',
    },
    canNavBack: true,
  },
});

const router = useRouter();
const order = useOrderStore();

const handleValidate = (name: string, value: string) => {
  if (name === 'name' && value && value.length > 10) {
    return '姓名不能超过10个字符';
  }
  return '';
};

const { isLoading, execute } = placeOrder();
const handleSubmit = async (content: AddressEditInfo) => {
  order.updateOrderInfo({
    contactPerson: content.name,
    servicePhone: content.tel,
    address: `${content.province} ${content.country} ${content.county} ${content.addressDetail}`,
  });
  const { error } = await execute(order.orderInfo);
  if (error.value) {
    showFailToast(error.value.message);
  } else {
    showSuccessToast({
      message: '下单成功!',
      onClose: () => {
        router.push('/mobile/user');
      },
    });
  }
};
</script>
