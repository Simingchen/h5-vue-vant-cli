// @ts-nocheck
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    user: {},
    token: '',
  },
  getters: {
    user: (state) => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')),
    token: (state) => () => localStorage.getItem('token'),
    isLogin: (state) => () => {
      // return true
      return !!localStorage.getItem('token') // 测试用
    },
  },
  mutations: {
    user(state, payload) {
      state.user = payload
    },
    token(state, payload) {
      state.token = payload
    },
  },
  actions: {
    login({ commit }, payload) {
      if (payload) {
        return axios.post('/user/v1/login', payload).then((res) => {
          if (res.data.id > 0) {
            commit('user', res.data)
            localStorage.setItem('user', res.data)
          }
          return Promise.resolve(res)
        })
      }
    },
    /**
     * @description: 登录退出
     * @param {type}
     */
    logout({ commit }) {
      console.log('user logout')
      commit('token', '')
      commit('user', {})
      localStorage.clear()
      localStorage.getItem('token')
      return true
    },
  },
}
