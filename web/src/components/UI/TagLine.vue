<template>
  <span>{{ tagLine }}</span>
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
