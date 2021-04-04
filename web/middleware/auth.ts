import { Context } from '@nuxt/types';

export default function (context: Context) {
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/auth');
  }
}
