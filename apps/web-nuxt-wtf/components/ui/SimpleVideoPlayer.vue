<template>
  <div class="relative text-white" :class="wrapperClass" @click="togglePlay">
    <video
      ref="video"
      class="h-full w-full bg-zinc-200 object-contain object-center"
      object-fit="cover"
      v-bind="$attrs"
    ></video>

    <a
      v-if="playing"
      class="absolute bottom-2 right-2"
      @click.prevent.stop="toggleMuted"
    >
      <Icon v-if="muted" name="mdi:volume-off"></Icon>
      <Icon v-else name="mdi:volume-source"></Icon>
    </a>
    <div
      v-else
      class="absolute inset-0 flex items-center justify-center bg-zinc-200/75"
    >
      <Icon v-if="hasError" name="mdi:alert" class="text-[1.4em]"></Icon>
      <Icon v-else name="mdi:play" class="text-[1.4em]"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    url: string;
    active?: boolean;
    wrapperClass?: string;
  }>(),
  {
    active: false,
    wrapperClass: '',
  }
);

const video = ref<HTMLVideoElement>();
const { playing, muted, onSourceError } = useMediaControls(video, {
  src: props.url,
});

const hasError = ref(false);
onSourceError(() => {
  hasError.value = true;
});

const togglePlay = () => {
  if (hasError.value) {
    return;
  }
  playing.value = !playing.value;
};

const toggleMuted = () => {
  muted.value = !muted.value;
};

onMounted(() => {
  muted.value = true;

  watch(
    () => props.active,
    (value) => {
      playing.value = value;
    }
  );
});
</script>
