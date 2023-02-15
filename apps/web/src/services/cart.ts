import { CartItem } from '@/typings';
import { precisionRound } from '@/utils/math';
import { random } from 'lodash-es';

export const useCartList = () => {
  return useAxios<CartItem[]>([] as CartItem[], {
    url: 'https://jsonplaceholder.typicode.com/posts',
    __needValidation: false,
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
    __needValidation: false,
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
    __needValidation: false,
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
    __needValidation: false,
  });
  return {
    ...rest,
    execute: (item: CartItem) =>
      execute({
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
      }),
  };
};
