<template>
  <v-btn small right :icon="$attrs.text === undefined" :color="$attrs.color || 'primary'" v-bind="$attrs"
    v-on="$listeners">
    <slot></slot>
  </v-btn>
</template>