require('@jn/eslint-config/patch/modern-module-resolution');

module.exports = {
  root: true,

  extends: ['@jn/eslint-config/vue', './.eslintrc-auto-import.json'],

  globals: {
    __DEV__: 'readonly',
  },
};
