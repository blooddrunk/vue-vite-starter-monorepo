import type { RouterTyped } from 'vue-router/auto';

export default (router: RouterTyped) => {
  router.beforeEach((to) => {
    if (!to.name || !String(to.name).startsWith('/mobile')) {
      return;
    }

    const auth = useMobileAuthStore();

    const isLoggedIn = auth.isLoggedIn;
    const isInLoginPage = to.name === '/mobile/login';
    const requiresAuth =
      !isLoggedIn &&
      (typeof to.meta.requiresAuth === 'undefined'
        ? true
        : !!to.meta.requiresAuth);

    if (isInLoginPage && isLoggedIn) {
      auth.logout();
    } else if (requiresAuth && !isLoggedIn) {
      return {
        name: '/mobile/login',
        query: {
          from: to.name || 'mobile',
          ...to.query,
        },
      };
    }
  });
};
