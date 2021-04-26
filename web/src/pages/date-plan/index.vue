<template>
  <div class="text-center" style="text-align: -webkit-center">
    <h2 class="text-xl font-extrabold mt-1">
      Select dates in order of preference!
    </h2>
    <form @submit.prevent="onSubmit">
      <div v-for="(option, index) in options" :key="index">
        <div class="pt-3 text-lg font-bold">Option {{ index + 1 }}</div>
        <app-control-input
          v-model="options[index].start"
          class="inline-block"
          type="date"
          >Start Date</app-control-input
        >
        <app-control-input
          v-model="options[index].end"
          class="inline-block"
          type="date"
          >End Date</app-control-input
        >
      </div>
      <app-button type="submit" class="block mt-5 p-3">Submit</app-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useStore } from '@nuxtjs/composition-api';
import AppButton from '~/components/UI/AppButton.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';

export default defineComponent({
  components: { AppControlInput, AppButton },
  setup() {
    const store = useStore();
    const options = reactive([
      { start: '', end: '' },
      { start: '', end: '' },
      { start: '', end: '' },
    ]);
    const onSubmit = () => {
      store.dispatch('weekendOptions', { ...options });
    };

    return {
      options,
      onSubmit,
    };
  },
});
</script>
