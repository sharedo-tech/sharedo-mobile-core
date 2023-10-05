import Vue from 'vue'
import ActionSheet from './ActionSheet.vue'
import Vuetify from 'vuetify/lib'
import { Router } from "../../plugins/router.js"

/* Usage:
 * actionSheet({
 *    items: [
 *        {
 *          type: "button"/"header", // default "button"
 *          text: ...,
 *          color: ...,
 *          icon: ...,
 *          handler: function() {...}
 *        },
 *        ...
 *    ]
 * })
 */

const ActionSheetConstructor = Vue.extend(ActionSheet)

function createCmp(options) {
    const cmp = new ActionSheetConstructor({
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
            setTimeout(function() {
                cmp.$destroy()
                cmp.$el.parentNode.removeChild(cmp.$el)
            }, 400)
        }
    })
    
    cmp.$on('itemClicked', (item) => {
        if (typeof item.handler === "function") {
            item.handler();
        }
    })
}

// actionSheet() -> same as actionSheet.show()
var actionSheet = Object.assign(show, {
    show
    // ...
})

export default actionSheet