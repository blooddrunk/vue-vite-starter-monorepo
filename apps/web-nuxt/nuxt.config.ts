// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  css: ['@/assets/css/main.css'],

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    // ! tailwind.css  imported this way makes other css files which depend on tailwind functionality fail to compile
    cssPath: false,

    exposeConfig: true,
  },

  typescript: {
    shim: false,
  },
});
