<template>
  <header class="p-3">
    <h3
      class="w-full flex items-center text-lg text-primary font-semibold"
      :class="$style.title"
    >
      <slot></slot>
    </h3>
  </header>
</template>

<style lang="scss" module>
.title {
  &:before,
  &:after {
    content: '';
    @apply flex-grow;
    @apply border-b-2 border-gray-300;
  }
  &:before {
    @apply mr-3;
  }
  &:after {
    @apply ml-3;
  }
}
</style>
