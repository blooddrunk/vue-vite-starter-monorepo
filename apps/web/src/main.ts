import 'animate.css';
import 'vant/es/dialog/style/index';
import 'vant/es/toast/style/index';
import { createApp } from 'vue';

import type { UserPlugin } from '@/typings';

import App from './App.vue';

import { createNamedEntryForGlobImport } from '@/utils/misc';

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
