// Libraries
import Vuetify from 'vuetify'

// Components
import VTopToolbar from '@/components/VTopToolbar.vue'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('App.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders props.title when passed', () => {
        const msg = 'My Title'
        const wrapper = mount(VTopToolbar, {
            localVue,
            vuetify,
            propsData: { title: msg },
        })

        expect(wrapper.text()).toMatch(msg)
    })
})
