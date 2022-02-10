import fetch from '../common/httpRequest'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import {
	createStore
} from 'vuex'
const store = createStore({
// #endif
	state: {
		//用户名
		userName: uni.getStorageSync("office_user_name") || "echo.",
		userImg: uni.getStorageSync("office_user_img") || "/static/images/my/mine_def_touxiang_3x.png",
		//是否登录 项目中改为真实登录信息判断，如token
		isLogin: uni.getStorageSync("office_token") ? true : false,
		//登录后跳转的页面路径 + 页面参数
		returnUrl: "",
		//app版本
		version: "1.0.1",
		//当前是否有网络连接
		networkConnected: true,
		isOnline: true,
		eruptUser: [],
	},
	mutations: {
		login(state, payload) {
			if (payload) {
				uni.setStorageSync('office_token', payload.token);
				uni.setStorageSync('office_user', payload.eruptUser);
				uni.setStorageSync('office_user_name', payload.userName);
				uni.removeStorageSync('office_user_img',payload.eruptUser.passwordB);
				uni.removeStorageSync('office_user_header',"");
				state.eruptUser = payload.eruptUser
			}
			state.isLogin = true
			
		},
		logout(state) {
			uni.removeStorageSync('office_token');
			uni.removeStorageSync('office_user');
			uni.removeStorageSync('office_user_name');
			state.eruptUser = ""
			state.isLogin = false
			state.returnUrl = ""
		},
		setReturnUrl(state, returnUrl) {
			state.returnUrl = returnUrl
		},
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		},
		setOnline(state, payload) {
			state.isOnline = state.isOnline
		}
	},
	actions: {
		getOnlineStatus: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				// #ifndef MP-WEIXIN
				resolve(true)
				// #endif
				// #ifdef MP-WEIXIN
				if (state.isOnline) {
					resolve(state.isOnline)
				} else {
					fetch.request("/Home/GetStatus", "GET", {}, false, true, true).then((res) => {
						if (res.code == 100 && res.data == 1) {
							commit('setOnline', {
								isOnline: true
							})
							resolve(true)
						} else {
							commit('setOnline', {
								isOnline: false
							})
							resolve(false)
						}
					}).catch((res) => {
						reject(false)
					})
				}
				// #endif
			})
		}
	}
})

export default store
