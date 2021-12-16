// Libraries
import Vuetify from 'vuetify'

// Components
import VBottomNav from '@/components/VBottomNav.vue'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('App.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders', () => {
        const wrapper = mount(VBottomNav, {
            localVue,
            vuetify,
        })
    })
})
