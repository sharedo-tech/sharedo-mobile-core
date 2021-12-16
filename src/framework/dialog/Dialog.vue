<template>
    <v-dialog
        transition="dialog-bottom-transition"
        persistent
        :fullscreen="isMobile"
        v-model="active"
        :content-class="isMobile ? null : 'full-height'"
        :width="600"
    >
        <slot>
            <!-- default slot -->
        </slot>

    </v-dialog>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: true
        },
    },
    data: function () {
        return {
            isHydrated: false,
        };
    },
    mounted () {
        // HACK: as breakpoints aren't populated for some reason
        this.$vuetify.breakpoint.update();
        this.isHydrated = true;
    },
    computed: {
        isMobile: function () {
            return this.isHydrated && this.$vuetify.breakpoint.mobile;
        }
    },
};
</script>
