require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  globals: {
    __DEV__: 'readonly',
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
  },

  plugins: [],

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'vue/multi-word-component-names': 'off',
  },
};
