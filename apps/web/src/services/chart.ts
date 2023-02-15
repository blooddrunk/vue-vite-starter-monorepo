export const storeKeys = [
  '__ALL__',
  '杭州市',
  '宁波市',
  '温州市',
  '嘉兴市',
  '湖州市',
  '绍兴市',
  '金华市',
  '衢州市',
  '舟山市',
  '台州市',
  '丽水市',
] as const;

export type StoreKeys = typeof storeKeys[number];

export type L1Item = {
  label1?: string;
  label2?: string;
  value1: number;
  value2?: number;
  radius?: number;
};

export type L2Item = {
  label1?: string;
  value1: number;
  value2: number;
};

export type L3Item = {
  imageUrl?: string;
  label1?: string;
  value1: number;
  label2?: string;
  value2?: number;
  label3?: string;
  value3?: number | string;
};

export type C1Item = {
  color?: string[];
  title?: string;
  label1?: string;
  value1: number;
  label2?: string;
  value2: number;
  value3: number;
};

export type C2Item = {
  label1?: string;
  value1: number;
  value2: number;
};

export type R1Item = {
  label1?: string;
  value1: number;
  value2: number;
};

export type R2Item = {
  label1?: string;
  value1: number;
};

export type StoreItem = {
  l1: {
    1: L1Item[];
    2: L1Item[];
  };
  l2: L2Item[];
  l3: L3Item[];
  c1: C1Item[];
  c2: C2Item[];
  r1: R1Item[];
  r2: R2Item[];
};

export type Store = Partial<{
  [key in StoreKeys]: StoreItem;
}>;

export const useDataByCity = () => {
  return useAxios<Store>({} as Store, {
    url: `${import.meta.env.VITE_PUBLIC_PATH}datastore.json?_t=${Date.now()}`,
  });
};
