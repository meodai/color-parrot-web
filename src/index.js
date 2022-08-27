import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta'

import App from './app.vue';
import Home from './home.vue';
import Homealt from './homealt.vue';
import Color from './color.vue';
import Colors from './colors.vue';
import store from "./store";

Vue.use(VueMeta)
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Homealt },
  { path: '/color/:color_id', component: Color, name: 'color' },
  { path: '/color/:color_id/:bestof', component: Color , name: 'bestcolor'},
  //{ path: '/:colors_id', component: Colors },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  /*scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      console.log(to, from, savedPosition)
      setTimeout(() => {
        resolve({
          x: 0,
          y: 1000
        })
      }, 500)
    })
  }*/
});

new Vue({
  el: '#app',
  metaInfo: {
    title: 'Color Parrot Compagnion',
    titleTemplate: '%s — Color Information'
  },
  store,
  router,
  render: h => h(App),
});
