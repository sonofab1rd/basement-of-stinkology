<template>
  <nuxt-link class="p-4 m-4 block" :to="getLink">
    <Home v-if="link === '/'" />
    <User v-else-if="link === 'auth'" />
    <User v-else-if="link === 'profile'" />
    <span v-else>{{ link }}</span>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import User from '@/components/SVG/User.vue';
import Home from '~/components/SVG/Home.vue';

export default defineComponent({
  name: 'HeaderLink',
  components: { Home, User },
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const getLink = props.link.toLowerCase();

    return { getLink };
  },
});
</script>
