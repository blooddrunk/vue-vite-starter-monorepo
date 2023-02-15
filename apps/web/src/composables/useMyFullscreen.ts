
// * F11 won't trigger fullscreenchange event
export const useMyFullscreen = () => {
  const isFullscreen = ref(false);
  const windowWidth = ref(0);
  const windowHeight = ref(0);

  const handler = useDebounceFn(() => {
    windowWidth.value = window.innerWidth * window.devicePixelRatio;
    windowHeight.value = window.innerHeight * window.devicePixelRatio;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    if (
      windowWidth.value / screenWidth >= 0.95 &&
      windowHeight.value / screenHeight >= 0.95
    ) {
      isFullscreen.value = true;
    } else {
      isFullscreen.value = false;
    }
  }, 100);

  useEventListener(window, 'resize', handler);

  onMounted(() => {
    handler();
  });

  return {
    isFullscreen,
    windowWidth,
    windowHeight,
  };
};
