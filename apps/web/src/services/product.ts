import { useAxios } from '@/composables/useAxios';
import { usePaginatedList } from '@/composables/usePaginatedList';
import type { ProductItem } from '@/typings';
import { random } from 'lodash-es';

export const useProductList = () => {
  return usePaginatedList<ProductItem>(
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      __needValidation: false,
      __transformData: (data: ProductItem[], { headers }) => {
        return {
          items: (data || []).map((item) => ({
            ...item,
            price: random(2000),
            thumbnail: 'http://via.placeholder.com/640x240',
          })),
          total: Number(headers['x-total-count']) || 0,
        };
      },
    },
    {
      transformPaginationToQuery: (pagination) => ({
        _page: pagination.currentPage.value,
        _limit: pagination.pageSize.value,
      }),
      infinite: true,
      pageSize: 5,
    }
  );
};

export const useProductDetail = () => {
  const { execute, ...rest } = useAxios<ProductItem>({} as ProductItem, {
    __needValidation: false,
  });
  return {
    ...rest,
    execute: (id: string) =>
      execute({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        __transformData: (data) => ({
          ...(data as ProductItem),
          price: random(2000),
          detailImage: 'http://via.placeholder.com/640x1080',
          bannerImageList: [
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm',
              isVideo: true,
            },
          ].concat(
            [...Array(10).keys()].map(() => ({
              url: `http://via.placeholder.com/640`,
              isVideo: false,
            }))
          ),
        }),
      }),
  };
};
