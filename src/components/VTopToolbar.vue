<template>
    <div>
        <v-navigation-drawer
            app
            fixed
            v-model="showMenu"
            :temporary="isMobile"
            :permanent="!isMobile"
            :clipped="!isMobile"
        >
            <v-list>
                <slot name="menu" :toggleMenu="toggleMenu">

                    <v-list-item>
                        <h1>Sharedo</h1>
                    </v-list-item>

                    <v-list-item @click="logout">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Log out</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                        
                    <v-list-item class="absolute" :style="{ bottom: (isMobile ? 10 : 60) + 'px' }">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--lighten-1">{{version}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </slot>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            id="sharedo-app-bar"
            app
            fixed
            dark
            color="primary"
            :clipped-left="!isMobile"
        >
            <!-- Left toolbar button -->
            <v-card-actions v-if="!hideLeft">
                <slot name="left">
                    <!-- default = burger/toggle menu -->
                    <v-icon v-if="!hideNavDraw && !showBack && isMobile" @click.stop="toggleMenu">
                        mdi-menu
                    </v-icon>

                    <!-- ... or 'back' button -->
                    <v-icon v-if="showBack" @click="$router.back()">
                        mdi-arrow-left
                    </v-icon>
                </slot>
            </v-card-actions>

            <slot name="content">
                <v-spacer />

                <v-toolbar-title v-text="title" ></v-toolbar-title>

                <v-spacer />
            </slot>

            <!-- Right toolbar button -->
            <v-card-actions v-if="!hideRight">
                <slot name="right">
                    <!-- default = blank space so title is centered (!) -->
                    <div v-if="!hideNavDraw || !showBack">
                        &nbsp;&nbsp;&nbsp;
                    </div>
                </slot>
            </v-card-actions>
            
        </v-app-bar>
    </div>
</template>

<script>
import { logout, redirectToLogin } from "../infra/authcode";

export default {
    name: "VTopToolbar",

    props: {
        title: {
            type: String,
            default:"sharedo"
        },
        showBack: {
            type: Boolean,
            default: false
        },
        hideNavDraw: {
            type: Boolean,
            default: false
        },
        hideLeft: {
            type: Boolean,
            default: false
        },
        hideRight: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            showMenu: false,
            version: null,
        };
    },
    mounted() {
        var self = this;
        this.$on("closeMenu", () => function() {
            self.showMenu = false;
        });
        
        var ver = process.env.VUE_APP_VERSION;
        self.version = ver ? "v" + ver : null;
    },
    computed: {
        isMobile: function () {
            return this.$vuetify.breakpoint.mobile;
        }
    },
    watch: {
        isMobile: function (isActive, wasActive) {
            // Fix issue where menu shows when shrinking browser
            if (isActive && !wasActive)
                this.showMenu = false;
        },
    },
    methods: {
        toggleMenu: function () {
            this.showMenu = !this.showMenu;
        },
        logout: function () {
            logout().then(() => {
                redirectToLogin();
            });
        },
    },
};
</script>

<style scoped>
#sharedo-app-bar {
    box-shadow: none;
    background: linear-gradient(rgba(0,0,0,0) 73%, rgba(0,0,0,0.1));
    
    /* Cover mobile status bar */
    padding-top: 28px;
    margin-top: -28px !important;
    height: 92px !important;
}

@media (max-width: 959px) {
    #sharedo-app-bar {
        height: 84px !important;
    }
}
</style>
