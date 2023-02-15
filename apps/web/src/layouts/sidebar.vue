<template>
  <div class="flex">
    <div class="flex h-screen w-full flex-col">
      <TheHeading></TheHeading>

      <div class="flex flex-grow overflow-x-hidden">
        <TheSidebar></TheSidebar>

        <main
          :class="
            uiStore.isSidebarCollapsed
              ? 'w-[calc(100vw-65px)]'
              : 'w-[calc(100vw-14rem)]'
          "
          class="flex flex-grow flex-col bg-main p-4 xl:p-8 2xl:p-12"
        >
          <template v-if="navTabStore.isNavTabEnabled">
            <TheNavTab></TheNavTab>
            <section
              class="flex-grow overflow-y-auto bg-white p-3 shadow-xl xl:p-6 2xl:p-9"
            >
              <router-view v-slot="{ Component }">
                <keep-alive :include="navTabStore.currentNavTabNameList">
                  <component :is="Component"></component>
                </keep-alive>
              </router-view>
            </section>
          </template>

          <template v-else>
            <TheBreadcrumb></TheBreadcrumb>

            <section
              class="flex-grow overflow-y-auto bg-white p-3 shadow-xl xl:p-6 2xl:p-9"
            >
              <router-view></router-view>
            </section>
          </template>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const navTabStore = useNavTabStore();
const uiStore = useUIStore();
</script>
