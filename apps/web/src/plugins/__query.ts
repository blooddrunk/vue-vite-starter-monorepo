import type { UserPlugin } from '@/typings';
import { VueQueryPlugin } from 'vue-query';

export const install: UserPlugin = (app) => {
  app.use(VueQueryPlugin);
};
