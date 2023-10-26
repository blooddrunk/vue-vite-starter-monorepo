<template>
  <section
    class="flex flex-col p-3 ring-4 ring-slate-300/75 dark:ring-slate-700/75"
  >
    <header class="relative flex-shrink-0 flex items-center p-2">
      <div
        class="w-2 h-2 rounded-full bg-primary outline outline-1 outline-primary outline-offset-2"
      ></div>
      <h2 class="ml-2">{{ title }}</h2>
    </header>

    <div class="flex-grow flex flex-col justify-center">
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
