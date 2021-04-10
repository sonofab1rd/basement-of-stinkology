<template>
  <div class="p-5">
    <div class="border-white w-80 m-auto p-2 box-border shadow rounded">
      <form
        class="text-center"
        style="text-align: -webkit-center"
        @submit.prevent="onSubmit"
      >
        <UserIcon />
        <AppControlInput :value="tag">Gamertag</AppControlInput>
        <AppControlInput :value="fname">First Name</AppControlInput>
        <AppControlInput :value="lname">Last Name</AppControlInput>
        <AppControlInput :value="email">Email</AppControlInput>
        <AppControlInput :value="pass">Password</AppControlInput>
        <AppButton type="button">Submit Changes</AppButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  useRouter,
} from '@nuxtjs/composition-api';
import UserIcon from '@/components/User/Icon.vue';
import AppControlInput from '~/components/UI/AppControlInput.vue';
import AppButton from '~/components/UI/AppButton.vue';

export default defineComponent({
  components: { UserIcon, AppControlInput, AppButton },
  setup() {
    const store = useStore();
    const router = useRouter();
    const tag = ref('tag');
    const fname = ref('fname');
    const lname = ref('lname');
    const email = ref('email');
    const pass = ref('pass');

    const onSubmit = (): void => {
      store
        .dispatch('setProfile', {
          tag: tag.value,
          fname: fname.value,
          lname: lname.value,
          email: email.value,
          password: pass.value,
        })
        .then(() => router.push('/'));
    };

    return { tag, fname, lname, email, pass, onSubmit };
  },
});
</script>
