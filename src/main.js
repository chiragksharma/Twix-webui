import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import App from './App.vue'; // THe main container for entire application
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'; // Cookkie management
import VueNativeSock from 'vue-native-websocket';
import VueSpinners from 'vue-spinners';
import 'leaflet/dist/leaflet.css';
import demoJSON from '../public/demoData/demo.json';
import VueApexCharts from 'vue-apexcharts'

if (process.env.VUE_APP_PIXELIT_HOST !== undefined) {
    Vue.prototype.$pixelitHost = process.env.VUE_APP_PIXELIT_HOST;
} else {
    Vue.prototype.$pixelitHost = location.host;
} 

if (process.env.VUE_APP_API_SERVER !== undefined) {
    Vue.prototype.$apiServerBaseURL = process.env.VUE_APP_API_SERVER;
} else {
    Vue.prototype.$apiServerBaseURL = 'https://pixelit.bastelbunker.de/api';
}

Vue.prototype.$client = 'Twix-webapp';

Vue.use(VueSpinners);
Vue.use(VueCookies);

// Demo mode
if (location.host.includes('.github.io') || (process.env.VUE_APP_DEMO_MODE !== undefined && process.env.VUE_APP_DEMO_MODE == 'true')) {
    store.commit('SOCKET_ONMESSAGE', demoJSON);
    console.log("Demo mode enabled. Using mock JSON data:", demoJSON);
    Vue.prototype.$demoMode = true;
}
// Prod mode
else {
    Vue.use(VueNativeSock, `ws://${Vue.prototype.$pixelitHost}:81`, {
        store: store,
        reconnection: true,
        format: 'json',
    });
    Vue.prototype.$demoMode = false;
}

Vue.$cookies.config('10y');
Vue.config.productionTip = false;
Vue.component('apexchart', VueApexCharts)
new Vue({
    router,
    store,
    vuetify,
    VueApexCharts,
    render: (h) => h(App),
}).$mount('#app');
