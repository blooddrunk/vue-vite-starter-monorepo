import type { UserPlugin } from '@/typings';

export const install: UserPlugin = (app) => {
  app.config.globalProperties.$appName = import.meta.env.VITE_APP_NAME;
};

declare module 'vue' {
  export interface ComponentCustomProperties {
    $appName: string;
  }
}
