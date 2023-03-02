import type { Product } from '@/typings';

export const useSimpleFormList = () =>
  useAxios<Product[]>([], {
    url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
  });

export const useAddProduct = () => {
  const { execute } = useAxios<Product | null>(null, {
    url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
    method: 'post',
  });

  return {
    addProduct: (product: Product) =>
      execute({
        data: product,
      }),
  };
};

export const useRemoveProduct = () => {
  const { execute } = useAxios<Product | null>(null, {
    url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
    method: 'delete',
  });

  return {
    removeProduct: (product: Product) =>
      execute({
        data: product,
      }),
  };
};
