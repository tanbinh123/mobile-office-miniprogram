// 全局请求封装
export default (url, method, params) => {
const token = uni.getStorageSync('token');
	uni.showLoading({
		title: "加载中"
	});
	if(!token ){
		// 执行没有登录的逻辑
		uni.navigateTo({
			url: '/pages/common/login/login'
		});
		return;
	}
	return new Promise((resolve, reject) => {
		this.tui.request("/Home/GetStatus", "GET", postData, false,true, type == 1 ? false : true).then((res) => {
			if (res.code == 100) {
				this.result = `${type == 1 ?"带":"无"}loading请求成功！返回值为 ${JSON.stringify(res)}`
			} else {
				this.result = `${type == 1 ? "带" : "无"}loading请求失败！ ${JSON.stringify(res)}`
			}
		}).catch((res) => {
			this.result = `${type == 1 ? "带" : "无"}loading请求失败！ ${JSON.stringify(res)}`
		})
		wx.request({
			url: "https://www.piop.cn/api" + url,
			method: method,
			header: {
				token: token
			},
			data: {
				serviceId: api[0].serviceId,
				...params
			},
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};
