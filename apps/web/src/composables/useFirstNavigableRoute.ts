export const useFirstNavigableRoute = (routeName?: string) => {
  const currentRoute = useRoute();
  const router = useRouter();

  watch(
    () => currentRoute.name,
    (value) => {
      if (!routeName || routeName === value) {
        const { targetRoute } = routeName
          ? useFirstNavigableMenu(routeName, {
              excludedRoutes: [value as string],
            })
          : useFirstNavigableMenu({
              excludedRoutes: [value as string],
            });

        if (targetRoute) {
          router.push(targetRoute);
        } else {
          console.warn(
            '[useFirstNavigableRoute] Failed to find any navigable route to redirect to' +
              (routeName ? `, source route '${routeName}'` : '')
          );
        }
      }
    },
    { immediate: true }
  );
};
