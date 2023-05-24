export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  return {
    provide: {
      appName: runtimeConfig.public.appName,
    },
  };
});

// declare module 'vue' {
//   export interface ComponentCustomProperties {
//     $appName: string;
//   }
// }
