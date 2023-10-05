import Vue from 'vue'
import Loading from './Loading.vue'
import Vuetify from 'vuetify/lib'
import { Router } from "../../plugins/router.js"

/* Usage:
 * var l = loading()
 * l.dismiss()
 * loading.dismissAll()
 */

const LoadingConstructor = Vue.extend(Loading)

var cmp = null;
var depth = 0;

function createCmp(options) {
    const cmp = new LoadingConstructor({
        router: Router.instance
    });

    const vuetifyObj = new Vuetify()
    cmp.$vuetify = vuetifyObj.framework

    Object.assign(cmp, options)
    document.body.appendChild(cmp.$mount().$el)

    return cmp
}

function show(options) {
    depth++;

    // Don't show multiple overlays
    if (cmp) {
        return cmp;
    }

    cmp = createCmp(options)

    cmp.$on('statusChange', (isActive, wasActive) => {
        if ((wasActive && !isActive) || depth === 0) {

            cmp.$nextTick(() => {

                // Allow fade out animation
                setTimeout(function () {

                    // Has loading() been called in meantime?
                    if (depth > 0 || !cmp) return;

                    cmp.$destroy()
                    cmp.$el.parentNode.removeChild(cmp.$el)
                    cmp = null;
                }, 400)
            })

        }
    })

    cmp.$on('dismiss', () => {
        if (depth > 0) depth--;
        if (depth === 0 && cmp)
            cmp.dismissNow();
    })

    return cmp;
}

function dismissAll() {
    depth = 0;
    if (cmp) {
        cmp.dismissNow();
    }
}

// loading() -> same as loading.show()
var loading = Object.assign(show, {
    show,
    dismissAll,
    // ...
})

export default loading