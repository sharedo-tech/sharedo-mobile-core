<template>
    
    <v-banner
        :single-line="!multiline"
        fixed
        v-model="active"
        color="blue-grey lighten-5"
        :class="textColor + '--text mb-3' + (isMobile ? ' isMobile' : '')"
    >
        <v-icon
            slot="icon"
            :color="color"
            size="36"
            v-if="icon"
        >
            {{icon}}
        </v-icon>
        
        {{message}}

        <template v-slot:actions>
            <v-btn
                v-for="btn in btns"
                :key="btn.text"
                text
                small
                :color="btn.color"
                @click="callHandler(btn)"
            >
                {{ btn.text }}
            </v-btn>
        </template>
    </v-banner>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: ""
        },
        message: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        },
        btns: {
            type: Array,
        },
        multiline: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        active: false,
        isHydrated: false,
    }),
    mounted() {
        this.$nextTick(() => this.show());
        
        // HACK: as breakpoints aren't populated for some reason
        this.$vuetify.breakpoint.update();
        this.isHydrated = true;
    },
    computed: {
        textColor: function () {
            // If no icon, use color for text
            return this.color && !this.icon ? this.color : 'blue-grey';
        },
        isMobile: function () {
            return this.isHydrated && this.$vuetify.breakpoint.mobile;
        },
    },
    watch: {
        active: function (isActive, wasActive) {
            this.$emit("statusChange", isActive, wasActive);
        },
    },
    methods: {
        show() {
            this.active = true;
        },
        callHandler(btn) {
            // This will dismiss the banner depending on result of handler
            this.$emit("buttonClicked", btn);
        },
        close() {
            this.active = false;
        },
    },
};
</script>

<style>
/* 'scoped' attribute not working?? */

.v-sheet.v-banner:not(.isMobile) {
    border-radius: 7px;
}
.v-sheet.v-banner.isMobile {
    margin: -12px;
}

.v-banner:not(.isMobile) .v-banner__wrapper {
    border: thin solid rgba(0, 0, 0, 0.12);
    border-radius: 7px;
}

.v-banner .v-btn:not(.v-btn--round).v-size--small {
    padding: 0 8px;
    margin-left: 3px;
}
</style>
