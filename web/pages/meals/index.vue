<template>
  <div>
    <p>Meals page!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['check-auth', 'auth'],
  setup() {
    return {}
  },
})
</script>
