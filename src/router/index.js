import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import autoRouter from 'vue-router-auto' // 自动路由
import { createRouterLayout } from 'vue-router-layout' // 页面layout

Vue.use(VueRouter)

const RouterLayout = createRouterLayout((layout) => {
  return import('@components/layout/' + layout + '.vue')
})

let routes = autoRouter({
  rc: require.context('@/views', true, /\.vue$/), // 页面级的.vue存放位置，必传
  redirect: '/bookHome', // '/'的重定向，可选，默认为''  // 根目录重定向到书城
  rootFile: 'views', // 页面级的.vue存放的文件夹，可选，默认为:views
})

console.log(routes)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes,
    },
    {
      path: '/login',
      redirect: '/account/login', // 登录页
    },
    {
      path: '/bookrack',
      redirect: '/bookrack/bookrack', // 书架
    },
    {
      path: '*',
      redirect: '/account/404', // 重定向到错误页面
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition
      ? savedPosition
      : {
        x: 0,
        y: 0,
      }
  },
})
// 跳转前
router.beforeEach((to, from, next) => {
  //路由发生变化清除所有 axios 请求
  store.commit('axiosCancle/remove')

  //路由发生变化修改页面title
  // document.title = to.meta.title || '阅读'

  //跳转路由验证用户登录状态
  if (store.getters['user/isLogin']()) {
    // 判断域名并获取域名
    if (!store.getters['domain/getDomainStatus']) {
      store.commit('domain/setDomainStatus', true)
      store.dispatch('domain/getDomain')
    }
    if (to.path === '/index') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.meta.isAuth) {
      next({ path: '/index' })
    } else {
      next()
    }
  }
})
// 跳转后
router.afterEach(function (to, from) { })

export default router
