import { getAccessorType, mutationTree, actionTree } from 'typed-vuex';
import Cookie from 'js-cookie';
import { Request } from 'express';

// Import all your submodules
// import * as submodule from '~/store/submodule'

interface AuthData {
  isLogin: Boolean;
  email: String;
  password: String;
}

interface Profile {
  userID: String;
  tag: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

interface State {
  token: string | null;
  profile: Profile | {};
}

export const state: () => State = () => ({
  token: '',
  profile: {},
});

export const getters = {
  token: (state: State) => state.token,
  profile: (state: State) => state.profile,
  isAuthenticated(state: State) {
    return Boolean(state.token);
  },
};
export const mutations = mutationTree(state, {
  setToken(state, newValue: State['token']) {
    state.token = newValue;
  },
  setProfile(state, newValue: State['profile']) {
    state.profile = { ...newValue };
  },
  clearToken(state) {
    state.token = null;
  },
});
export const actions = actionTree(
  { state, getters, mutations },
  {
    authenticateUser(vuexContext, authData: AuthData): Promise<any> {
      let authUrl = '/auth/login';
      if (!authData.isLogin) {
        authUrl = '/auth/signup';
      }
      return this.$axios
        .$post(authUrl, {
          username: authData.email,
          password: authData.password,
        })
        .then((result: any) => {
          vuexContext.commit('setToken', result.access_token);
          localStorage.setItem('access_token', result.access_token);
          Cookie.set('access_token', result.access_token);
          vuexContext.dispatch('getProfile', '1');
        })
        .catch((e: any) => console.log('error', e));
    },
    setLogoutTimer(vuexContext, duration) {
      setTimeout(() => {
        vuexContext.commit('clearToken');
      }, duration);
    },
    initAuth(vuexContext, req: Request) {
      let token: string | null;
      if (req) {
        if (!req.headers.cookie) {
          return;
        }

        const jwtCookie = req.headers.cookie
          .split(';')
          .find((c: String) => c.trim().startsWith('access_token='));

        if (!jwtCookie) {
          return;
        }

        token = jwtCookie.split('=')[1];
      } else {
        token = localStorage.getItem('access_token');
      }
      vuexContext.commit('setToken', token);
    },
    logout(vuexContext) {
      vuexContext.commit('clearToken');
      Cookie.remove('access_token');

      if (process.client) {
        localStorage.removeItem('access_token');
      }
    },
    setProfile(vuexContext, profile: Profile) {
      return this.$axios
        .$put('/users', profile)
        .then(() => {
          vuexContext.commit('setProfile', profile);
        })
        .catch((e: any) => console.log('error', e));
    },
    getProfile(vuexContext, id: String) {
      return this.$axios
        .$get('/users/' + id)
        .then((result: any) => {
          vuexContext.commit('setProfile', result.profile);
        })
        .catch((e: any) => console.log('error', e));
    },
  },
);

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    // submodule,
  },
});
