import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productos: [],
    urlBase: "https://demo.thegrouplab.com/api/",
    token: "",
    techTypes: "technology-types",
    deviceTypes: "device-types",
  },
  mutations: {
    SET_PRODUCTOS_INICIAL(state, productos) {
      state.productos = productos;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setProductosInicial({ commit }, productos) {
      commit("SET_PRODUCTOS_INICIAL", productos);
    },
  },
  modules: {},
});
