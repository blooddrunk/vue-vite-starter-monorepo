export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  return {
    provide: {
      appName: runtimeConfig.public.appName,
    },
  };
});
