import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './app.vue';
import Color from './color.vue';
import Colors from './colors.vue';
import store from "./store";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Colors },
  { path: '/color/:color_id', component: Color },
  { path: '/palette/:colors_id', component: Colors }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
