<template>
    <v-dialog
        transition="dialog-bottom-transition"
        persistent
        :fullscreen="isMobile"
        v-model="active"
        :content-class="isMobile ? null : 'full-height'"
        :width="600"
    >
        <component
            v-bind:is="childComponent"
            v-bind="childProps"
            @close="onChildClose"
        />
    </v-dialog>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: true,
        },
        childProps: null,
    },
    data: function () {
        return {
            childComponent: null,
            isHydrated: false,
        };
    },
    created: function () {
        this.$on("shown", this.dialogMounted);
    },
    computed: {
        isMobile: function () {
            return this.isHydrated && this.$vuetify.breakpoint.mobile;
        },
    },
    methods: {
        dialogMounted: function () {
            // HACK: breakpoints don't seem to be populated for dialogs
            this.$vuetify.breakpoint.update();
            this.isHydrated = true;
        },
        onChildClose: function (result) {
            this.close(result);
        },
        // Public
        close: function (result) {
            this.$emit("close", result);
        },
    },
};
</script>
