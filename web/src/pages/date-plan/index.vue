<template>
  <div class="text-center" style="text-align: -webkit-center">
    <h2 class="text-xl font-extrabold">Select dates in order of preference!</h2>
    <form @submit.prevent="onSubmit">
      <div v-for="(option, index) in options" :key="index" class="block">
        <label class="block pt-5 text-lg font-bold">
          Option {{ index + 1 }}</label
        >
        <app-control-input class="inline-block" type="date"
          >Start Date</app-control-input
        >
        <app-control-input class="inline-block" type="date"
          >End Date</app-control-input
        >
      </div>
      <app-button type="submit" class="block mt-5 p-3">Submit</app-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api';
import AppButton from '~/components/UI/AppButton.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';

export default defineComponent({
  components: { AppControlInput, AppButton },
  setup() {
    const options = reactive([
      { start: new Date(), end: new Date() },
      { start: new Date(), end: new Date() },
      { start: new Date(), end: new Date() },
    ]);
    const onSubmit = () => {
      console.log('options', options);
    };

    return {
      options,
      onSubmit,
    };
  },
});
</script>
