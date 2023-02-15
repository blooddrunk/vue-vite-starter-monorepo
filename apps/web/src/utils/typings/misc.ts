export type CommonSelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type ReadonlyFieldsetData = Record<string | number | symbol, any>;

export type ReadonlyFieldsetRow = {
  value?: ((data: ReadonlyFieldsetData) => string) | string;
  valueKey?: string | string[];
  className?: ((content: string) => string) | string;
  label?: string;
};

export type ServerResponse = {
  errcode: string;
  errmsg: string;
  data: unknown;
};
