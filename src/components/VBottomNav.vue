<template>
    <v-bottom-navigation
        fixed
        grow
        v-model="activeItem"
        color="primary"
        background-color="blue-grey lighten-5"
    >
        <slot name="contents">
            <!-- buttons go here -->
        </slot>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "VBottomNav",

    data: function () {
        return {
            activeItem: "top",
        };
    },
};
</script>
