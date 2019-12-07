import Vue from 'vue';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router.js';
import Cookie from 'vue-cookie';
import App from './App.vue';

Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Cookie);

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 推荐引擎管理系统`;
  //权限处理
  const role = Vue.cookie.get('role');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (role === 'admin') {
    next();
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
