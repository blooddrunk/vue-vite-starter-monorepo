import type { CommonSelectOption, MaybeRef } from '@/typings';

import { isObject } from 'lodash-es';

const isSelectOption = (op: any): op is CommonSelectOption => {
  if (isObject(op) && 'value' in op && 'label' in op) {
    return true;
  }
  return false;
};

export const useSelectOptions = (
  items: MaybeRef<CommonSelectOption[]>,
  showAllOptions: MaybeRef<boolean | string | CommonSelectOption> = '全部',
) => [
  computed(() => {
    const _showAllOptions = unref(showAllOptions);
    if (_showAllOptions) {
      let option: CommonSelectOption = {
        label: '全部',
        value: '',
      };

      if (isSelectOption(_showAllOptions)) {
        option = {
          ...option,
          ..._showAllOptions,
        };
      } else if (typeof _showAllOptions === 'string') {
        option.label = _showAllOptions;
      }

      return [option].concat(unref(items));
    } else {
      return unref(items);
    }
  }),
  items,
];
