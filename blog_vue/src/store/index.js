import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 放置数据
  state: {
    user: null,
    token: null,
    homeSearchValue: ''
  },
  // 过滤state中的配置
  getters: {
  },
  // 修改数据
  mutations: {
    // 传递home页面的搜索值
    m_search (state, value) {
      state.homeSearchValue = value
    },
    // 判断用户登陆状态
    m_login (state, data) {
      state.user = data.user
      state.token = data.token
      localStorage.token = data.token
    },
    // 获取用户最新数据
    m_upuaerdata (state, user) {
      state.user = user
    }
  },
  // 发送异步
  actions: {
    async a_updatalogindata ({ commit }) {
      if (!localStorage.token) return
      const { data } = await Vue.prototype.$http.get('/api/checklogin')
      if (data.code === 200) {
        commit('m_login', {
          user: data.user,
          token: localStorage.token
        })
      }
    },
    async a_updataUser ({ state, commit }) {
      const { data } = await Vue.prototype.$http.get('/api/User?id=' + state.user._id)
      if (data.code === 200) {
        commit('m_upuaerdata', data.user)
      }
    }
  },
  modules: {
  }
})
