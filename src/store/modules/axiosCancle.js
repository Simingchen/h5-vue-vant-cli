/*
 * @title: axios请求 批量取消请求
 * @Description: 每次请求记录到 store，路由切换的时候清除所有记录，cancel 即取消请求
 */
export default {
  namespaced: true,
  state: {
    list: [],
  },
  getters: {
    list: state => state.list,
  },
  mutations: {
    set(state, payload) {
      state.list.push(payload)
    },
    remove(state, payload) {
      state.list.forEach(item => {
        if (item && (typeof item.cancle == "function")) {
          item.cancle()
        }
      })
      state.list = []
    },
  },
  actions: {
    // getDomain({ commit }) {
    //   axios.get(`major-api/domain/v1/valid/${0}`).then((res) => {
    //     commit('setDomain', res)
    //   })
    // },
  },
}
