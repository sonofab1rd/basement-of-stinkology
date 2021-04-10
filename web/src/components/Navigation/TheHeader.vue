<template>
  <div>
    <header>
      <TheSidebarToggle @toggle="$emit('sidenavToggle')" />
      <ul class="hidden bg-gray-300 md:grid grid-cols-6 place-items-center">
        <li v-for="link in navigation.links" :key="link">
          <HeaderLink :link="link" />
        </li>
      </ul>
    </header>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  useStore,
  watch,
} from '@nuxtjs/composition-api';
import HeaderLink from '@/components/Navigation/HeaderLink.vue';
import TheSidebarToggle from '@/components/Navigation/TheSidebarToggle.vue';

const getLinks = (isAuthenticated: boolean) => [
  '/',
  'Games',
  'Meals',
  'Drinks',
  'Movies',
  isAuthenticated ? 'user-profile' : 'auth',
];

export default defineComponent({
  name: 'TheHeader',
  components: { HeaderLink, TheSidebarToggle },
  setup() {
    const store = useStore();
    const isAuthenticated = computed<boolean>(
      () => store.getters.isAuthenticated,
    );

    const navigation = reactive({ links: getLinks(isAuthenticated.value) });

    watch(isAuthenticated, (value) => {
      navigation.links = getLinks(value);
    });

    return { navigation };
  },
});
</script>
