<template>
    <v-app>
        <v-main class="has-bottom-nav">
            <VTopToolbar title="Sharedo Mobile Core package">
                    
                <!-- Override side menu content -->
                <template slot="menu" slot-scope="{toggleMenu}">
                    <v-treeview
                        :items="menuItems"
                        item-key="id"
                        dense
                        open-all
                    >
                    <template slot="label" slot-scope="{ item }">
                      <a class="text-decoration-none" :href="'#' + item.id" @click="toggleMenu()">{{ item.name }}</a>
                    </template>
                    </v-treeview>
                </template>

            </VTopToolbar>

            <v-container>
                <h2 id="getting-started" class="primary--text">Getting started</h2>

                <h3 id="about">About this package</h3>
                <p>
                    This is an npm package containing reusable components and services
                    to help kick-start your sharedo mobile app. It is hosted
                    on <a href="https://github.com/sharedo-tech/sharedo-mobile-core">github</a> and available
                    to install via <a href="https://www.npmjs.com/package/@sharedo/mobile-core">npm</a>.
                </p>
                <p>
                    Check out the <a href="https://github.com/sharedo-tech/sharedo-sample-mobile-app">sample app</a> demonstrating example usage.
                </p>

                <h3 id="language-and-tools">Language and tools</h3>
                <p>
                    We recommend Vue and Vuetify to make your app look great,
                    and maintain consistency with the components contained
                    within this package.
                </p>

                <h3 id="icons">Icons</h3>
                <p>
                    You can use any icon from this library: <a href="https://materialdesignicons.com">Material Design Icons</a>
                </p>

                <h3 id="responsive">Responsive layout</h3>
                <p>
                    The components in this package are all responsive, making the
                    best use of space on either mobile or desktop browsers.
                </p>

                <h3 id="installation">Installation</h3>
                <p>
                    First, create your Vuetify app:
                    <a
                        href="https://vuetifyjs.com/en/getting-started/installation/"
                        target="_blank"
                        >Getting started with Vuetify</a
                    >
                </p>
                <p>
                    <v-alert
                        border="bottom"
                        colored-border
                        type="warning"
                        elevation="2"
                    >
                        Vue 3 is not officially supported yet for Vuetity apps,
                        so we recommend sticking to Vue 2.
                    </v-alert>
                </p>
                <p>Create a dependency on this package as follows:</p>
                <p class="ml-2">
                    <code>npm install @sharedo/mobile-core</code>
                </p>
                <p>Now put this in your <code>main.js</code>:</p>
                <p class="ml-2">
                    <code>import '@sharedo/mobile-core/global.css'</code><br />
                    <code>import Core from '@sharedo/mobile-core'</code><br />
                    <br />
                    <code>// Registers all components globally</code><br />
                    <code>Vue.use(Core, settings);</code>
                </p>
                <p>where <code>settings</code> contains the following:</p>
                <p class="ml-2">
                    <code>{</code><br />
                    <code class="ml-3">identity: (sharedo identity URL),'</code><br />
                    <code class="ml-3">api: (sharedo URL),</code><br />
                    <code class="ml-3">clientId: "e.g. mobile-app",</code><br />
                    <code class="ml-3">clientSecret: "e.g. not a secret",</code><br />
                    <code class="ml-3">redirectUri: "https://localhost:8080/oAuthReply"</code><br />
                    <code>}</code>
                </p>

                <h2 id="services" class="primary--text">Services</h2>

                <h3 id="SharedoAuth">SharedoAuth</h3>
                <p>
                    Initialise this service in your <code>main.js</code> to help
                    manage sharedo access tokens. It will automatially redirect
                    the user to the sharedo login page when the token expires.
                </p>
                <p class="ml-2">
                    <code>import {SharedoAuth, SharedoProfile}</code><br />
                    <code class="ml-2">    from '@sharedo/mobile-core'</code><br/>
                    <br/>
                    <code>// Initialise sharedo authentication</code><br/>
                    <code>SharedoAuth.initialise(loginPage).then(()=>{</code><br/>
                    <br/>
                    <code class="ml-6">    // We have a token! Cache user details</code><br/>
                    <code class="ml-3">    SharedoProfile.loadProfile().then(()=>{</code><br/>
                    <br/>
                    <code class="ml-6">        // Now show your main app</code><br/>
                    <code class="ml-6">        createApp(mainAppPage).$mount('#app');</code><br/>
                    <code class="ml-3">    })</code><br/>
                    <code>}, err=>{ document.write(err); })</code>
                </p>
                <p>
                    Add a login button to your app as follows:
                </p>
                <p class="ml-2">
                    <code>&lt;v-btn</code><br />
                    <code class="ml-3">@click="SharedoAuth.reallyRedirectToLogin()"></code><br/>
                    <code class="ml-3">Log in</code><br/>
                    <code>&lt;/v-btn></code>
                </p>

                <h3 id="SharedoFetch">SharedoFetch</h3>
                <p>
                    Make a request to the sharedo API, using the currently cached access token.
                </p>
                <p class="ml-2">
                    <code>import {SharedoFetch as Fetch}</code><br />
                    <code class="ml-3">    from '@sharedo/mobile-core'</code><br/>
                    <br/>
                    <code>const id = "...";</code><br/>
                    <code>Fetch.get(`/api/v1/public/workItem/${id}`)</code><br/>
                    <code class="ml-3">    .then((task) => {</code><br/>
                    <code class="ml-6">// ...</code><br/>
                    <code class="ml-3">});</code>
                </p>

                <h3 id="SharedoProfile">SharedoProfile</h3>
                <p>
                    Retrieves and stores the current user's sharedo details;
                    see full example in <a href="#SharedoAuth">SharedoAuth</a> section.
                </p>
                <p>
                    You can log these out as follows:
                </p>
                <p class="ml-2">
                    <code>console.log(SharedoProfile.profile)</code>
                </p>

                <h2 id="components" class="primary--text">Components</h2>

                <p>
                    The following components are available in this package.
                </p>

                <p>
                    <v-alert
                        border="bottom"
                        colored-border
                        type="info"
                        elevation="2"
                    >
                        All components are registered globally, so you can use them in your
                        templates without having to <code>import</code> them first.
                    </v-alert>
                </p>

                <h3 id="bottom-nav">Bottom Nav</h3>
                <p>
                    This is a tabbed bottom navigation component, which can be used
                    to navigate between pages of your app.                    
                </p>
                <p>
                    It should be added to the <strong>main view of your app</strong>,
                    e.g. in your <code>Main.vue</code> file:
                </p>

                <p class="ml-2">
                    <code>&lt;v-main class="has-bottom-nav"></code><br/>
                    <br/>
                    <code class="ml-2">&lt;VBottomNav></code><br/>
                    <code class="ml-3">    &lt;template slot="contents"></code><br/>
                    <code class="ml-6">    &lt;v-btn></code><br/>
                    <code class="ml-9">    &lt;span>Account&lt;/span></code><br/>
                    <code class="ml-9">    &lt;v-icon>mdi-account&lt;/v-icon></code><br/>
                    <code class="ml-6">    &lt;/v-btn></code><br/>
                    <code class="ml-3">    &lt;/template></code><br/>
                    <code class="ml-2">&lt;/VBottomNav></code><br/>
                    <br/>
                    <code>&lt;/v-main></code>
                </p>

                <h3 id="top-toolbar">Top Toolbar</h3>
                <p>
                    This is the top toolbar component, which
                    <ul>
                        <li>shows the current page title</li>
                        <li>handles the side menu</li>
                        <li>is used for "back" nagivation.</li>
                    </ul>
                </p>
                <p>
                    It should be included on <strong>every page</strong> of your app, e.g.
                </p>
                <p class="ml-2">
                    <code>&lt;VTopToolbar title="Task list" /></code>
                </p>
                <p>
                    An more involved example, with button customisation:
                </p>
                <p class="ml-2">
                    <code>&lt;VTopToolbar title="Task" :showBack="true"></code><br/>
                    <code class="ml-3">    &lt;template slot="right"></code><br/>
                    <code class="ml-6">    &lt;!-- Override right button... --></code><br/>
                    <code class="ml-3">    &lt;/template></code><br/>
                    <code>&lt;/VTopToolbar></code>
                </p>
                
                <h2 id="ui-helpers" class="primary--text">UI helpers</h2>

                <h3 id="action-sheet">Action sheet</h3>
                <p>
                    Show an action sheet at the bottom of the screen:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.actionSheet({</code><br/>
                    <code class="ml-3">    items: [</code><br/>
                    <code class="ml-6">        {type: "header", text: "My header"},</code><br/>
                    <code class="ml-6">        {text: "Click me", color: "primary",</code><br/>
                    <code class="ml-9">            icon: "mdi-check", handler: ...}</code><br/>
                    <code class="ml-3">    ]</code><br/>
                    <code>})</code>
                </p>
                <p>
                   <v-btn color="primary" @click="actionSheet" primary>Show action sheet</v-btn>
                </p>
                
                <h3 id="banner">Banner</h3>
                <p>
                    Show a banner across the top of the screen, with configurable buttons:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.banner({</code><br/>
                    <code class="ml-3">    message: "You're online.",</code><br/>
                    <code class="ml-3">    color: "success",</code><br/>
                    <code class="ml-3">    icon: "mdi-wifi",</code><br/>
                    <code class="ml-3">    btns: [</code><br/>
                    <code class="ml-6">        {text: "OK", color: "success",</code><br/>
                    <code class="ml-9">            handler: ...}</code><br/>
                    <code class="ml-3">    ]</code><br/>
                    <code>})</code>
                </p>
                <p>
                   <v-btn color="primary" @click="banner" primary>Show banner</v-btn>
                </p>
                <p>
                    If no icon is provided, the 'color' property is applied to the text instead.
                </p>
                <p>
                    Return `false` from your button click handler to prevent the banner from
                    being dismissed.
                </p>
                
                <h3 id="dialog">Dialog</h3>
                <p>
                    Shows the given component in a full-screen dialog. It is recommended
                    that you use a VCard in the root of your component's template.
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.dialog(MyComponent, [props], [events])</code>
                </p>
                <p>
                   An example with properties and a callback:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.dialog(SampleForm,</code><br/>
                    <code class="ml-3">  { ref: "123-AB", title: "Item 123" },</code><br/>
                    <code class="ml-3">  {</code><br/>
                    <code class="ml-6">    closing: function(result) {</code><br/>
                    <code class="ml-9">      console.log("closed", result);</code><br/>
                    <code class="ml-6">    }</code><br/>
                    <code class="ml-3">  });</code><br/>
                </p>
                <p>
                   <v-btn color="primary" @click="dialog" primary>Show dialog</v-btn>
                </p>
                <p>
                    To close the dialog from within your component:
                </p>
                <p class="ml-2">
                    <code>this.$emit("close", result);</code>
                </p>
                
                <h3 id="loading">Loading</h3>
                <p>
                    Show a loading overlay:
                </p>
                <p class="ml-2">
                    <code>var l = this.$coreUi.loading()</code><br/>
                    <code>// ...</code><br/>
                    <code>l.dismiss()</code>
                </p>
                <p>
                   <v-btn color="primary" @click="loading" primary>Show loading</v-btn>
                </p>
                <p>
                    Alternatively, you can dismiss all loading overlays at once:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.loading.dismissAll()</code>
                </p>
                
                <h3 id="message-box">Message box</h3>
                <p>
                    Show a configurable message box on the screen:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.messageBox({</code><br/>
                    <code class="ml-3">    title: "Continue",</code><br/>
                    <code class="ml-3">    message: "Are you sure?",</code><br/>
                    <code class="ml-3">    btns: [</code><br/>
                    <code class="ml-6">        {text: "Cancel"}</code><br/>
                    <code class="ml-6">        {text: "Continue", color: "success",</code><br/>
                    <code class="ml-9">            handler: ...}</code><br/>
                    <code class="ml-3">    ]</code><br/>
                    <code>})</code>
                </p>
                <p>
                   <v-btn color="primary" @click="messageBox" primary>Show message box</v-btn>
                </p>
                <p>
                    The message box is closed and the appropriate <code>handler</code> function is
                    triggered when the user clicks a button.
                </p>
                
                <h3 id="toast">Toast</h3>
                <p>
                    Show a "toast" message at the bottom of the screen:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.toast("Hello there", opts)</code>
                </p>
                <p>
                   <v-btn color="primary" @click="toast1" primary>Show toast</v-btn>
                </p>
                <p>
                    You can specify further options as below:
                </p>
                <p class="ml-2">
                    <code>this.$coreUi.toast({</code><br/>
                    <code class="ml-3">    message: "Good job!",</code><br/>
                    <code class="ml-3">    color: "success",</code><br/>
                    <code class="ml-3">    icon: "mdi-check",</code><br/>
                    <code class="ml-3">    dismissable: true,</code><br/>
                    <code class="ml-3">    timeout: -1 // never, default=3000 (ms)</code><br/>
                    <code>})</code>
                </p>
                <p>
                   <v-btn color="primary" @click="toast2" primary>Show toast</v-btn>
                </p>
                <p>
                    Toasts are stacked above one another.
                </p>
                
            </v-container>
            
            <VBottomNav>
                <template slot="contents">
                    <v-btn>
                        <span>Page 1</span>
                        <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>

                    <v-btn>
                        <span>Page 2</span>
                        <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                </template>
            </VBottomNav>
        </v-main>
    </v-app>
</template>

<script>
import VTopToolbar from "./components/VTopToolbar.vue";
import VBottomNav from "./components/VBottomNav.vue";
import SampleForm from "./components/examples/SampleForm.vue";
import CoreUi from "./framework/coreUi.js";

export default {
    name: "App",

    components: {
        VTopToolbar,
        VBottomNav,
    },

    data: function() {
        return {
            menuItems: [
                {
                    id: "getting-started",
                    name: 'Getting started',
                    children: [
                        { id: "about", name: 'About this package' },
                        { id: "language-and-tools", name: 'Language and tools' },
                        { id: "icons", name: 'Icons' },
                        { id: "responsive", name: 'Responsive layout' },
                        { id: "installation", name: 'Installation' },
                    ],
                },
                {
                    id: "services",
                    name: 'Services',
                    children: [
                        { id: "SharedoAuth", name: 'SharedoAuth' },
                        { id: "SharedoFetch", name: 'SharedoFetch' },
                        { id: "SharedoProfile", name: 'SharedoProfile' },
                    ],
                },
                {
                    id: "components",
                    name: 'Components',
                    children: [
                        { id: "bottom-nav", name: 'Bottom Nav' },
                        { id: "top-toolbar", name: 'Top Toolbar' },
                    ],
                },
                {
                    id: "ui-helpers",
                    name: 'UI helpers',
                    children: [
                        { id: "action-sheet", name: 'Action sheet' },
                        { id: "banner", name: 'Banner' },
                        { id: "dialog", name: 'Dialog' },
                        { id: "loading", name: 'Loading' },
                        { id: "message-box", name: 'Message box' },
                        { id: "toast", name: 'Toast' },
                    ],
                },
            ],
        };
    },

    methods: {
        actionSheet: function() {
            CoreUi.actionSheet({
                items: [
                    { text: "My header", type: "header" },
                    { text: "Click me", color: "success", icon: "mdi-check", handler: function() { console.log("Clicked!") } },
                    { text: "Another thing", handler: function() {} },
                ]
            });
        },
        banner: function() {
            CoreUi.banner({
                message: "You're online.",
                icon: "mdi-wifi",
                color: "success",
                btns: [
                    { text: "OK", color: "primary", handler: function() { console.log("OK!") } },
                    { text: "So?" },
                ]
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        dialog: function() {
            CoreUi.dialog(SampleForm,
                { reference: "123-AB", title: "Item 123" },
                {
                    closing: function(result) {
                        console.log("closed", result);
                    }
                });
        },
        loading: function() {
            var l = CoreUi.loading();
            setTimeout(function() {
                l.dismiss();
            }, 1500)
        },
        messageBox: function() {
            CoreUi.messageBox({
                title: "Continue",
                message: "Are you sure?",
                btns: [
                    { text: "Cancel" },
                    { text: "Continue", color: "success", handler: function() { console.log("Yes!") } },
                ]
            });
        },
        toast1: function() {
            CoreUi.toast('Hello there');
        },
        toast2: function() {
            CoreUi.toast({
                message: 'Good job!',
                color: 'success',
                icon: 'mdi-check',
                dismissable: true,
                timeout: -1
            });
        },
    },
};
</script>

<style scoped>
h2, h3 {
    scroll-margin-top: 8vh; /* fix anchor tags */
}

h2 ~ h2 {
    border-top: 1px solid #aaa;
    padding-top: 15px;
    margin-top: 25px;
}
h3 {
    margin-top: 15px;
}
</style>
