<template>
  <div class="p-2 mt-3 bg-white rounded-md shadow shadow-light">
    <van-skeleton :row="1" />
    <div class="mt-2 grid grid-cols-7 items-center">
      <div class="col-span-2">
        <div class="bg-light rounded w-full aspect-w-1 aspect-h-1"></div>
      </div>

      <van-skeleton class="col-span-5" title :row="3" />
    </div>
    <van-skeleton class="mt-2" :row="1" />
  </div>
</template>
