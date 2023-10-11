import Vue from 'vue'
import Toast from './Toast.vue'
import Vuetify from 'vuetify/lib'
import { Router } from "../../plugins/router.js"
import { Store } from '../../plugins/store.js'

/* Usage:
 * toast({
 *     message: "...",
 *     color: "...",
 *     icon: "...",
 *     dismissable: true/false,
 *     timeout: 3000
 * }
 * OR
 * toast(message, opts)
 */

const ToastConstructor = Vue.extend(Toast)

const toasts = []

function createCmp(options) {
    const cmp = new ToastConstructor({
        router: Router.instance,
        store: Store.instance
    });

    const vuetifyObj = new Vuetify()
    cmp.$vuetify = vuetifyObj.framework

    Object.assign(cmp, options)
    document.body.appendChild(cmp.$mount().$el)

    return cmp
}

function show(options) {
    if (typeof options === "string") {
        // Convenience override: show(string, opts)
        var msg = options;
        options = arguments[1] || {};
        options.message = msg;
    }

    var prev = toasts[toasts.length - 1];

    const cmp = createCmp(options)
    toasts.push(cmp)

    const PADDING = 7;

    // Toast position = top of last toast + pad
    cmp.bottom = prev
        ? prev.bottom + prev.$el.childNodes[0].offsetHeight + PADDING
        : 0;

    cmp.$on('statusChange', (isActive, wasActive) => {
        if (wasActive && !isActive) {
            cmp.$nextTick(() => {
                var h = cmp.$el.childNodes[0].offsetHeight;

                // Remove from toasts array
                for (var i = toasts.length - 1; i >= 0; i--) {

                    // Move toast above us down
                    toasts[i].bottom -= (h + PADDING);

                    if (toasts[i] === cmp) {
                        toasts.splice(i, 1);
                        break;
                    }
                }

                // Allow fade out animation
                setTimeout(function () {
                    cmp.$destroy()
                    cmp.$el.parentNode.removeChild(cmp.$el)
                }, 400)
            })
        }
    })
}

// toast() -> same as toast.show()
var toast = Object.assign(show, {
    show
    // ...
})

export default toast