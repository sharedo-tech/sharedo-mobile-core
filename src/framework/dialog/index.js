import Vue from 'vue'
import Dialog from './Dialog.vue'
import Vuetify from 'vuetify/lib'

/* Usage:
 * dialog(MyComponent, options)
 */

const DialogConstructor = Vue.extend(Dialog)

function createCmp(childComponent, options) {

    // Instantiate dialog
    const cmp = new DialogConstructor()
    const vuetifyObj = new Vuetify()
    cmp.$vuetify = vuetifyObj.framework

    // Mount dialog and add to DOM
    Object.assign(cmp, { childComponent: childComponent, childProps: options })
    document.body.appendChild(cmp.$mount().$el)
    
    return cmp
}

function show(component, options, evts) {
    options = options || {};

    const cmp = createCmp(component, options)

    // We can't trust mounted as it fires to early - use event
    cmp.$emit('shown')
    
    cmp.$on('close', (result) => {
        cmp.active = false;

        if (evts && typeof evts.closing === "function") {
            evts.closing(result);
        }

        // Allow fade out animation
        setTimeout(function() {
            cmp.$destroy()
            cmp.$el.parentNode.removeChild(cmp.$el)
        }, 400)
    })

    return cmp;
}

// dialog() -> same as dialog.show()
var dialog = Object.assign(show, {
    show
    // ...
})

export default dialog