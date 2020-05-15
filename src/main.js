import '@/assets/scss/styles.scss';

import Vue from 'vue'
import store from './store'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vClickOutside from 'v-click-outside'
import Notifications from 'vue-notification'

library.add(faChevronDown, faTrashAlt, faLongArrowAltUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(vClickOutside)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
