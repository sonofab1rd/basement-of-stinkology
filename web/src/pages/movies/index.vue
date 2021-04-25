<template>
  <div class="text-center">
    <app-button class="mt-3" @click="addMovie">Add a Movie!</app-button>
    <div class="m-8">
      <div class="border-black border-2 rounded-md justify-start flex">
        <img
          class="p-2"
          src="~/assets/newavengersposter.jpeg"
          width="100"
          height="100"
        />
        <div class="text-left">
          <p class="font-semibold">{{ data[0].title }}</p>
          <p class="italic">{{ data[0].releaseDate }}</p>
          <p class="sm:hidden">{{ data[0].description.substring(0, 20) }}...</p>
          <p class="hidden md:block">{{ data[0].description }}</p>
          <p class="font-extralight">{{ data[0].genre }}</p>
        </div>
      </div>
    </div>
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
    const data = [
      {
        title: 'The Avengers',
        releaseDate: '2012-04-25',
        imageUrl: '',
        description:
          'When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!',
        genre: 'Action',
      },
    ];
    const addMovie = () => {
      router.push('/movies/add');
    };
    return { addMovie, data };
  },
});
</script>
