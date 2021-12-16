import Vue from 'vue'

import {override} from "./app/settings.js";

import SharedoAuth from "./infra/authcode.js"
import SharedoFetch from "./infra/fetchWrapper.js"
import SharedoProfile from "./infra/profile.js"

import CoreUi from "./framework/coreUi.js";

import VBottomNav from "./components/VBottomNav.vue";
import VTopToolbar from "./components/VTopToolbar.vue";

export default {

    // Declare install function executed by Vue.use()
    install(Vue, options) {

        // Override settings
        override(options || {});

        // Convenience property for UI helpers (this.$coreUi or $coreUi)
        Vue.prototype.$coreUi = CoreUi;

        // Register components globally
        Vue.component("VBottomNav", VTopToolbar);
        Vue.component("VTopToolbar", VTopToolbar);
    },

    // Directives
    directives: {
        visible: Vue.directive('visible', function (el, binding) {
            el.style.visibility = binding.value ? 'visible' : 'hidden';
        })
    }
}

export {
    // Services
    SharedoAuth,
    SharedoFetch,
    SharedoProfile,

    // UI
    CoreUi,

    // Components
    VBottomNav,
    VTopToolbar,
}
