const state = {
	userName: 'zhangfei'
}
const getters = {
	userName: state => state.userName
}
const mutations = {
	// 设置userName
	SET_USER_NAME(state, payload) {
		state.userName = payload
	}
}
const actions = {
	// 可进行异步操作
	setUserName({ commit }, payload) {
		commit('SET_USER_NAME', payload)
	}
}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
