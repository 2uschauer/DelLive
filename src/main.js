if (module.hot) { module.hot.accept() }
import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import locale from 'element-ui/lib/locale'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'

import '@/icons' // icon
locale.use(lang)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
