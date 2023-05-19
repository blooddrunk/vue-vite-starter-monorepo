import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '@/typings': path.resolve(__dirname, 'utils/typings'),
    '@/modules/': `${path.resolve(__dirname, 'components/modules')}/`,
  },

  ssr: false,

  css: ['@/assets/css/main.css'],

  devServer: {
    host: '0.0.0.0',
    port: 3030,
  },

  experimental: {
    typedPages: true,
  },

  imports: {
    dirs: ['stores', 'services'],
  },

  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      publicPath: process.env.NUXT_PUBLIC_PATH || '/',
      appName: process.env.NUXT_APP_NAME || '',
      jsonServerPath: process.env.NUXT_JSON_SERVER_PATH || '/',
    },
  },

  tailwindcss: {
    // ! tailwind.css  imported this way makes other css files which depend on tailwind functionality fail to compile
    cssPath: false,

    exposeConfig: true,
  },

  typescript: {
    shim: false,
  },
});
