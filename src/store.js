import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const apiURL = new URL('https://api.color.pizza/v1/');

export default new Vuex.Store({
  state: {
    currentColor: {
      name: '',
      hex: '#000',
      rgb: {r: 0, g: 0, b: 0 },
      hsl: {h: 0, s: 0, l: 0 },
      luminance: 0,
      requestedHex: '#000',
      distance: 0
    },
    isReady: false,
  },
  getters: {
  },
  mutations: {
    SET_CURRENTCOLOR(state, color) {
      state.currentColor = color;
    },
    SET_READY(state, readyState) {
      state.isReady = readyState;
    },
  },
  actions: {
    GET_COLOR({commit}, {values, goodnamesonly}) {
      const params = {
        values,
        goodnamesonly,
        noduplicates: true,
      }

      apiURL.search = new URLSearchParams(params).toString();

      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          commit('SET_CURRENTCOLOR', data.colors[0]);
          commit('SET_READY', true);
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  }
});
