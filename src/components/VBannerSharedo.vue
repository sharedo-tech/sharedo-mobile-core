<template>
  <v-banner :single-line="singleLine" :rounded="rounded" :color="color" v-bind="$attrs" v-on="$listeners"
    class="my-banner">
    <slot></slot>

    <template v-slot:actions>
      <slot name="actions"></slot>
    </template>
  </v-banner>
</template>

<script>
export default {
  name: "VBannerSharedo",
  props: {
    singleLine: {
      type: Boolean,
      required: false,
      default: true,
    },
    rounded: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: "blue-grey lighten-5",
    },
  },
};
</script>

<style>
.my-banner>.v-banner__wrapper {
  padding-top: 3px !important;
  padding-bottom: 3px !important;
  border-radius: 0 !important;
}
</style>
