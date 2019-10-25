import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

import Card from './components/Card.vue'
Vue.component('m-card',Card)
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api'
  // baseURL:'http://localhost:3000/web/api'
})

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
