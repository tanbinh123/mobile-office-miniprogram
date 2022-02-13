<template>
	<view class="container">
		<view class="top-container">
			
			<image class="bg-img" src="/static/images/my/mine_bg_3x.png"></image>
			<view @tap="logout" class="logout" hover-class="opcity" :hover-stay-time="150">
				<image class="logout-img" src="/static/images/my/icon_out_3x.png" v-show="isLogin"></image>
				<text class="logout-txt" v-show="isLogin">退出</text>
			</view>
			<view v-show="!isLogin" class="user-wrapper">
				<navigator url="/pages/common/login/login" hover-class="opcity" :hover-stay-time="150" class="user">
					<image class="avatar-img" src="/static/images/my/mine_def_touxiang_3x.png"></image>
					<text class="user-info-mobile">请登录</text>
				</navigator>
			</view>
			<view v-show="isLogin" class="user">
				<image class="avatar-img" :src="userImg"></image>
				<view class="user-info-mobile">
					<text>{{ userName }}</text>
					<view class="edit-img" hover-class="opcity" :hover-stay-time="150" @tap="edit">
						<image src="/static/images/my/mine_icon_bianji_3x.png"></image>
					</view>
				</view>
			</view>
		</view>


		<view class="bottom-container">

			<view class="ul-item">
				<view  @tap="tapEvent" data-index="1" class="item" hover-class="opcity" :hover-stay-time="150">
					<image class="item-img" src="/static/images/my/go.png"></image>
					<text class="item-name">关于</text>
				</view>
				<view class="item" hover-class="opcity" :hover-stay-time="150" @tap="tapEvent" data-index="4">
					<button open-type="feedback" class="btn-feedback"></button>
					<image class="item-img" src="/static/images/my/feedback.png"></image>
					<text class="item-name">反馈</text>
				</view>
				<view @tap="tapEvent" data-index="3" class="item" hover-class="opcity" :hover-stay-time="150">
					<image class="item-img" src="/static/images/my/log.png"></image>
					<text class="item-name">日志</text>
				</view>
			</view>
		</view>
		<tui-list-view title="菜单列表" class="list-menu">
			<tui-list-cell @tap="apitest" :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
					<text class="tui-list-cell_name">网络测试</text>
				</view>
			</tui-list-cell>
			<tui-list-cell @click="detail" :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="service-fill" :size="24" color="#5677fc"></tui-icon>
					<view class="tui-list-cell_name">服务</view>
				</view>
			</tui-list-cell>
			<tui-list-cell  :arrow="true">
				<view class="tui-item-box" @tap="tapEvent" data-index="1">
					<tui-icon name="explore-fill" :size="24" color="#19be6b"></tui-icon>
					<view class="tui-list-cell_name">发现</view>
					<view class="tui-ml-auto">
						<tui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green" shape="circle">探索发现</tui-tag>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true">
				<view class="tui-item-box"  @tap="tapEvent" data-index="4">
					<tui-icon name="feedback" :size="23" color="#ed3f14"></tui-icon>
					<view class="tui-list-cell_name">反馈</view>
					<view class="tui-right">提交Bug</view>
				</view>
			</tui-list-cell>
			<tui-list-cell  :arrow="true" last="true">
				<view class="tui-item-box" @tap="tapEvent" data-index="3">
					<image src="/static/images/my/thorui.png" class="tui-logo" mode="widthFix"></image>
					<text class="tui-list-cell_name">关于</text>
					<view class="tui-right">暂无新版本</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<view class="tui-applets__vip" @tap="openThorUI">
			<tui-icon name="applets" color="#07c160" :size="44" unit="rpx"></tui-icon>
			<text>{{appName}}{{version}}</text>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import { mapMutations } from 'vuex';
	export default {
		computed: mapState(['isLogin', 'userName','version','userImg','appName']),
		data() {
			return {};
		},
		onShow: function() {},
		methods: {
			...mapMutations(['logoutState']),
			logout: function() {
				this.tui.modal("提示", "确定退出登录？", true, (res) => {
					if (res) {
						this.logoutState({});
						this.tui.toast('退出成功', 2000, true);
						setTimeout(() => {
							uni.reLaunch({
								url: '/'
							});
						}, 200);
						
					}
				})
			},
			edit() {
				uni.navigateTo({
					url: '/pages/common/userinfo/userinfo'
				});
			},
			tapEvent: function(e) {
				let index = e.currentTarget.dataset.index;
				let url = '';
				if (index == 1) {
					url = '/pages/common/about/about';
				} else if (index == 2) {
					let key = e.currentTarget.dataset.key;
					url = '/pages/index/maps/maps?key=' + key;
					// #ifdef MP-QQ
					this.tui.toast('功能开发中~');
					return;
					// #endif
				} else if(index == 3){
					url = '/pages/common/log/log';
				}else if(index == 4){
					url = '/pages/common/feedback/feedback';
				}
				uni.navigateTo({
					url: url
				});
			},
			github: function() {
				// #ifdef APP-PLUS || MP
				const that = this;
				uni.setClipboardData({
					data: 'https://github.com/dingyong0214/ThorUI-uniapp',
					success(res) {
						uni.getClipboardData({
							success(res) {
								that.tui.toast('链接已复制', 2000, true);
							}
						});
					}
				});
				// #endif

				// #ifdef H5
				location.href = 'https://github.com/dingyong0214/ThorUI-uniapp';
				// #endif
			},
			previewReward: function() {
				uni.previewImage({
					urls: ['https://thorui.cn/img/reward.jpg']
				});
			},
			
			feedback() {
				
				// #ifdef MP-ALIPAY
				uni.navigateTo({
					url: '/pages/my/feedback/feedback'
				});
				// #endif
				// #ifdef H5
				location.href = 'https://www.thorui.cn/';
				// #endif
			},
			apitest() {
				
				uni.navigateTo({
					url: '/pages/extend/request/request'
				});
			
				
			},
			about() {
	
				uni.navigateTo({
					url: '/pages/my/about/about'
				});

				
			},
			openThorUI() {
				// #ifdef MP-WEIXIN
				wx.navigateToMiniProgram({
					appId: 'wxd3c1da92cb8fcf40'
				});
				// #endif
			
				// #ifndef  MP-WEIXIN
				if (this.sweixin) {
					this.sweixin.launchMiniProgram({
						id: 'gh_78d54c9830d3'
					});
				} else {
					uni.previewImage({
						urls: ['https://thorui.cn/img/applets_extend.jpg']
					});
				}
				// #endif
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				// #ifdef APP-PLUS
				const subNVue = uni.getSubNVueById('share');
				subNVue.show('slide-in-bottom', 250);
				// #endif
			}
		}
	};
</script>

<style>
	.container {
		position: relative;
		padding-bottom: 100rpx;
	}

	.top-container {
		height: 440rpx;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.bg-img {
		position: absolute;
		width: 100%;
		height: 440rpx;
	}

	.logout {
		width: 110rpx;
		height: 36rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 42rpx 0 24rpx 32rpx;
		position: relative;
		z-index: 2;
	}

	.logout-img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 11rpx;
	}

	.logout-txt {
		font-size: 28rpx;
		color: #fefefe;
		line-height: 28rpx;
	}

	.user-wrapper {
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.user {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.avatar-img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		align-self: center;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		align-items: center;
	}

	.user-info-mobile {
		margin-top: 30rpx;
		position: relative;
		font-size: 28rpx;
		color: #fefefe;
		line-height: 28rpx;
		align-self: center;
		padding: 0 50rpx;
	}

	.edit-img {
		position: absolute;
		width: 42rpx;
		height: 42rpx;
		right: 0;
		bottom: -4rpx;
	}

	.edit-img>image {
		width: 42rpx;
		height: 42rpx;
		padding-left: 25rpx;
	}

	.middle-container {
		height: 138rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		border-radius: 10rpx;
		background-color: #ffffff;
		margin: -30rpx 30rpx 26rpx 30rpx;
		box-shadow: 0 15rpx 10rpx -15rpx #efefef;
		position: relative;
		z-index: 2;
	}

	.middle-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.ticket-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 65rpx;
	}

	.middle-tag {
		font-size: 28rpx;
		color: #333333;
		line-height: 28rpx;
		font-weight: bold;
		padding-left: 22rpx;
	}

	.car-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 97rpx;
	}

	.bottom-container {
		height: 167rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40rpx 74rpx 40rpx 95rpx;
		margin: 0 30rpx;
		margin-top: -80rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx #efefef;
		z-index: 1;
	}

	.ul-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.item-img {
		width: 64rpx;
		height: 64rpx;
	}

	.item-name {
		padding-top: 13rpx;
		font-size: 24rpx;
		color: #666666;
		min-width: 80rpx;
		text-align: center;
	}

	.btn-feedback {
		background: transparent !important;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		border: 0;
	}

	.btn-feedback::after {
		border: 0;
	}
	.tui-applets__vip{
		width: 100%;
		position: fixed;
		bottom: 20px;
		/* #ifdef H5 */
		bottom: 70px;
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
		z-index: 10;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #586c94;
	}
	.tui-applets__vip text{
		padding-left: 10rpx;
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-ml-auto {
		margin-left: auto;
	}
	
	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}
	.tui-logo {
		height: 52rpx;
		width: 52rpx;
		flex-shrink: 0;
	}
	.list-menu{
		margin: 0 20rpx;
	}
	.tui-banner {
		position: absolute;
		bottom: 0rpx;
		width: 100%;
		height: 375rpx
	}
</style>
