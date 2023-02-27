import path from 'path';

import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import VueMacros from 'unplugin-vue-macros/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { loadEnv } from 'vite';
import Layouts from 'vite-plugin-vue-layouts';
import TypeImports from 'vite-plugin-vue-type-imports';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDev = mode === 'development';
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: process.env.VITE_PUBLIC_PATH,

    define: {
      __DEV__: isDev,
    },

    resolve: {
      alias: {
        '@/typings': path.resolve(__dirname, 'src/utils/typings'),
        '@/modules/': `${path.resolve(__dirname, 'src/components/modules')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueRouter({
        dts: './src/typings/typed-router.d.ts',
        exclude: ['**/__*', '**/__*/**/*'],
      }),

      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx(),
        },

        // ! this won't always work, use vite-plugin-vue-type-imports temporarily
        betterDefine: false,
      }),

      Layouts(),

      Components({
        extensions: ['vue'],

        dts: './src/typings/components.d.ts',

        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),

          VantResolver(),

          IconsResolver({
            prefix: 'icon',
            alias: {
              park: 'icon-park',
              fas: 'fa-solid',
            },
            enabledCollections: ['mdi'],
          }),
        ],
      }),

      Icons({ compiler: 'vue3' }),

      AutoImport({
        dts: './src/typings/auto-imports.d.ts',
        imports: [
          'vue',
          '@vueuse/head',
          '@vueuse/core',
          'vue/macros',
          VueRouterAutoImports,
        ],
        dirs: ['./src/composables/**', './src/stores/**', './src/services/**'],
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: 'readonly',
        },

        resolvers: [
          // * use wisely
          // IconsResolver({
          //   prefix: 'icon',
          //   alias: {
          //     park: 'icon-park',
          //     fas: 'fa-solid',
          //   },
          //   enabledCollections: ['mdi'],
          // }),
          // MyComponentResolver,
        ],
      }),

      TypeImports(),
    ],

    server: {
      host: '0.0.0.0',
      port: 3500,

      proxy: {
        '^/json/.*': {
          target:
            'https://my-json-server.typicode.com/blooddrunk/my-json-server/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/json/, ''),
        },
      },
    },
  };
};
