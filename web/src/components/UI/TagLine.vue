<template>
  <span class="text-sm italic md:text-lg">{{ tagLine }}</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const tagLine = 'Bold move Cotton!';
    return { tagLine };
  },
});
</script>
