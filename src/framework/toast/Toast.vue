<template>
    <v-snackbar
        :timeout="timeout"
        :color="color"
        v-model="active"
        class="v-application"
        role="alert"
        :style="{ bottom: bottom + 'px' }"
        transition="slide-y-reverse-transition"
    >
        <v-icon
            dark
            left
            v-if="!!icon"
        >
            {{ icon }}
        </v-icon>

        <span v-html="message"></span>

        <template v-if="dismissable" v-slot:action="{ attrs }">
            <v-btn
                text
                v-bind="attrs"
                @click="dismiss"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "info"
        },
        icon: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ""
        },
        timeout: {
            type: Number,
            default: 3000
        },
        dismissable: {
            type: Boolean,
            default: true
        },
        bottom: {
            type: Number,
            default: 62
        },
    },
    data: () => ({
        active: false,
    }),
    mounted() {
        this.$nextTick(() => this.show());
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
        close() {
            this.active = false;
        },
        dismiss() {
            if (this.dismissable) {
                this.close();
            }
        },
    },
};
</script>
