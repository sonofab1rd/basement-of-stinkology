<template>
  <button
    v-bind="$attrs"
    class="bg-black text-white p-1 rounded-md"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
