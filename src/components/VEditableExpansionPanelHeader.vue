<template>
  <v-expansion-panel-header class="panel-header" v-bind="$attrs" v-on="$listeners">
    <template v-slot:default="{ open }">
      <v-row no-gutters>
        <v-col cols="9">
          <slot></slot>
        </v-col>
        <v-col cols="3" class="text--secondary pr-3 text-right">

          <v-fade-transition v-if="canEdit">
            <v-icon color="primary" v-if="open" @click.stop="editClicked()">mdi-pencil-outline</v-icon>
          </v-fade-transition>

          <div class="ml-3 d-inline panel-error-count" v-if="errorCount">
            <v-avatar color="error lighten-1" size="22" class="error-count">
              <span class="white--text text-caption">{{ errorCount }}</span>
            </v-avatar>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-expansion-panel-header>
</template>
<script>
export default {
  props: {
    canEdit: {
      type: Boolean,
      default: false,
    },
    errorCount: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    editClicked: function () {
      this.$emit("editClicked");
    }
  }
};
</script>
<style scoped>
.error-count {
  margin: -6px 0 -2px;
  vertical-align: text-bottom;
}
</style>