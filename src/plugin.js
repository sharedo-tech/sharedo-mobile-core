import { override } from "./app/settings.js";
import { useVuetify } from "./plugins/vuetify.js";
import { useTipTapVuetify } from "./plugins/tiptap-vuetify.js";
import { useRouter } from "./plugins/router.js";
import { useStore } from "./plugins/store.js";

import SharedoAuth from "./infra/authcode.js";
import SharedoFetch from "./infra/fetchWrapper.js";
import SharedoProfile from "./infra/profile.js";
import SharedoTypesTree from "./infra/typesTree.js";

import InstallPrompt from "./services/installPrompt.js";

import CoreUi from "./framework/coreUi.js";
import "./framework/directives.js";

import VBottomNav from "./components/VBottomNav.vue";
import VTopToolbar from "./components/VTopToolbar.vue";
import VBannerSharedo from "./components/VBannerSharedo.vue";
import VTrafficLight from "./components/VTrafficLight.vue";
import VDatetimeTrafficLight from "./components/VDatetimeTrafficLight.vue";
import VRichTextEditor from "./components/VRichTextEditor.vue"
import VBtnSection from "./components/VBtnSection.vue"
import VEditableExpansionPanelHeader from "./components/VEditableExpansionPanelHeader.vue"

import ContactUrlGenerator from "./util/contactUrl.js";
import MapUrlGenerator from "./util/mapUrl.js";
import debounce from "./util/debounce.js";

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
        Vue.component("VRichTextEditor", VRichTextEditor);
        Vue.component("VBtnSection", VBtnSection);
        Vue.component("VEditableExpansionPanelHeader", VEditableExpansionPanelHeader);
    },
}

export {
    useVuetify,
    useTipTapVuetify,
    useRouter,
    useStore,

    // Services
    SharedoAuth,
    SharedoFetch,
    SharedoProfile,
    SharedoTypesTree,
    InstallPrompt,

    // UI
    CoreUi,

    // Components
    VBottomNav,
    VTopToolbar,
    VBannerSharedo,
    VTrafficLight,
    VDatetimeTrafficLight,
    VRichTextEditor,
    VBtnSection,

    // Util
    ContactUrlGenerator,
    MapUrlGenerator,
    debounce
}
