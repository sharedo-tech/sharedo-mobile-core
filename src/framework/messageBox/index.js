import Vue from 'vue'
import MessageBox from './MessageBox.vue'
import Vuetify from 'vuetify/lib'
import { Router } from "../../plugins/router.js"

/* Usage:
 * messageBox({
 *    title: ..., 
 *    message: ...,
 *    btns: [
 *        {text: ..., color: ..., handler: ...},
 *        ...
 *    ]
 * })
 */

const MessageBoxConstructor = Vue.extend(MessageBox)

function createCmp(options) {
    const cmp = new MessageBoxConstructor({
        router: Router.instance
    });

    const vuetifyObj = new Vuetify()
    cmp.$vuetify = vuetifyObj.framework

    Object.assign(cmp, options)
    document.body.appendChild(cmp.$mount().$el)

    return cmp
}

function show(options) {
    const cmp = createCmp(options)

    cmp.$on('statusChange', (isActive, wasActive) => {
        if (wasActive && !isActive) {

            // Allow fade out animation
            setTimeout(function () {
                cmp.$destroy()
                cmp.$el.parentNode.removeChild(cmp.$el)
            }, 400)
        }
    })

    cmp.$on('buttonClicked', (btn) => {
        if (typeof btn.handler === "function") {
            btn.handler()
        }
    })
}

// messageBox() -> same as messageBox.show()
var messageBox = Object.assign(show, {
    show
    // ...
})

export default messageBox