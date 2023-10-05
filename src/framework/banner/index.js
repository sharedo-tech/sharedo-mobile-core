import Vue from 'vue'
import Banner from './Banner.vue'
import Vuetify from 'vuetify/lib'
import { Router } from "../../plugins/router.js"

/* Usage:
 * banner({
 *     message: "...",
 *     btns: [
 *         {text: ..., color: ..., handler: ...},
 *         ...
 *     ]
 * })
 */
const BannerConstructor = Vue.extend(Banner)

function createCmp(options) {
    const cmp = new BannerConstructor({
        router: Router.instance
    });

    const vuetifyObj = new Vuetify()
    cmp.$vuetify = vuetifyObj.framework

    Object.assign(cmp, options)

    // Add to top of FIRST container (normally only one)
    var container = document.getElementsByClassName("container")[0]
    if (container)
        container.prepend(cmp.$mount().$el)
    else
        console.warn("Can't add banner - no container")

    return cmp
}

function show(options) {
    const cmp = createCmp(options)

    cmp.$on('statusChange', (isActive, wasActive) => {
        if (wasActive && !isActive) {
            cmp.$nextTick(() => {

                // Allow fade out animation
                setTimeout(function () {
                    cmp.$destroy()
                    cmp.$el.parentNode.removeChild(cmp.$el)
                }, 400)
            })
        }
    })

    cmp.$on('buttonClicked', (btn) => {
        if (typeof btn.handler === "function") {
            if (btn.handler() !== false) {
                cmp.close()
            }
        }
        else {
            cmp.close()
        }
    })

    return cmp
}

// banner() -> same as banner.show()
var banner = Object.assign(show, {
    show
    // ...
})

export default banner