require('@rushstack/eslint-patch/modern-module-resolution');

// FIXME: do not use plugins under @vue scope
module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: [],

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
