import { override } from "./app/settings.js";

import SharedoAuth from "./infra/authcode.js";
import SharedoFetch from "./infra/fetchWrapper.js";
import SharedoProfile from "./infra/profile.js";

import InstallPrompt from "./services/installPrompt.js";

import CoreUi from "./framework/coreUi.js";
import "./framework/directives.js";

import VBottomNav from "./components/VBottomNav.vue";
import VTopToolbar from "./components/VTopToolbar.vue";
import VBannerSharedo from "./components/VBannerSharedo.vue";
import VTrafficLight from "./components/VTrafficLight.vue";
import VDatetimeTrafficLight from "./components/VDatetimeTrafficLight.vue";

export default {

    // Declare install function executed by Vue.use()
    install(Vue, options) {

        // Override settings
        override(options || {});

        // Convenience property for UI helpers (this.$coreUi or $coreUi)
        Vue.prototype.$coreUi = CoreUi;

        // Register components globally
        Vue.component("VBottomNav", VBottomNav);
        Vue.component("VTopToolbar", VTopToolbar);
        Vue.component("VBannerSharedo", VBannerSharedo);
        Vue.component("VTrafficLight", VTrafficLight);
        Vue.component("VDatetimeTrafficLight", VDatetimeTrafficLight)
    },
}

export {
    // Services
    SharedoAuth,
    SharedoFetch,
    SharedoProfile,
    InstallPrompt,

    // UI
    CoreUi,

    // Components
    VBottomNav,
    VTopToolbar,
    VBannerSharedo,
    VTrafficLight,
    VDatetimeTrafficLight
}
