<template>
  <div class="h-full w-full">
    <div
      v-if="show"
      class="h-full w-full bg-black fixed top-0 left-0"
      @click="$emit('close')"
    ></div>
    <transition name="slide-side">
      <div
        v-if="show"
        class="h-full bg-white fixed top-0 left-0 box-border p-6"
      >
        <ul class="list-none p-0 m-0" @click="$emit('close')">
          <li class="mt-5 mb-0"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="mt-5 mb-0"><nuxt-link to="/games">Games</nuxt-link></li>
          <li class="mt-5 mb-0"><nuxt-link to="/meals">Meals</nuxt-link></li>
          <li class="mt-5 mb-0"><nuxt-link to="/drinks">Drinks</nuxt-link></li>
          <li class="mt-5 mb-0"><nuxt-link to="/movies">Movies</nuxt-link></li>
          <li class="mt-5 mb-0">
            <nuxt-link to="/auth">Login</nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TheSidebar',
  middleware: ['check-auth', 'auth'],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped>
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}
</style>
