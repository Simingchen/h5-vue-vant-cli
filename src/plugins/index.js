// plugins 文件夹下的文件安装到 VUE 对象中

import Vue from 'vue'

const componentVue = require.context('@/plugins', false, /\.js$/)

// 剔除 入口 index.js
let newList = componentVue.keys().filter(item => item.indexOf('index.js') == -1)

// 安装各文件插件
newList.forEach((fileName) => {
  const componentConfig = componentVue(fileName)
  Vue.use(componentConfig.default || componentConfig)
})