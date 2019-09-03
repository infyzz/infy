export const state = () => ({
	userInfo: null
})

export const mutations = {
	SET_USERINFO (state, userinfo) {
		state.userInfo = userinfo
	}
}
