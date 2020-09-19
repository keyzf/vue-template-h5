import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app
	},
	state: {},
	getters: {},
	mutations: {},
	actions: {}
})

export default store
