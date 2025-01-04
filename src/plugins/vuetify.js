import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
      },
    typography: {
        fontFamily: 'Urbanist, sans-serif', // Set Urbanist as the global font
      },
});
