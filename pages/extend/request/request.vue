<template>
	<view class="container">
		<view class="header">
			<view class="title">网络请求</view>
			<view class="sub-title">Network request，发起网络请求，简单的封装与使用 </view>
		</view>
		<view class="tui-btn-box">
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="request(0)">获取当前user</tui-button>
			</view>
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="request(1)">获取当前用户详细信息</tui-button>
			</view>
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="request(2)">获取用户发布的公文</tui-button>
			</view>
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="request(3)">获取用户审批记录</tui-button>
			</view>
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="request(4)">获取已经发布的公文</tui-button>
			</view>
			<view class="tui-btn-btm">
				<tui-button type="white" shape="circle" @click="request(5)">获取角色对应待审批公文</tui-button>
			</view>
		</view>
		<view class="tui-result">
			请求结果：<text class="tui-red">{{result}}</text>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				result: ""
			}
		},
		methods: {
			request: function(type) {
				//参数
				let urls = ["/auth/currentUser",
				"/auth/currentDetailUser",
				"/document/getMyDocument",
				"/document/getProcessed",
				"/document/getPublish",
				"/document/getUnProcessed",]
				let postData = {}
				this.tui.request(urls[type], "GET", postData, false,true, false ).then((res) => {
					this.result = `${JSON.stringify(res)}`
				}).catch((res) => {
					this.tui.toast(res.message, 2000, false);
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0 120rpx 0;
		box-sizing: border-box;
	}

	.header {
		padding: 80rpx 90rpx 60rpx 90rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}

	.sub-title {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}

	.tui-btn-box {
		padding: 10rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-btn-btm {
		margin-bottom: 36rpx;
	}

	.tui-result {
		width: 100%;
		padding: 30rpx 40rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-red {
		color: #ee0900;
	}
</style>
