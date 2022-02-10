<template>
	<view class="container">
		<view class="tui-bg-box">
			<tui-tips ref="toast" position="bottom"></tui-tips>
			<image src="/static/images/login/bg_login.png" class="tui-bg-img"></image>
			<image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-photo"></image>
			<view class="tui-login-name"> 注册  </view>
		</view>
		<form :report-submit="true" @submit="formLogin">
			<view class="tui-login-from">
				<view class="tui-line-cell">
					<tui-icon name="people" :size="20" color="#6d7a87"></tui-icon>
					<input placeholder-class="tui-phcolor" class="tui-input" name="account" placeholder="请输入账号"  v-model="account" type="input" />
				</view>
				<view class="tui-line-cell tui-top28">
					<tui-icon name="pwd" :size="20" color="#6d7a87"></tui-icon>
					<input placeholder-class="tui-phcolor" class="tui-input" name="pwd" placeholder="请输入密码"  v-model="pwd" type="password" />
				</view>
				<view class="tui-line-cell tui-top28">
					<tui-icon name="pwd" :size="20" color="#6d7a87"></tui-icon>
					<input placeholder-class="tui-phcolor" class="tui-input" name="repwd" placeholder="请确认密码"  v-model="repwd" type="password" />
				</view>
				<view class="tui-line-cell tui-top28">
					<tui-icon name="shield" :size="20" color="#6d7a87"></tui-icon>
					<input placeholder-class="tui-phcolor" class="tui-input" name="smsCode" placeholder="请输入验证码" maxlength="4" />
					<tui-button width="182rpx" height="56rpx" :size="24" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{ btnText }}</tui-button>
				</view>
				<button class="tui-button-primary tui-btn-submit" hover-class="tui-button-hover" form-type="submit">注册</button>
				<view class="tui-protocol" hover-class="opcity" :hover-stay-time="150">
					点击"注册"即表示已同意
					<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
					
				</view>
				
			</view>
		</form>
		
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
import util from '@/utils/util.js'
import form from '@/components/common/tui-validation/tui-validation.js'
export default {

	data() {
		return {
			repwd: '',
			disabled: false,
			btnText: '获取验证码',
			account: '',
			pwd: '',
			type: 'primary',
			code: '',
		};
	},
	methods: {
		...mapMutations(['login']),
		
		getRandom: function(u) {
			let rnd = '';
			u = u || 4;
			for (var i = 0; i < u; i++) {
				rnd += Math.floor(Math.random() * 10);
			}
			return rnd;
		},
		doLoop: function(seconds) {
			let code = this.getRandom(4);
			let options = {
				backgroundColor: '#5677fc',
				msg: '本次验证码：' + code,
				duration: 5000
			};
			this.$refs.toast.showTips(options);
			seconds = seconds ? seconds : 20;
			this.btnText = seconds + 's后获取';
			this.code = code;
			let countdown = setInterval(() => {
				if (seconds > 0) {
					this.btnText = seconds + 's后获取';
					--seconds;
				} else {
					this.btnText = '获取验证码';
					this.disabled = false;
					this.type = 'primary';
					clearInterval(countdown);
				}
			}, 1000);
		},
		btnSend: function() {
			let rules = [
				{
					name: 'account',
					rule: ['required', 'isaccount'],
					msg: ['请输入账号', '请输入正确的账号']
				}
			];
			//进行表单检查
			let formData = {
				account: this.account
			};
			let checkRes = form.validation(formData, rules);
			if (!checkRes) {
				this.disabled = true;
				this.btnText = '请稍候...';
				this.type = 'gray';

				setTimeout(() => {
					this.doLoop(20);
				}, 500);
			} else {
				this.tui.toast(checkRes);
			}
		},
		formLogin: function(e) {
			let loginCode = e.detail.value.smsCode;
			let account = e.detail.value.account;
			let rules = [
				{
					name: 'account',
					rule: ['required', 'isaccount'],
					msg: ['请输入账号', '请输入正确的账号']
				},
				{
					name: "pwd",
					rule: ["required", "isEnAndNo"],
					msg: ["请输入密码", "密码为8~20位数字和字母组合"]
				}, {
					name: "repwd",
					rule: ["required", "isSame:pwd"],
					msg: ["请输入确认密码", "两次输入的密码不一致"]
				}, 
				{
					name: 'loginCode',
					rule: ['required', 'isSame:code'],
					msg: ['请输入验证码', '验证码不正确']
				}
			];
			//进行表单检查
			let formData = {
				account: account,
				pwd: this.pwd,
				repwd: this.pwd,
				loginCode: loginCode,
				code: this.code
			};
			let checkRes = form.validation(formData, rules);
			if (checkRes) {
				this.tui.toast(checkRes);
				return;
			}
			let postData = {
				account: this.account,
				pwd: this.pwd,
			};
			this.tui.request("/auth/register", "POST", postData, false,true,false).then((res) => {
					
				if(res.status != 200){
					this.tui.toast(res.message, 2000, false);
					return;
				}
				res = res.data;
				this.tui.toast(res, 2000, true);
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/common/login/login'
					});
				}, 200);
			}).catch((res) => {
				this.tui.toast(res, 2000, true);
				console.log(res);
			})
			
		},
		protocol: function() {
			uni.navigateTo({
				url: '/pages/doc/protocol/protocol'
			});
		}
	}
};
</script>

<style>
page {
	background-color: #fff;
}

.tui-bg-box {
	width: 100%;
	box-sizing: border-box;
	position: relative;
	padding-top: 44rpx;
}

.tui-photo {
	height: 138rpx;
	width: 138rpx;
	display: block;
	margin: 10rpx auto 0 auto;
	border-radius: 50%;
	position: relative;
	z-index: 2;
}

.tui-login-name {
	
	width: 328rpx;
	height: 40rpx;
	font-size: 30rpx;
	color: #fff;
	margin: 36rpx auto 0 auto;
	text-align: center;
	position: relative;
	z-index: 2;
}

.tui-bg-img {
	width: 100%;
	height: 346rpx;
	display: block;
	position: absolute;
	top: 0;
}

.tui-login-from {
	width: 100%;
	padding: 128rpx 104rpx 0 104rpx;
	box-sizing: border-box;
}

.tui-input {
	font-size: 32rpx;
	flex: 1;
	display: inline-block;
	padding-left: 32rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.tui-line-cell {
	padding: 27rpx 0;
	display: -webkit-flex;
	display: flex;
	-webkiit-align-items: center;
	align-items: center;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
}

.tui-line-cell::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #e0e0e0;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

.tui-top28 {
	margin-top: 28rpx;
}

.tui-btn-class {
	width: 196rpx !important;
	height: 54rpx !important;
	border-radius: 27rpx !important;
	font-size: 28rpx !important;
	padding: 0 !important;
	line-height: 54rpx !important;
}

.tui-btn-submit {
	margin-top: 100rpx;
}
.tui-btn-register {
	margin-top: 20rpx;
}
.tui-protocol {
	color: #333;
	font-size: 24rpx;
	text-align: center;
	width: 100%;
	margin-top: 29rpx;
}

.tui-protocol-red {

	color: #f54f46;
}
</style>
