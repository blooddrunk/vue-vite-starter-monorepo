import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';

export type CommonSelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type TableColumnItem<T> = Partial<
  TableColumnCtx<T> & {
    prop: keyof T;
  }
>;
