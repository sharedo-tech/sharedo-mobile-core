<template>
    <v-bottom-navigation
        id="sharedo-bottom-nav"
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

<style scoped>
#sharedo-bottom-nav {
    box-shadow: none;
}

#sharedo-bottom-nav {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
</style>

<style>

/* Top border specified above */
.theme--light.v-item-group.v-bottom-navigation .v-btn {
    border-top: none !important;
}

/* Primary action button */
.theme--light.v-bottom-navigation .v-btn.primary-action {
    height: calc(100% + 11px) !important;
    transition: margin-top .2s;
    margin-top: 0;
}
.theme--light.v-bottom-navigation .v-btn.primary-action:hover,
.theme--light.v-bottom-navigation .v-btn.primary-action:active {
    margin-top: -4px;
}

.theme--light.v-bottom-navigation .v-btn.primary-action > .v-btn__content {
    background: var(--v-primary-base);
    color: white !important;
    border-radius: 50%;
    margin: 0 22%;
}

@media (max-width: 599px) {
    .theme--light.v-bottom-navigation .v-btn.primary-action > .v-btn__content {
        margin: 0 calc((100% - 79px) / 2);  /* Ensure always a circle */
    }    
}

.theme--light.v-bottom-navigation .v-btn.primary-action > .v-btn__content > .v-icon {
    margin-top: -12px;
}

/* Apply 'retain-focus-on-click="false"' on all buttons  */
.v-item-group.v-bottom-navigation .v-btn:hover:before {
    opacity: 0 !important;
}
</style>