import type { UserPlugin } from '@/typings';
import { createPinia } from 'pinia';

export const install: UserPlugin = (app) => {
  const pinia = createPinia();
  app.use(pinia);
};
