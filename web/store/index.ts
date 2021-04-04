import { getAccessorType, mutationTree, actionTree } from 'typed-vuex';
import Cookie from 'js-cookie';

// Import all your submodules
// import * as submodule from '~/store/submodule'

interface AuthData {
  isLogin: Boolean;
  email: String;
  password: String;
}

export const state = () => ({
  token: '',
});

type RootState = ReturnType<typeof state>;

export const getters = {
  token: (state: RootState) => state.token,
  isAuthenticated(state: RootState) {
    return state.token !== '';
  },
};
export const mutations = mutationTree(state, {
  setToken(state, newValue: string) {
    state.token = newValue;
  },
  clearToken(state) {
    console.log('clearToken', state);
    state.token = '';
  },
});
export const actions = actionTree(
  { state, getters, mutations },
  {
    authenticateUser(_vuexContext, authData: AuthData): Promise<any> {
      let authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        process.env.apiKey;
      if (!authData.isLogin) {
        authUrl =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          process.env.apiKey;
      }
      return this.$axios
        .$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((result: any) => {
          _vuexContext.commit('setToken', result.idToken);
          localStorage.setItem('token', result.idToken);
          localStorage.setItem(
            'tokenExpiration',
            String(
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000,
            ),
          );
          Cookie.set('jwt', result.idToken);
          Cookie.set(
            'expirationDate',
            String(
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000,
            ),
          );
        })
        .catch((e: any) => console.log('error', e));
    },
    // nuxtServerInit(_vuexContext, nuxtContext) {
    //   console.log(nuxtContext)
    // },
    setLogoutTimer(vuexContext, duration) {
      setTimeout(() => {
        vuexContext.commit('clearToken');
      }, duration);
    },
    initAuth(vuexContext, req) {
      let token;
      let expirationDate;
      if (req) {
        if (!req.headers.cookie) {
          return;
        }
        const jwtCookie = req.headers.cookie
          .split(';')
          .find((c: String) => c.trim().startsWith('jwt='));
        if (!jwtCookie) {
          return;
        }
        token = jwtCookie.split('=')[1];
        expirationDate = req.headers.cookie
          .split(';')
          .find((c: String) => c.trim().startsWith('expirationDate='))
          .split('=')[1];
      } else {
        token = localStorage.getItem('token');
        expirationDate = localStorage.getItem('tokenExpiration');
      }
      if (new Date().getTime() > +expirationDate || !token) {
        vuexContext.dispatch('logout');
        return;
      }
      vuexContext.commit('setToken', token);
    },
    logout(vuexContext) {
      vuexContext.commit('clearToken');
      Cookie.remove('jwt');
      Cookie.remove('expirationDate');
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
      }
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
