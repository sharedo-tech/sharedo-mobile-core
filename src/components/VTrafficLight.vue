<template>
  <v-icon :color="color" left>mdi-checkbox-blank-circle</v-icon>
</template>
<script>
export default {
  name: "VTrafficLight",
  props: {
    value: {
      type: Number,
      required: true,
    },
    amberThreshold: {
      type: Number,
      required: false,
      default: 3,
    },
    redThreshold: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  computed: {
    color: function () {
      if (this.value < this.amberThreshold) {
        return "green";
      } else if (this.value < this.redThreshold) {
        return "amber";
      } else {
        return "red";
      }
    },
  },
};
</script>