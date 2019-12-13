// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './assets/css/reset.css'
import 'animate.css'

import axios from 'axios'
Vue.prototype.$axios = axios;

import qs from 'qs'
Vue.prototype.$qs = qs;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//响应拦截
axios.interceptors.response.use(response => {
  console.log("-------start" + response.config.url + "-------------");
  console.log(response);
  console.log("-----------end-----------");
  if (response.data.code == -1) {
    router.replace("/login")
    return;
  }
  return response
})

//全局守卫-登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }
  if (!localStorage.getItem("isType")) {
    next('/login');
    return;
  }
  next();
})

import filters from './filter'
for (let i in filters) {
  Vue.filter(i, filters[i])
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
