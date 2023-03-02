module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    'vue/max-attributes-per-line': 'off', // respect prettier
    'vue/html-self-closing': 'off',
  },
};
