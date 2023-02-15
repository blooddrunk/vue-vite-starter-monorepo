import type { UserPlugin } from '@/typings';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

export const install: UserPlugin = (app) => {
  app.use(autoAnimatePlugin);
};
