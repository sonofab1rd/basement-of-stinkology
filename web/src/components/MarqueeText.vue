<template>
  <marquee>{{ text }}</marquee>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus egestas sed sed risus pretium. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Lacinia at quis risus sed vulputate odio. At auctor urna nunc id cursus metus aliquam. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Gravida rutrum quisque non tellus orci ac auctor augue. Enim blandit volutpat maecenas volutpat blandit aliquam. Eu facilisis sed odio morbi quis commodo odio aenean sed. Sapien faucibus et molestie ac feugiat sed lectus vestibulum.';
    return { text };
  },
});
</script>
