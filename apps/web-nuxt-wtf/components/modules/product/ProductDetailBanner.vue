<template>
  <van-swipe v-if="items.length" @change="handleSliderChange">
    <van-swipe-item v-for="(item, index) in displayItems" :key="item.url">
      <div
        :class="
          layout === 'square'
            ? 'aspect-w-1 aspect-h-1'
            : 'aspect-w-16 aspect-h-9'
        "
      >
        <SimpleVideoPlayer
          v-if="item.isVideo"
          :wrapper-class="mediaClass"
          :url="item.url"
          :active="activeIndex === index"
          crossorigin="anonymous"
        ></SimpleVideoPlayer>
        <a v-else @click.prevent="navigateTo(item.externalLink)">
          <van-image
            :class="mediaClass"
            :src="item.url"
            fit="cover"
          ></van-image>
        </a>
      </div>
    </van-swipe-item>

    <template #indicator="{ active }">
      <div
        class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-zinc-500/70 px-2 text-center text-sm text-white"
      >
        {{ active + 1 }}/{{ total }}
      </div>
    </template>
  </van-swipe>
  <div
    v-else
    class="w-full bg-light"
    :class="
      layout === 'square' ? 'aspect-w-1 aspect-h-1' : 'aspect-w-16 aspect-h-9'
    "
  ></div>
</template>

<script lang="ts" setup>
import type { ProductMedia } from '@/typings';

const props = withDefaults(
  defineProps<{
    items: ProductMedia[];
    layout?: 'square' | 'rect';
  }>(),
  {
    items: () => [],
    layout: 'square',
  }
);

const activeIndex = ref(0);
const handleSliderChange = (index: number) => {
  activeIndex.value = index;
};

const displayItems = computed(() => props.items.slice(0, 9));
const total = computed(() => displayItems.value.length);

const mediaClass = 'max-w-full h-full !absolute inset-0';

const navigateTo = (url?: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};
</script>
