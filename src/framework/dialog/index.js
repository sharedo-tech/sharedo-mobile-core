import Vue from 'vue'
import Dialog from './Dialog.vue'
import Vuetify from 'vuetify/lib'

/* Usage:
 * dialog(MyComponent, options)
 */

const DialogConstructor = Vue.extend(Dialog)

function createCmp(options) {

    // Instantiate dialog
    const cmp = new DialogConstructor()
    const vuetifyObj = new Vuetify()
    cmp.$vuetify = vuetifyObj.framework

    // Instantiate child component
    const ChildConstructor = Vue.extend(options.component)
    const cmpChild = new ChildConstructor()
    cmpChild.$vuetify = vuetifyObj.framework
    Object.assign(cmpChild, options)

    // Put child into dialog slot
    cmp.$slots.default = [cmpChild.$mount()._vnode]

    // Mount dialog and add to DOM
    Object.assign(cmp, options)
    document.body.appendChild(cmp.$mount().$el)
    
    return { parent: cmp, child: cmpChild }
}

function show(component, options, evts) {
    options = options || {};
    options.component = component
    const cmps = createCmp(options)

    cmps.child.$on('close', (result) => {
        cmps.parent.active = false;

        if (evts && typeof evts.closing === "function") {
            evts.closing(result);
        }

        // Allow fade out animation
        setTimeout(function() {
            cmps.child.$destroy()
            cmps.parent.$destroy()
            cmps.parent.$el.parentNode.removeChild(cmps.parent.$el)
        }, 400)
    })

    return cmps.child;
}

// dialog() -> same as dialog.show()
var dialog = Object.assign(show, {
    show
    // ...
})

export default dialog