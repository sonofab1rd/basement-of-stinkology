<template>
  <div class="m-2.5">
    <label class="block font-bold"><slot /></label>
    <input
      v-if="controlType === 'input'"
      class="block w-auto box-border p-5 border-black border-2 rounded-md"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="controlType === 'textarea'"
      class="block w-auto box-border p-5 border-black border-2 rounded-md"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AppControlInput',
  props: {
    controlType: {
      type: String,
      default: 'input',
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return { props };
  },
});
</script>
