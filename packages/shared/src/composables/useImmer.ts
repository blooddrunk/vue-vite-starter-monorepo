import produce from 'immer';
import { shallowRef } from 'vue';

export const useImmer = <S>(baseState: S) => {
  const state = shallowRef(baseState);
  const update = (updater: (draft: S) => S | undefined) => {
    state.value = produce(state.value, updater);
  };

  return [state, update];
};
