# 项目

> 基于 `webpack` + `vue` + `vuex` + `vue-router` 搭建，SPA(单页面)模式。详细文档在 `readme.md`

## 运行环境

- [node.js >= v12.x ](https://nodejs.org/)
- npm > v6.5，node.js 中已包含
- 现代浏览器，Chrome、Firefox、Safari、Edge 等，不包含 Internet Explorer

## 使用方法

```bash
# 注册淘宝镜像
$ npm i --registry=https://registry.npm.taobao.org

npm install
cnpm install
```

### 本地热重载开发环境

#### 网址：localhost:10096 或者 127.0.0.1:10096

```
npm start
```

### 生成环境打包和运行方法

```
npm run build
```

### 目录结构

```
├── public                          项目配置
│   ├── index.html                  入口页面
│   └── favicon.ico
├── package.json                    npm包配置文件，依赖包等信息
├── src                             项目源码目录
│   ├── main.js                     入口js文件
│   ├── app.vue                     根组件
│   ├── components                  公共组件目录
│   ├── assets                      资源目录
│   ├── data                        静态数据目录
│   ├── layouts                     页面布局组件目录
│   ├── plugins                     vue相关插件
│   ├── style                       css样式目录
│   ├── utils                       工具函数目录
│   ├── store                       应用级数据状态管理
│   │   └── index.js
│   └── views                       页面目录
└── vue.config.js                   VUE配置文件
```

### 开发统筹

1. 使用框架 VUE 2.0 + Vant
2. 主包 vue, vueX, axios 等不打入内，由 DNS 引用
3. 确定主题，less , js 颜色变量
4. request 请求的配置封装，cancle 取消重复请求，取消所有请求
5. 主题组件 vant 的二次样式修改
6. api 以模块进行存放管理
7. 工具分管，utils, filter 过滤器，mixin 全局方法，directive 指令
8. webpack alias 别名，打包 img 图片限制
9. readme 文档等机制
10. 动态路由机制：history，路由变化，取消上一路的所有请求
11. 统一配置出入口 projectConfig.js
12. 引入 vconsole 打印移动端信息
13. 项目为自动路由 文档：https://www.npmjs.com/package/vue-router-auto
14. 页面 layout, 默认页面 layout/default.vue 文档：https://github.com/ktsn/vue-router-layout
15. style 下 less 文件自动引入， assets css 样式文件自动引入
16. lodash 等工具类，业务上引用即可，没必要全局使用，使用地方不多
17. 全局组件引入 utils/component.js, 组件存放 components/global
18. store 模块化自动引入，文件夹命名，mutations 使用 restful 类格式（set, delete）,单个动词操作
19. vscode 配置扩展保存立即格式化，跟项目中 .eslintrc.js 搭配使用
20. vant 样式已转换成 750 基准存放 assets/css，rem 计算公式 public/index.html


### 项目须知

1. promise 使用同步写法，async / await
2. route 中文传参数 
   * 传参数 const par = encodeURIComponent(JSON.stringify(item))
   * 接收参数 const detail = JSON.parse(decodeURIComponent(this.$route.query.item));
3. 页面命名，列表命名为 **List, 如 historyList


### 问题点

1. rem 设备字体设置后的影响
2. 未登录拦截
3. 接口 API
4. 样式怎么自动引入？
5. 首页加载数据的考量点，切换加载完后，再次切换判定已经加载的时间，确定是否加载新的数据
6. 用户抬头，用户等级独立组件？
7. vue中实现axios路由跳转取消上个路由页面的所有请求 和 取消当前路由页面的重复请求 (可以参考这个：https://www.cnblogs.com/zhaofeis/p/11422777.html)

### 页面说明

setting  
 index 设置
about 关于
accountSafe 账号安全
bindphone 绑定手机
cancellation 注销账号
changePassword 修改密码
feedback 意见反馈
feedbackDetail 反馈记录详情
notice 公告
noticeDetail 公告详情
