export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async update (context, newMapping) {
      try {
        context.commit('updateUnitTypeMapping', newMapping, { root: true })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
