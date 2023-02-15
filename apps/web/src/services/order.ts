import { useAxios } from '@/composables/useAxios';
import { CartItem, OrderInfo, OrderItem } from '@/typings';
import { precisionFixed, precisionRound } from '@/utils/math';
import { random, sample } from 'lodash-es';

export const placeOrder = () => {
  const { execute, ...rest } = useAxios<OrderInfo>({} as OrderInfo, {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
    __needValidation: false,
  });
  return {
    ...rest,
    execute: (item: OrderInfo) =>
      execute({
        data: item,
      }),
  };
};

export const useOrderList = () => {
  return useAxios<OrderItem[]>([], {
    url: 'https://jsonplaceholder.typicode.com/posts',
    __needValidation: false,
    __transformData: (data) => {
      return [...Array(10).keys()].map((id) => {
        const items = (data as CartItem[])
          .slice(0, random(1, 3))
          .map((item) => ({
            ...item,
            price: precisionRound(random(1, 500, true)),
            thumbnail: 'http://via.placeholder.com/240x240',
            quantity: random(1, 10),
          }));

        return {
          orderNumber: String(id),
          orderTime: Date.now(),
          orderStatus: sample(['已预约', '已下单', '已办理', '已撤单']),
          quantity: items.reduce((acc, item) => item.quantity + acc, 0),
          totalPrice: precisionFixed(
            items.reduce((acc, item) => item.quantity * item.price + acc, 0)
          ),
          items,
        };
      });
    },
  });
};

export const cancelOrder = () => {
  const { execute, ...rest } = useAxios<OrderItem>({} as OrderItem, {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
    __needValidation: false,
  });
  return {
    ...rest,
    execute: (item: OrderItem) =>
      execute({
        data: item,
      }),
  };
};
