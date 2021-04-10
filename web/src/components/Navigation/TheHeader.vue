<template>
  <div>
    <header>
      <TheSidebarToggle @toggle="$emit('sidenavToggle')" />
      <ul class="hidden bg-gray-300 md:grid grid-cols-6 place-items-center">
        <li v-for="link in links" :key="link">
          <HeaderLink :link="link" />
        </li>
      </ul>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api';
import HeaderLink from '@/components/Navigation/HeaderLink.vue';
import TheSidebarToggle from '@/components/Navigation/TheSidebarToggle.vue';

export default defineComponent({
  name: 'TheHeader',
  components: { HeaderLink, TheSidebarToggle },
  setup() {
    const store = useStore();
    const isAuthenticated: Boolean = store.getters.isAuthenticated;
    const links: Array<String> = ['/', 'Games', 'Meals', 'Drinks', 'Movies'];
    if (isAuthenticated) {
      links.push('user-profile');
    } else {
      links.push('auth');
    }
    return { links };
  },
});
</script>
