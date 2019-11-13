const app = {
  state: {
    breadcrumbs: []
  },
  getters: {
    breadcrumbs: (state) => state.breadcrumbs
  },
  mutations: {
    SET_BREADCRUMBS: (state, breadcrumbs) => {
      state.breadcrumbs = breadcrumbs
    }
  },
  actions: {
    setBreadcrumbs({ commit }, breadcrumbs) {
      commit('SET_BREADCRUMBS',breadcrumbs)
    }
  }
}
export default app
