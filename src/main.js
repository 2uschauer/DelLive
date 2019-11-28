if (module.hot) { module.hot.accept() }
import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import '@/routerControl'
import '@/icons' // icon
import '@/styles/element-variables.scss'
import lang from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import locale from 'element-ui/lib/locale'
import ElementUI from 'element-ui';
locale.use(lang)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
