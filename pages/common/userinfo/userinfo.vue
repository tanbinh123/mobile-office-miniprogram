<template>
	<view class="container">
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">姓名</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" v-model="eruptUser.name" placeholder="请输入姓名"
						maxlength="50" type="text" />
					
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入手机号" v-model="eruptUser.phone"
						maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">邮箱</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="email" placeholder="请输入邮箱"	v-model="eruptUser.email"
						maxlength="50" type="text" />
				</view>
			</tui-list-cell>
	
		

			<view class="tui-btn-box">
				<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit"
					type="primary">更新</button>
				<button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover"
					formType="reset">重置</button>
			</view>
		</form>
	</view>
</template>
<script>
	import form from "@/components/common/tui-validation/tui-validation.js"
import { mapMutations } from 'vuex';
	function checkKeyword(value) {
		if (~value.indexOf("***")) {
			return false;
		}
		return true;
	}
	export default {
		data() {
			return {
				eruptUser: [],
			}
		},
		onLoad(){
			this.eruptUser = uni.getStorageSync("office_user");
			console.log(this.eruptUser)
		},
		methods: {
			...mapMutations(['updateUser']),
			formSubmit: function(e) {
				//表单规则
				let rules = [{
					name: "name",
					rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
					msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
				},{
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}, {
					name: "email",
					rule: ["required", "isEmail"],
					msg: ["请输入邮箱", "请输入正确的邮箱"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					let postData = {
						name: this.eruptUser.name,
						phone: this.eruptUser.phone,
						email: this.eruptUser.email,
					};
					this.tui.request("/auth/update", "POST", postData, false,true,false).then((res) => {
						res = res.data;	
						if(res.id == null){
							this.tui.toast("修改失败", 2000, false);
							return;
						}
						
						let state = {
							eruptUser: res,
						};
						this.updateUser(state);
						this.tui.toast('修改成功', 2000, true);
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/tabbar/my/my'
							});
						}, 200);
					}).catch((res) => {
						this.tui.toast(res, 2000, true);
						console.log(res);
					})
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				console.log("清空数据")
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0 50rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		line-height: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}

	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.radio-group {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
		flex-shrink: 0;
	}

	.tui-radio {
		display: inline-block;
		padding-left: 28rpx;
		font-size: 36rpx;
		vertical-align: middle;
	}


	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
	}

	.tui-button-gray {
		margin-top: 30rpx;
	}

	.tui-tips {
		padding: 30rpx;
		color: #999;
		font-size: 24rpx;
	}
</style>
