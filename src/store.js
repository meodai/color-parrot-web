import Vue from 'vue';
import Vuex from 'vuex';
import { toRgb, toHsl, toLab, rgbToCmyk } from './color-utils';

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
    colorMode: 'hex',
    colorModes: {
      hex: {
        label: 'hex',
        fn: color => color,
      },
      rgb: {
        label: 'RGB',
        fn: color => {
          const { r, g, b } = toRgb(color);
          return `${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)}`;
        },
      },
      gl: {
        label: 'RGB Percent',
        fn: color => {
          const { r, g, b } = toRgb(color);
          return `${Math.round(r * 100)}% ${Math.round(g * 100)}% ${Math.round(b * 100)}%`;
        },
      },
      hsl: {
        label: 'HSL',
        fn: color => {
          const { h, s, l } = toHsl(color);
          return `${Math.floor(h || 0)}° ${Math.floor(s * 100)}% ${Math.floor(l * 100)}%`;
        }
      },
      cmyk: {
        label: 'CMYK',
        fn: color => rgbToCmyk(color).map(v => `${Math.floor(v * 100)}%`).join(' '),
      },
      lab: {
        label: 'LAB',
        fn: color => {
          const { l, a, b } = toLab(color);
          return `${Math.floor(l)} ${Math.floor(a)} ${Math.floor(b)}`;
        },
      },
    }
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
