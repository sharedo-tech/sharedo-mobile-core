import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const useVuetify = (opts = {}) => new Vuetify({ ...opts });

export {
  useVuetify
}

export default new Vuetify({
});
