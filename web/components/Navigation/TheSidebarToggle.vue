<template>
  <div
    class="flex flex-col justify-around w-8 h-8 cursor-pointer bg-white md:hidden"
    role="button"
    @click="$emit('toggle')"
  >
    <div class="w-11/12 h-1 bg-black"></div>
    <div class="w-11/12 h-1 bg-black"></div>
    <div class="w-11/12 h-1 bg-black"></div>
  </div>
</template>
