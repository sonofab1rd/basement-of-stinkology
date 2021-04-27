<template>
  <NuxtLink class="p-4 m-4 block" :to="getLink">
    <Home v-if="link === 'The Basement'" />
    <User v-else-if="link === 'auth'" />
    <span v-else>{{ link }}</span>
  </NuxtLink>
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
    const getLink =
      props.link === 'The Basement' ? '/' : '/' + props.link.toLowerCase();

    return { getLink };
  },
});
</script>
