<template>
  <div class="overflow-hidden pt-1 m-2.5">
    <div class="flex mb-2 items-center justify-between">
      <div>
        <span
          class="text-xs md:text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200"
        >
          {{ currentTask }}
        </span>
      </div>
      <div class="text-right">
        <span
          class="text-xs md:text-sm font-semibold inline-block text-green-600"
        >
          {{ percentComplete }}
        </span>
      </div>
    </div>
    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
      <div
        :style="width"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const percentComplete = '0%';
    const width = reactive({ width: percentComplete });
    const currentTask = 'Set a Date!';
    return { width, percentComplete, currentTask };
  },
});
</script>
