<template>
  <div class="relative text-white" :class="wrapperClass" @click="togglePlay">
    <video
      ref="video"
      class="w-full h-full object-contain object-center bg-zinc-200"
      object-fit="cover"
      v-bind="$attrs"
    ></video>

    <a
      v-if="playing"
      class="absolute right-2 bottom-2"
      @click.prevent.stop="toggleMuted"
    >
      <IconMdiVolumeOff v-if="muted"></IconMdiVolumeOff>
      <IconMdiVolumeSource v-else></IconMdiVolumeSource>
    </a>
    <div
      v-else
      class="absolute inset-0 bg-zinc-200/75 flex items-center justify-center"
    >
      <IconMdiAlert v-if="hasError" class="text-[1.4em]"></IconMdiAlert>
      <IconMdiPlay v-else class="text-[1.4em]"></IconMdiPlay>
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
