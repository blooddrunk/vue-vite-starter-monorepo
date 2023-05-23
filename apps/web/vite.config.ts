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
import { defineConfig, loadEnv } from 'vite';
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
        '@/constants': path.resolve(__dirname, 'src/utils/constants'),
        '@/modules/': `${path.resolve(__dirname, 'src/components/modules')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueRouter({
        dts: './src/typings/typed-router.d.ts',
        exclude: ['**/_*', '**/_*/**/*'],
      }),

      VueMacros({
        plugins: {
          vue: Vue({
            script: {
              defineModel: true,
            },
          }),
          vueJsx: VueJsx(),
        },

        // ? This should be addressed in vue@3
        // betterDefine: true,
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
          {
            '@jn/shared': ['usePagination', 'useArrayPagination', 'useEcharts'],
          },
        ],
        dirs: ['./src/composables/**', './src/stores/**', './src/services/**'],
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: 'readonly',
        },

        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),

          VantResolver(),
        ],
      }),
    ],

    server: {
      host: '0.0.0.0',
      port: 3020,

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
});
