require('@jn/eslint-config/patch');

module.exports = {
  root: true,

  extends: ['@jn/eslint-config/vue'],

  globals: {
    __DEV__: 'readonly',
  },
};
