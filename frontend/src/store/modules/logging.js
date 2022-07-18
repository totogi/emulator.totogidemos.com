export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async toggleVerbosity (context) {
      try {
        context.commit('toggleVerboseLogging', null, { root: true })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
