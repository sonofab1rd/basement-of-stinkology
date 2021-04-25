<template>
  <div class="text-center">
    <app-button class="mt-3" @click="addMovie">Add a Movie!</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api';
import AppButton from '~/components/UI/AppButton.vue';

export default defineComponent({
  components: { AppButton },
  middleware: ['check-auth', 'auth'],
  setup() {
    const router = useRouter();
    const addMovie = () => {
      router.push('/movies/add');
    };
    return { addMovie };
  },
});
</script>
