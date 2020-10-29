/*
 * @Date: 2020-07-10 19:47:56
 * @LastEditTime: 2020-07-10 20:10:45
 * @Description: 动态获取域名
 */
// @ts-nocheck
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    domainInfo: {},
    domainStatue: false,
  },
  getters: {
    getDomain: (state) => state.domainInfo,
    getDomainStatus: (state) => state.domainStatue,
  },
  mutations: {
    setDomain(state, payload) {
      state.domainInfo = payload
    },
    setDomainStatus(state, payload) {
      state.domainStatue = payload
    },
  },
  actions: {
    getDomain({ commit }) {
      axios.get(`major-api/domain/v1/valid/${0}`).then((res) => {
        commit('setDomain', res)
      })
    },
  },
}
