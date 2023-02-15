<template>
  <article class="article article_has-footer">
    <van-empty
      v-if="shouldShowEmptyPlaceholder"
      image="error"
      description="出错了"
    ></van-empty>

    <template v-else>
      <CartList
        :items="currentOrderItem?.items ?? []"
        :loading="order.isItemsLoading"
        readonly
      ></CartList>

      <van-cell-group class="!mt-6 !mx-0" inset>
        <van-cell title="商品金额">
          <span>
            ￥
            <strong class="font-semibold">
              {{
                getPlaceholderForNonValue(currentOrderItem?.totalPrice).value
              }}
            </strong>
          </span>
        </van-cell>
        <van-cell title="配送+安装费">
          <span>
            ￥
            <strong class="font-semibold"> -- </strong>
          </span>
        </van-cell>
        <van-cell title="实付">
          <span>
            ￥
            <strong class="font-bold">
              {{
                getPlaceholderForNonValue(currentOrderItem?.totalPrice).value
              }}
            </strong>
          </span>
        </van-cell>
      </van-cell-group>

      <div class="mt-3">
        <header>
          <h3 class="p-2 text-sm font-bold">订单信息</h3>
        </header>
        <van-cell-group class="!mx-0" inset>
          <van-cell title="服务地址">
            {{ getPlaceholderForNonValue(currentOrderItem?.address).value }}
          </van-cell>
          <van-cell title="订单编号">
            {{ getPlaceholderForNonValue(currentOrderItem?.orderNumber).value }}
          </van-cell>
          <van-cell title="CRM订单号">
            {{ getPlaceholderForNonValue(currentOrderItem?.crmNumber).value }}
          </van-cell>
          <van-cell title="下单时间">
            {{ getPlaceholderForNonValue(currentOrderItem?.orderTime).value }}
          </van-cell>
          <van-cell title="上门时间">
            {{ getPlaceholderForNonValue(currentOrderItem?.serviceTime).value }}
          </van-cell>
          <van-cell title="撤单原因">
            {{
              getPlaceholderForNonValue(currentOrderItem?.cancelReason).value
            }}
          </van-cell>
          <van-cell title="订单备注">
            {{ getPlaceholderForNonValue(currentOrderItem?.remarks).value }}
          </van-cell>
        </van-cell-group>
      </div>
    </template>

    <PageFooter class="justify-end">
      <van-button
        class="w-20"
        type="danger"
        plain
        round
        size="small"
        :loading="isCancelPending"
        @click="isCancelActionSheetVisible = true"
      >
        撤单
      </van-button>
    </PageFooter>

    <van-action-sheet
      v-if="currentOrderItem"
      v-model:show="isCancelActionSheetVisible"
      description="申请撤单"
      :actions="cancelReasonList"
      close-on-click-action
      @select="handleCancel"
    ></van-action-sheet>
  </article>
</template>

<script lang="ts" setup>
import { showToast, showFailToast, showConfirmDialog } from 'vant';
import type { ActionSheetAction } from 'vant';

import { getPlaceholderForNonValue } from '@/utils/misc';

definePage({
  meta: {
    layout: 'navbar',
    title: '订单详情',
    canNavBack: true,
  },
});

const props = defineProps<{
  id: string;
}>();

const order = useOrderStore();
if (order.isItemsEmpty) {
  order.getItems();
}

const currentOrderItem = computed(() =>
  order.items.find((item) => item.orderNumber === props.id)
);

const shouldShowEmptyPlaceholder = computed(
  () => !currentOrderItem.value && !order.isItemsLoading
);

const { isLoading: isCancelPending, execute: onOrderCancel } = cancelOrder();

const currentCancelReasonIndex = ref(-1);
const cancelReasonList = computed<ActionSheetAction[]>(() =>
  [
    { name: '信息填写错误' },
    { name: '不想要了' },
    { name: '商品错选/多选' },
  ].map((item, index) => {
    if (index === currentCancelReasonIndex.value) {
      return {
        ...item,
        loading: isCancelPending.value,
      };
    }
    return item;
  })
);
const isCancelActionSheetVisible = ref(false);
// const toggleActionStateByIndex = (targetIndex: number, loading?: boolean) => {
//   cancelReasonList.value = cancelReasonList.value.map((item, index) => {
//     if (targetIndex === index) {
//       return {
//         ...item,
//         loading: typeof loading === 'undefined' ? !item.loading : loading,
//       };
//     }
//     return item;
//   });
// };

const handleCancel = async (action: ActionSheetAction, index: number) => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '是否确认撤单？',
    });

    currentCancelReasonIndex.value = index;

    const { error } = await onOrderCancel(currentOrderItem.value!);
    if (error.value) {
      showFailToast(error.value.message);
    } else {
      showToast('撤单成功');
    }
  } catch (error) {
    // * user cancel, do nothing
  }
};
</script>
