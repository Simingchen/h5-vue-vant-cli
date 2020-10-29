import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import VueLazyLoad from 'vue-lazyload'
import config from './projectConfig.js' // 项目配置

import '@/plugins/index.js' // 全局插件
import '@utils/component.js' // 全局组件
import '@utils/directive.js' // 全局指令
import '@utils/filter.js' // 全局过滤器
import '@utils/mixin.js' // 全局混入

Vue.prototype.$config = config
Vue.prototype.$eventBus = new Vue()

Vue.use(VueLazyLoad, {
  error: require('@img/def_gb.png'),
  attempt: 1,
  lazyComponent: true,
})

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// 移动端开发者工具
if (process.env.NODE_ENV == 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}
