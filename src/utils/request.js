
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { BASE_URL } from './configProcess'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: false,
})

// 使用 cancel token 取消请求
// 对每个请求进行标记，并把 cancle 方法储存，如果再次请求中有相同的就取消上一次请求，重新请求
let cancelToken = axios.CancelToken;

// 请求 pending 对象
const pending = {}
const removePending = (item, isRequest = false) => {
  // 请求中存在相同的重复请求去除掉，避免短时间重复请求
  if (pending[item] && isRequest) {
    pending[item]('取消重复请求')
  }
  delete pending[item]
}
// 获取请求标志，对请求队列进行命名
const getRequestMarker = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}

instance.interceptors.request.use(
  (config) => {
    // 请求携带自定义token
    if (localStorage.get('token')) {
      config.headers['token'] = localStorage.get('token')
    }

    // 发送前执行一下取消操作，把相同的重复请求去除掉，避免短时间重复请求
    let requestMarker = getRequestMarker(config, true)
    removePending(requestMarker, true)

    // 储存 pending 对象
    config.cancelToken = new cancelToken(cancel => {
      pending[requestMarker] = cancel

      // 提交到 store 进行记录
      store.commit('axiosCancle/set', { cancel })
    })

    // loading
    if (config.isLoading) { // 如果配置了isLoading: false，则不显示loading
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
    }

    return config
  },
  (err) => {
    Toast.clear()
    return Promise.reject(err)
  }
)

instance.interceptors.response.use((response) => {
  // 响应后再执行一下取消操作，把已经完成的请求从 pending 中移除
  let requestMarker = getRequestMarker(response.config, true)
  removePending(requestMarker)

  // 清除 loading
  Toast.clear()

  const codeReg = /^20\d+/
  // 返回成功处理
  if (response.headers['token']) {
    // 自动刷新token
    localStorage.setItem('token', response.headers['token'])
  }
  if (codeReg.test(response.status)) {
    printData(response)
    return Promise.resolve(response.data)
  } else {
    printError(response)
    return Promise.reject(response.data)
  }
}, (error) => {
  // 清除 loading
  Toast.clear()

  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.response.statusText = '错误请求'
        break
      case 401:
        error.response.statusText = '未授权，请重新登录'
        break
      case 403:
        error.response.statusText = '拒绝访问'
        break
      case 404:
        error.response.statusText = '请求错误,未找到该资源'
        break
      case 405:
        error.response.statusText = '请求方法未允许'
        break
      case 408:
        error.response.statusText = '请求超时'
        break
      case 500:
        error.response.statusText = '服务器端出错'
        break
      case 501:
        error.response.statusText = '网络未实现'
        break
      case 502:
        error.response.statusText = '网络错误'
        break
      case 503:
        error.response.statusText = '服务不可用'
        break
      case 504:
        error.response.statusText = '网络超时'
        break
      case 505:
        error.response.statusText = 'http版本不支持该请求'
        break
      default:
        error.response.statusText = `连接错误${error.response.status}`
    }
  }
  return Promise.reject(error)
}
)

const printError = (response) => {
  if (process.env.NODE_ENV == 'development') {
    let url = response.config.url.replace(response.config.baseURL, '')
    console.groupCollapsed('%cError >>>>>>>>>>>>>>> ' + response.config.method.toUpperCase() + ' ' + url, 'color: #e74c3c')
    printReq('request query', response.config.params)
    printReq('request payload', response.config.data)
    if (response.data) {
      printErrorCode(response.data.code)
      printMessage(response.data.message)
    }
    console.groupEnd()
  }
}

const printData = (response) => {
  if (process.env.NODE_ENV == 'development') {
    let url = response.config.url.replace(response.config.baseURL, '')
    groupStart(response.config.method.toUpperCase() + ' ' + url)
    printReq('请求参数, url query', response.config.params)
    printReq('请求参数, payload body', response.config.data)
    printRes('返回内容', response.data.data || response.data)
    printMessage(response.data.message)
    console.groupEnd()
  }
}

const rainbow = ['color: #e74c3c', 'color: #e67e22', 'color: #f1c40f', 'color: #2ecc71', 'color: #1abc9c', 'color: #3498db', 'color: #9b59b6', 'color: #333']
const printErrorCode = (val) => {
  if (val) {
    console.log(`%cserver error code: ` + val, 'background:linear-gradient(to right,#ff6b81, #ff4757);color:#fff;padding:5px 10px')
  }
}
const printMessage = (val) => {
  if (val) {
    console.log(`%cresponse message: ` + val, 'background:linear-gradient(to top,#ff7f50, #ff6b81);color:#fff;padding:5px 10px')
  }
}
const printRes = (type, val) => {
  if (val) {
    console.log('%c' + (type || 'response data') + ':', 'background:linear-gradient(to left,#2ed573, #1e90ff);color:#fff;padding:5px 15px;')
    console.log({
      ...val,
    })
  }
}
const printReq = (type, val) => {
  if (val) {
    if (typeof val === 'string') {
      val = JSON.parse(val)
    }
    console.log('%c' + (type || 'request payload') + ':', 'background:linear-gradient(to right,#2ed573, #1e90ff);color:#fff;padding:5px 15px')
    console.log(val)
  }
}
const groupStart = (val) => {
  let cord = []
  while (cord.length < 7) {
    let n = Math.floor(Math.random() * 7)
    if (!cord.includes(rainbow[n])) {
      cord.push(rainbow[n])
    }
  }
  console.groupCollapsed('%cSuccess %c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val, 'color: #2ecc71', ...cord, 'color: #333')
}

export default instance

const api = {
  get(url, params = {}, config = {}) {
    const defConfig = {}
    if (Object.keys(params).length > 0) {
      Object.assign(defConfig, { params })
    }
    if (config) Object.assign(defConfig, config)
    return axios.get(url, defConfig)
  },
  delete(url, params = {}, config = {}) {
    const defConfig = {}
    if (Object.keys(params).length > 0) {
      Object.assign(defConfig, { params })
    }
    if (config) Object.assign(defConfig, config)
    return axios.delete(url, defConfig)
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config)
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config)
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config)
  },
}

//挂到Vue对象上面，在所有Vue实例中可用【this.$api，this.$http】调用
Vue.prototype.$http = axios
Vue.prototype.$api = api

export { axios, api }
