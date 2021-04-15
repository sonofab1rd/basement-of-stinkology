<template>
  <div class="p-5">
    <div class="border-white w-80 m-auto p-2 box-border shadow rounded">
      <form @submit.prevent="onSubmit">
        <AppControlInput v-model="email" type="email" size="30"
          >E-Mail Address</AppControlInput
        >
        <AppControlInput v-model="password" type="password" size="30"
          >Password</AppControlInput
        >
        <AppButton class="m-2.5 border-black text-lg border-4" type="submit">{{
          isLogin ? 'Login' : 'Sign Up'
        }}</AppButton>
        <AppButton
          type="button"
          class="m-2.5 border-black text-lg border-4"
          @click="isLogin = !isLogin"
          >Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton
        >
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api';
import AppControlInput from '~/components/UI/AppControlInput.vue';
import AppButton from '~/components/UI/AppButton.vue';

export default defineComponent({
  components: { AppControlInput, AppButton },
  setup() {
    const isLogin = ref(true);
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();
    const onSubmit = (): void => {
      store
        .dispatch('authenticateUser', {
          isLogin: isLogin.value,
          email: email.value,
          password: password.value,
        })
        .then(() => router.push('/profile'));
    };
    return { isLogin, email, password, onSubmit };
  },
});
</script>
