import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

class Store { }

const useStore = config => {
  Store.instance = new Vuex.Store(config);

  return Store.instance;
}

export {
  Store,
  useStore
}