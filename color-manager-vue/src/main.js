import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$url = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.$url.zh = '/zh'
  Vue.prototype.$url.hunt = '/hunt'
  Vue.prototype.$url.picker = '/picker'
  Vue.prototype.$url.colormind = '/colormind'
} else {
  Vue.prototype.$url.zh = 'http://zhongguose.com'
  Vue.prototype.$url.hunt = 'https://colorhunt.co'
  Vue.prototype.$url.picker = 'http://webcolourdata.com'
  Vue.prototype.$url.colormind = 'http://colormind.io'
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
