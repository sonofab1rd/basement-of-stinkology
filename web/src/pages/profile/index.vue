<template>
  <div class="p-5">
    <div class="border-white w-80 m-auto p-2 box-border shadow rounded">
      <form
        class="text-center"
        style="text-align: -webkit-center"
        @submit.prevent="onSubmit"
      >
        <UserIcon />
        <AppControlInput v-model="state.profile.tag">Gamertag</AppControlInput>
        <AppControlInput v-model="state.profile.firstName"
          >First Name</AppControlInput
        >
        <AppControlInput v-model="state.profile.lastName"
          >Last Name</AppControlInput
        >
        <AppControlInput v-model="state.profile.email">Email</AppControlInput>
        <AppControlInput v-model="state.profile.password"
          >Password</AppControlInput
        >
        <AppButton type="submit">Submit Changes</AppButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  reactive,
  computed,
  watch,
} from '@nuxtjs/composition-api';
import UserIcon from '@/components/User/Icon.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';
import AppButton from '~/components/UI/AppButton.vue';

export default defineComponent({
  components: { UserIcon, AppControlInput, AppButton },

  setup() {
    const store = useStore();
    const profile = computed(() => ({ ...store.getters.profile }));
    const state = reactive({
      profile: { ...profile.value },
    });

    watch(profile, (newProfile) => {
      state.profile = newProfile;
    });

    const onSubmit = (): void => {
      store.dispatch('setProfile', { ...state.profile });
    };

    return { state, onSubmit };
  },
});
</script>
