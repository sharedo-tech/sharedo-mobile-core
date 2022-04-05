<template>
    <v-bottom-sheet v-model="active">
        <v-list>
            <component
                v-for="item in items"
                :key="item.text"
                :is="item.type == 'header' ? 'v-subheader' : 'v-list-item'"
                :href="item.url"
                @click="callHandlerAndClose(item)"
            >
                <span v-if="item.type == 'header'">
                    {{ item.text }}
                </span>

                <v-list-item-icon v-if="item.type != 'header'">
                    <v-icon v-if="item.icon" :color="item.color">
                        {{ item.icon }}
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-title v-if="item.type != 'header'">
                    {{ item.text }}
                </v-list-item-title>
            </component>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
export default {
    props: {
        items: {
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
        callHandlerAndClose(item) {
            if (item.type === "header") return;
            this.$emit("itemClicked", item);
            this.close();
        },
        close() {
            this.active = false;
        },
    },
};
</script>
