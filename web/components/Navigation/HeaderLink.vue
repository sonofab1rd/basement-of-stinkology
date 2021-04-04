<template>
  <div class="p-4 m-4">
    <nuxt-link :to="getLink">
      <div class="h-36 w-36 items-center">
        <Sofa v-if="link === 'The Basement'" />
        <Controller v-else-if="link === 'Games'" />
        <Burger v-else-if="link === 'Meals'" />
        <Mug v-else-if="link === 'Drinks'" />
        <Reel v-else-if="link === 'Movies'" />
        <User v-else-if="link === 'auth'" />
      </div>
    </nuxt-link>
    <!-- <nuxt-link v-else class="text-3xl m-2" :to="getLink">{{ link }}</nuxt-link> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Sofa from '@/components/SVG/Sofa.vue';
import Controller from '@/components/SVG/Controller.vue';
import Burger from '@/components/SVG/Burger.vue';
import Mug from '@/components/SVG/Mug.vue';
import Reel from '@/components/SVG/Reel.vue';
import User from '@/components/SVG/User.vue';

export default defineComponent({
  name: 'HeaderLink',
  components: { Sofa, Controller, Burger, Mug, Reel, User },
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const getLink =
      props.link === 'The Basement' ? '/' : props.link.toLowerCase();

    return { getLink };
  },
});
</script>
