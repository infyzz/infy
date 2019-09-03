export const state = () => ({
	meun: null,
	userInfo:null,
})

export const actions = {
	async nuxtServerInit ({ commit, state }, { $axios }) {
		// let { data } = await $axios.get("/api/category/list")
		// if (data.status == 1) {
		// 	commit('SET_CATEGORY', data.data)
		// }
	}
}

export const mutations = {
	SET_CATEGORY (state, data) {
		console.log('----111')
		state.meun = data
	}
}
