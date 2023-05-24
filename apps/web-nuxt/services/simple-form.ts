import type { Product } from '@/typings';

export const useSimpleFormList = () => {
  const runtimeConfig = useRuntimeConfig();
  return useAxios<Product[]>([], {
    url: `${runtimeConfig.public.jsonServerPath}products`,
    __transformData: false,
  });
};

export const useAddProduct = () => {
  const runtimeConfig = useRuntimeConfig();
  const { execute } = useAxios<Product | null>(
    null,
    {
      url: `${runtimeConfig.public.jsonServerPath}products`,
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
  const runtimeConfig = useRuntimeConfig();
  const { execute } = useAxios<Product | null>(
    null,
    {
      url: `${runtimeConfig.public.jsonServerPath}products`,
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
