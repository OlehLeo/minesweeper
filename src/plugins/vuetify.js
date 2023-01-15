import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: '#f4f5f7'
      }
    },
    options: {
      customProperties: true
    }
  }
});
