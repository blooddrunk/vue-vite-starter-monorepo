import type { Product } from '@/typings';

export const useSimpleFormList = () =>
  useAxios<Product[]>([], {
    url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
    __transformData: false,
  });

export const useAddProduct = () => {
  const { execute } = useAxios<Product | null>(
    null,
    {
      url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
      method: 'post',
    },
    {
      immediate: false,
    }
  );

  return {
    addProduct: (product: Product) =>
      execute({
        data: product,
      }),
  };
};

export const useRemoveProduct = () => {
  const { execute } = useAxios<Product | null>(
    null,
    {
      url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
      method: 'delete',
    },
    {
      immediate: false,
    }
  );

  return {
    removeProduct: (product: Product) =>
      execute({
        data: product,
      }),
  };
};
