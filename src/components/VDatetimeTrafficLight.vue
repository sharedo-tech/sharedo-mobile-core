<template>
  <v-traffic-light
    :value="dateTimeValue"
    :amber-theshold="amberThreshold"
    :red-threshold="redThreshold"
  />
</template>
<script>
import VTrafficLight from "./VTrafficLight";

export default {
  name: "VDatetimeTrafficLight",
  components: { VTrafficLight },
  props: {
    value: {
      required: true,
    },
    unit: {
      type: String,
      required: false,
      default: "days",
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
    dateTimeValue: function () {
      const now = this.$moment();
      const momentValue = this.$moment(this.value);
      return now.diff(momentValue, this.unit);
    },
  },
};
</script>