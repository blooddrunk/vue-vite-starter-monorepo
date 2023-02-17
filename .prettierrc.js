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
    '<TYPES>',
    '<TYPES>^[./]',
    '<THIRD_PARTY_MODULES>',
    '(.*)\\.(vue|tsx)$',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
