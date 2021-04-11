<template>
  <div class="p-5">
    <div class="border-white w-80 m-auto p-2 box-border shadow rounded">
      <form
        class="text-center"
        style="text-align: -webkit-center"
        @submit.prevent="onSubmit"
      >
        <UserIcon />
        <AppControlInput v-model="profile.tag">Gamertag</AppControlInput>
        <AppControlInput v-model="profile.firstName"
          >First Name</AppControlInput
        >
        <AppControlInput v-model="profile.lastName">Last Name</AppControlInput>
        <AppControlInput v-model="profile.email">Email</AppControlInput>
        <AppControlInput v-model="profile.password">Password</AppControlInput>
        <AppButton type="submit">Submit Changes</AppButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRouter,
  reactive,
} from '@nuxtjs/composition-api';
import UserIcon from '@/components/User/Icon.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';
import AppButton from '~/components/UI/AppButton.vue';
interface Profile {
  userID: String;
  tag: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export default defineComponent({
  components: { UserIcon, AppControlInput, AppButton },

  setup() {
    const store = useStore();
    const router = useRouter();
    const profileData: Profile = store.getters.profile || {
      userId: '1',
      tag: 'tag',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
    };

    const profile = reactive(profileData);

    const onSubmit = (): void => {
      store.dispatch('setProfile', { profile }).then(() => router.push('/'));
    };

    return { profile, onSubmit };
  },
});
</script>
