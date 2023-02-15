import { defineStore, acceptHMRUpdate } from 'pinia';

import { StoreKeys } from '@/services/chart';

export const useChartStore = defineStore('chart', () => {
  const { data: store, execute: fetchData } = useDataByCity();

  const currentCity = useStorage<StoreKeys>('city', '杭州市');
  const onCityChange = (newCity: StoreKeys) => {
    currentCity.value = newCity;
  };

  return {
    data: computed(() => ({
      ...store.value.__ALL__,
      ...store.value[currentCity.value],
    })),
    fetchData,

    currentCity,
    onCityChange,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChartStore, import.meta.hot));
}
