import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const URL = `http://localhost:4100`

export default new Vuex.Store({
  state: {
    status: "",
    env: []
  },
  getters: {
    environments(state) {
      const arrayEnvs = []
      state.env.forEach((env) => {
        arrayEnvs.push({ environment: env.environment, path: env.pathToDatabases, databases: env.databases })
      })
      return arrayEnvs
    }
  },
  mutations: {
    SET_STATUS(state, payload) {
      state.status = payload
    },
    SET_ENV(state, payload) {
      state.env = payload
    }
  },
  actions: {
    fetchStatus({ commit }) {
      fetch(`${URL}/ping`)
        .then((stream) => stream.text())
        .then((data) => commit("SET_STATUS", data))
        .catch((error) => console.error(error))
    },
    fetchEnv({ commit }) {
      fetch(`${URL}/env`)
        .then((stream) => stream.json())
        .then((data) => commit("SET_ENV", data))
        .catch((error) => console.error(error))
    }
  },
  modules: {}
})
