<template>
  <div class="text-center" style="text-align: -webkit-center">
    <h1 class="text-xl font-extrabold mt-1">Add a movie</h1>
    <form @submit.prevent="onSubmit">
      <app-control-input class="block" type="text">Name</app-control-input>
      <app-control-input class="block" type="text">Actor</app-control-input>
      <div>
        <app-button type="submit">Search</app-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, reactive } from '@nuxtjs/composition-api';
import AppButton from '~/components/UI/AppButton.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';

export default defineComponent({
  components: { AppControlInput, AppButton },
  setup() {
    const store = useStore();
    const state = reactive({ searchData: { name: '', actor: '' } });
    const onSubmit = () => {
      store.dispatch('getMovie', state);
    };
    return { onSubmit };
  },
});
</script>
