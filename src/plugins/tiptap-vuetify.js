import Vue from 'vue';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';

const useTipTapVuetify = vuetify => {
  Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconsGroup: "mdi",
  });
}

export {
  useTipTapVuetify
}