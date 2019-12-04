import auth from '@/utils/auth'
import userAPI from '@/api/user'
import router from '@/router'
const app = {
  state: {
    userName: '',
    routes: [],
    token: '',
    routesStatus: 'unset',
    socket: null,
  },
  getters: {
    userName: (state) => state.userName,
    routes: (state) => state.routes,
    token: (state) => state.token,
    routesStatus: (state) => state.routesStatus,
    socket: (state) => state.socket
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
    'INIT_SOCKET': (state, socket) => {
      state.socket = socket
    },
    'CLEAR_SOCKET': (state) => {
      state.socket.close()
      state.socket = null
    },
  },
  actions: {
    signIn({ commit }, userInfo) {
      const params = {
        userName: userInfo.userName.trim(),
        password: userInfo.password.trim()
      }
      return new Promise((resolve,reject) => {
        userAPI.signIn(params)
          .then((res) => {
            commit('SET_USERNAME', params.userName)
            resolve(res)
          }).catch((error) => {
            reject(error)
          })
      })
    },
    signUp({ commit }, userInfo) {
      const params = {
        userName: userInfo.userName.trim(),
        password: userInfo.password.trim(),
        email: userInfo.email.trim(),
        inviteCode: userInfo.inviteCode.trim()
      }
      return new Promise((resolve,reject) => {
        userAPI.signUp(params)
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
      const token = `${rawToken}`
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
          }).catch((error) => {
            reject(error)
          })
      })
    },
    initSocket({ commit }, socket) {
      commit('INIT_SOCKET', socket)
    },
    setRoutesStatus({ commit }, status) {
      commit('SET_ROUTES_STATUS', status)
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        userAPI.logout().then(() => {
          auth.clearAllInfo()
          commit('CLEAR_SOCKET')
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
export default app
