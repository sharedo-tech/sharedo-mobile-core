<template>
    <v-dialog v-model="active" width="500" z-index="2000" persistent>
        <v-card>
            <v-card-title class="text-h5">
                {{ title }}
            </v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    v-for="btn in btns"
                    :key="btn.text"
                    text
                    :color="btn.color"
                    @click="callHandlerAndClose(btn)"
                >
                    {{ btn.text }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "info",
        },
        title: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
        btns: {
            type: Array,
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
        callHandlerAndClose(btn) {
            this.$emit("buttonClicked", btn);
            this.close();
        },
        close() {
            this.active = false;
        },
    },
};
</script>
