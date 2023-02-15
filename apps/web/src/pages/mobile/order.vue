<template>
  <article class="article article_has-footer">
    <van-empty
      v-if="isItemsEmpty"
      image="error"
      description="出错了"
    ></van-empty>
    <CartList
      v-else
      :items="items"
      :loading="product.isItemsLoading"
      readonly
    ></CartList>

    <van-cell-group class="!mx-0 !mt-6" inset>
      <van-field
        v-model="remarks"
        label="订单备注"
        maxlength="30"
        placeholder="请填写备注信息（30字以内）"
      ></van-field>

      <van-cell title="商品金额">
        <span>
          ￥
          <strong class="font-semibold">
            {{ totalPrice }}
          </strong>
        </span>
      </van-cell>
      <van-cell title="配送+安装费">
        <span>
          ￥
          <strong class="font-semibold"> -- </strong>
        </span>
      </van-cell>
    </van-cell-group>

    <van-checkbox
      v-model="isServiceAgreementChecked"
      class="mt-6 justify-center text-xs"
      icon-size="16px"
    >
      我已认真阅读并同意
      <router-link class="text-primary" to="/mobile/service-agreement">
        《服务协议》
      </router-link>
    </van-checkbox>

    <PageFooter>
      <span>
        合计： ￥
        <strong class="font-semibold">
          {{ totalPrice }}
        </strong>
      </span>

      <router-link v-slot="{ navigate }" custom to="/mobile/address">
        <van-button
          class="!ml-auto"
          type="primary"
          round
          :disabled="!isServiceAgreementChecked"
          @click="navigate"
        >
          订单提交
        </van-button>
      </router-link>
    </PageFooter>
  </article>
</template>

<script lang="ts" setup>
import { CartItem } from '@/typings';
import { useRouteQuery } from '@vueuse/router';
import { computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

definePage({
  meta: {
    layout: 'navbar',
    title: '订单提交',
    canNavBack: true,
  },
});

const directOrderId = useRouteQuery('productId');

const product = useProductStore();
const cart = useCartStore();
const order = useOrderStore();

if (product.isItemsEmpty) {
  product.getItems();
}

const directOrderTarget = computed(() => {
  if (directOrderId.value) {
    return product.items.find(
      (item) => String(item.id) === directOrderId.value
    );
  }
  return null;
});
const items = computed<CartItem[]>(() => {
  if (directOrderTarget.value) {
    return [
      {
        ...directOrderTarget.value,
        quantity: 1,
      },
    ];
  } else {
    return cart.checkedItems;
  }
});
const isItemsEmpty = computed(
  () => !items.value.length && !product.isItemsEmpty
);
const totalPrice = computed(() => {
  if (directOrderTarget.value) {
    return directOrderTarget.value.price;
  } else {
    return cart.checkedTotalPrice;
  }
});

const remarks = ref(cart.stagedOrderInfo.remarks ?? '');
const isServiceAgreementChecked = ref(
  cart.stagedOrderInfo.isServiceAgreementChecked ?? false
);

order.clearOrderInfo();

onBeforeRouteLeave((to) => {
  if (
    ['mobile-service-agreement', 'mobile-address'].includes(to.name as string)
  ) {
    cart.$patch((state) => {
      state.stagedOrderInfo.remarks = remarks.value;
      state.stagedOrderInfo.isServiceAgreementChecked =
        isServiceAgreementChecked.value;
    });

    if ('mobile-address' === (to.name as string)) {
      order.updateOrderInfo({
        items: items.value,
      });
    }
  } else {
    cart.$patch((state) => {
      state.stagedOrderInfo.remarks = '';
      state.stagedOrderInfo.isServiceAgreementChecked = false;
    });
  }
});
</script>
