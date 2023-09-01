<template>
  <div>
    <label class="section-label" v-if="label">{{ label }}</label>
    <tiptap-vuetify v-bind="$attrs" v-model="internalValue" :extensions="extensions" @input="handleInput"
      v-on:focus="handleFocus" v-on:blur="handleBlur" />
    <VMessages class="mt-2" :value="messagesLocal" :color="showHint ? null : 'error'" />
  </div>
</template>
<script>
import { VInput } from "vuetify/lib";

import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  extends: VInput,    // Support VForm validation and :rules="..." - see VInput.ts and mixins/validatable
  components: {
    TiptapVuetify,
  },
  props: {
    value: String,
    label: String,
    required: Boolean,
  },
  data: function () {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },

  computed: {
    messagesLocal: function () {
      return this.showHint ? [this.hint] : this.errorBucket;
    },

    showHint: function () {
      return this.hint && (this.persistentHint || this.isFocused);
    },
  },
  created: function () {
    this.internalValue = this.value;
  },
  methods: {
    handleInput: function () {
      // Ensure 'required' validation works
      if (this.internalValue === "<p></p>") {
        this.internalValue = "";
      }

      this.$emit('input', this.internalValue)
    },
    handleFocus: function () {
      this.isFocused = 1;
    },
    handleBlur: function () {
      this.isFocused = 0;
    },
  }
};
</script>
<style>
.theme--light.v-sheet .tiptap-vuetify-editor>.v-card {
  margin: 15px;
  box-shadow: none;
  border: 1px solid var(--v-grey-lighten1);
  border-radius: 0;
}

/* Increase tap area */
.tiptap-vuetify-editor .ProseMirror:before {
  content: ' ';
  position: absolute;
  inset: -20px;
}

/* TODO red border on focus + validation error */
</style>