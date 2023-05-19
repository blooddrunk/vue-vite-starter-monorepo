import type { RouterTyped } from 'vue-router/auto';

import NProgress from 'nprogress';

export default (router: RouterTyped) => {
  router.beforeEach((to, from, next) => {
    if (to.name) {
      NProgress.start();
    }
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
