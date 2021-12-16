<template>
    <!-- 202 = above dialog -->
    <v-overlay :value="active" z-index="202">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    props: {},
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
        dismiss() {
            // Only dismissed if depth == 0
            this.$emit("dismiss");
        },
        dismissNow() {
            this.active = false;
        },
    },
};
</script>
