<template>
  <section
    class="flex flex-col p-3 ring-4 ring-slate-300/75 dark:ring-slate-700/75"
  >
    <header class="relative flex flex-shrink-0 items-center p-2">
      <div
        class="bg-primary outline-primary h-2 w-2 rounded-full outline outline-1 outline-offset-2"
      ></div>
      <h2 class="ml-2">{{ title }}</h2>
    </header>

    <div class="flex flex-grow flex-col justify-center">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
type Props = {
  title: string;
};
defineProps<Props>();
</script>
