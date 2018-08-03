import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(Vuelidate)



new Vue({
  el: '#app',
  render: h => h(App)
})

// Clear after module reload
// if (module.hot) {
//   module.hot.accept();

//   window.addEventListener('message', e => {
//       if ('production' !== process.env.NODE_ENV) {
//           console.clear();
//       }
//   });
// }