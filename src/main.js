import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import "./framework/directives.js";
import '../public/global.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [];
const router = new VueRouter({ routes });

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
