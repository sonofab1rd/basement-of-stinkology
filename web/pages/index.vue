<template>
  <div class="container">
    <div>
      <div class="px-32 mx-32">
        <Sofa />
      </div>
      <h1 class="md:block md:font-light md:text-8xl">
        The Basement of Stinkology
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Sofa from '~/components/SVG/Sofa.vue'

export default Vue.extend({
  components: { Sofa },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  /* font-size: 100px; */
  color: #35495e;
  /* letter-spacing: 1px; */
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
