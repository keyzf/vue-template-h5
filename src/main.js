// 引入全局样式
import '@/assets/css/index.scss'
// 全局按需引入vant
import '@/plugins/vant'
// 移动端适配
import 'amfe-flexible'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
