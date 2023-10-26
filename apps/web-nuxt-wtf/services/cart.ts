import { precisionRound } from '@jn/shared';
import { random } from 'lodash-es';

import { CartItem } from '@/typings';

export const useCartList = () => {
  return useAxios<CartItem[]>([] as CartItem[], {
    url: 'https://jsonplaceholder.typicode.com/posts',
    __transformData: (data: CartItem[]) => {
      return (data || [])
        .map((item) => ({
          ...item,
          price: precisionRound(random(1, 500, true)),
          thumbnail: 'http://via.placeholder.com/240x240',
          quantity: random(1, 10),
        }))
        .slice(0, 10);
    },
  });
};

export const addCartItem = () => {
  const { execute, ...rest } = useAxios<CartItem>({} as CartItem, {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'post',
  });
  return {
    ...rest,
    execute: (item: CartItem) =>
      execute({
        data: item,
      }),
  };
};

export const patchCartItem = () => {
  const { execute, ...rest } = useAxios<CartItem>({} as CartItem, {
    method: 'patch',
  });
  return {
    ...rest,
    execute: (item: CartItem) =>
      execute({
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
        data: {
          quantity: item.quantity,
        },
      }),
  };
};

export const removeCartItem = () => {
  const { execute, ...rest } = useAxios<CartItem>({} as CartItem, {
    method: 'delete',
  });
  return {
    ...rest,
    execute: (item: CartItem) =>
      execute({
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
      }),
  };
};
