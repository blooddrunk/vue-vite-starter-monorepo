/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  singleQuote: true,

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  pluginSearchDirs: false,

  /**
   * options of @ianvs/prettier-plugin-sort-imports
   * */
  importOrder: [
    '',
    '<BUILTIN_MODULES>',
    '',
    '<TYPES>',
    '<TYPES>^[./]',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '(.*)\\.(vue|tsx)$',
    '',
    '^@/(.*)$',
    '^[./]',
    '',
  ],
};
