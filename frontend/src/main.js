import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import coreui from '@coreui/vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

createApp(App).use(store).use(router).use(coreui).mount('#app')
