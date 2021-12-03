import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
// VUE MATERIAL
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// MODAL
import MdModalDialog from 'vue-material-modal-dialog'
// ALERT
import VueSimpleAlert from "vue-simple-alert"
// MASK
import VueTheMask from 'vue-the-mask'
// CONFIGS
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueSimpleAlert)
Vue.use(MdModalDialog)
Vue.use(VueMaterial)
Vue.use(VueTheMask)
// INIT
new Vue({
  render: h => h(App),
}).$mount('#app')
