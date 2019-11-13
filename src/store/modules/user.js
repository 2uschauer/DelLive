import auth from '@/utils/auth'
import userAPI from '@/api/user'
import router from '@/router'
const app = {
  state: {
    userName: '',
    routes: [],
    token: '',
    routesStatus: 'unset'
  },
  getters: {
    userName: (state) => state.userName,
    routes: (state) => state.routes,
    token: (state) => state.token,
    routesStatus: (state) => state.routesStatus
  },
  mutations: {
    'SET_USERNAME': (state, userName) => {
      state.userName = userName
    },
    'SET_ROUTES': (state, routes) => {
      state.routes = routes
    },
    'SET_TOKEN': (state, token) => {
      state.token = token
    },
    'SET_ROUTES_STATUS': (state, routesStatus) => {
      state.routesStatus = routesStatus
    },
  },
  actions: {
    login({ commit }, userInfo) {
      const params = {
        userName: userInfo.userName.trim(),
        password: userInfo.password.trim()
      }
      return new Promise((resolve,reject) => {
        userAPI.login(params)
          .then((res) => {
            commit('SET_USERNAME', params.userName)
            resolve(res)
          }).catch((error) => {
            reject(error)
          })
      })
    },
    getUserInfo({ commit }) {
      const userInfo = auth.getUserInfo()
      commit('SET_USERNAME', userInfo.userName)
      commit('SET_ROUTES', userInfo.routes)
      commit('SET_TOKEN', userInfo.token)
    },
    getRoutesByToken({ commit, state }, rawToken) {
      const token = `Bearer ${token}`
      commit('SET_TOKEN', token)
      return new Promise((resolve, reject) => {
        userAPI.getRoutesByToken()
          .then((res) => {
            const routes = !Array.isArray(res.data) ? [res.data] : res.data
            if (routes.length === 0) reject(res)
            else {
              auth.setUserInfo({ userName: state.userName, token, routes })
              commit('SET_ROUTES',routes)
              router.setRoutes(routes,router)
              resolve()
            }
          }).cathc((error) => {
            reject(error)
          })
      })
    },
    setRoutesStatus({ commit }, status) {
      commit('SET_ROUTES_STATUS', status)
    },
    logout() {
      return new Promise((resolve, reject) => {
        auth.clearAllInfo()
        resolve()
      })
    }
  }
}
export default app
