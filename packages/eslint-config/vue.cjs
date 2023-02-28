module.exports = {
  env: {
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript/recommended',
    require.resolve('./index'),
  ],
};
