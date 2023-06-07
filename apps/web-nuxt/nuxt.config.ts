import { fileURLToPath } from 'url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    // '@/typings': path.resolve(__dirname, 'utils/typings'),
    '@/typings': fileURLToPath(new URL('./utils/typings', import.meta.url)),
  },

  app: {
    baseURL: process.env.NUXT_PUBLIC_PATH || '/',
  },

  ssr: false,

  router: {
    options: {
      hashMode: true,
    },
  },

  components: [
    { path: '@/components', extensions: ['vue'] },
    {
      path: '@/components/ui',
      pathPrefix: false,
      extensions: ['vue'],
    },
    {
      path: '@/components/modules',
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],

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

  modules: [
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vant/nuxt',
    '@element-plus/nuxt',
  ],

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

  vite: {
    define: {
      __DEV__: process.env.NODE_ENV === 'development',
    },
  },
});
