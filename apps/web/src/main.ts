import 'animate.css';
import 'vant/es/dialog/style/index';
import 'vant/es/toast/style/index';

import type { UserPlugin } from '@/typings';

import { createNamedEntryForGlobImport } from '@jn/shared';
import { createApp } from 'vue';

import App from './App.vue';

import './assets/css/main.css';

import { router } from './router';

const app = createApp(App);

const installPlugins = async () => {
  const modules = import.meta.glob<{ install: UserPlugin }>(
    ['./plugins/*/index.ts', './plugins/*.ts'],
    {
      eager: true,
    }
  );
  await Promise.all(
    createNamedEntryForGlobImport(modules).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, m]) => m.install?.(app)
    )
  );
};

(async () => {
  app.use(router);

  await installPlugins();

  router.isReady().then(() => app.mount('#app'));
})();
