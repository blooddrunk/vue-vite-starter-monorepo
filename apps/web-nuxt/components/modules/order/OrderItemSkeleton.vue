<template>
  <div class="shadow-light mt-3 rounded-md bg-white p-2 shadow">
    <van-skeleton :row="1" />
    <div class="mt-2 grid grid-cols-7 items-center">
      <div class="col-span-2">
        <div class="bg-light aspect-w-1 aspect-h-1 w-full rounded"></div>
      </div>

      <van-skeleton class="col-span-5" title :row="3" />
    </div>
    <van-skeleton class="mt-2" :row="1" />
  </div>
</template>
