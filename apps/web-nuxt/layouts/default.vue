<template>
  <main
    class="3xl:px-10 h-screen overflow-y-auto px-8 py-6 dark:bg-gray-800 dark:text-white"
  >
    <section class="flex flex-col items-center pt-20">
      <header class="flex items-center">
        <router-link to="/">
          <h2 class="text-primary flex items-center py-5 text-3xl font-bold">
            <span>Vue 3</span>
          </h2>
        </router-link>

        <el-button
          class="!ml-3 !text-xl"
          type="primary"
          text
          @click="toggleNightMode"
        >
          <Icon name="mdi:weather-night" v-if="isDark"></Icon>
          <Icon name="mdi:weather-sunny" v-else></Icon>
        </el-button>
      </header>

      <div class="container">
        <slot></slot>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const isDark = useDark();
const toggleIsDark = useToggle(isDark);
const toggleNightMode = () => toggleIsDark();
</script>
