import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui';               /** element-UI */
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/public.css'; /** css 進入點 */

import VueLazyload from 'vue-lazyload'

const loadimage = require('./assets/images/loading_spinner.gif')
const errorimage = require('./assets/images/loading_spinner.gif')

Vue.use(VueLazyload, {
  preLoad: 0,
  error: errorimage,
  loading: loadimage,
  attempt: 0,
  dispatchEvent: true
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


Vue.use(ELEMENT);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
