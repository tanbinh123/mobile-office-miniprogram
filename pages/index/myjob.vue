<template>
	<view class="tui-container">
		<tui-no-data :fixed="true"  imgUrl="/static/images/toast/img_noorder_3x.png" v-if="publishDocument.length == 0"
		 btnText="返回" @click="backto">
			<text class="tui-color__black">暂无任务~</text>
		
			<!--如果需要自定义按钮，可在插槽中自定义，不使用默认按钮-->
		</tui-no-data>
		<view class="tui-extend-box">
			<block v-for="(item, index) in publishDocument" :key="index" >
				<view class="tui-extend-item" :class="['tui-bg-' + item.bg]" @tap.stop="detail(item)">
					<view class="tui-title tui-light">{{ item.title }}</view>
					<view class="tui-sub-title">{{item.date.substr(0,10)}}-{{item.publisherName}}</view>
					<tui-badge type="danger" absolute :scaleRatio="0.8" top="-4rpx">{{item.stateName}}</tui-badge>
					<view class="tui-footer">
						<tui-tag padding="12rpx 24rpx" size="24rpx" type="white" shape="circle" :plain="true">查看详情</tui-tag>
						<view>
							<button @tap.stop="like(index)" class="tui-btn">
								<tui-icon :name="item.like ? 'like-fill' : 'like'" :color="item.like ? '#f54f46' : '#fff'" :size="20" class="tui-l-icon"></tui-icon>
							</button>
							<button open-type="share" @tap.stop="onshare" class="tui-btn" :data-id="index">
								<tui-icon name="partake" color="#fff" :size="20" class="tui-r-icon"></tui-icon>
							</button>
							
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import marked from '@/components/uni/marked'
	import uParse from '@/components/uni/uParse/src/wxParse'
	import {
		mapActions,
		mapState
	} from 'vuex';
	export default {
		components:{
			uParse
		},
		data() {
			return {
				list: [],
				publishDocument: [
				]
			};
		},
		computed: {
			...mapState(['networkConnected', 'isOnline'])
		},
		watch: {
		
		},
		onLoad() {
			this.tui.request('/document/getUnProcessed', "GET", {}, false,true, false ).then((res) => {
				this.publishDocument = res.data;
				if(this.publishDocument){
					uni.setStorageSync("office_task",this.publishDocument.length);
					for(var i = 0; i < this.publishDocument.length; i++){
						this.publishDocument[i].bg = this.getRandom();
						this.publishDocument[i].like = false;
						this.publishDocument[i].stateName = uni.getStorageSync("office_state")[parseInt(this.publishDocument[i].state)].name;
					}
				}
				console.log(res.data)
			}).catch((res) => {
				this.tui.toast(res.message, 2000, false);
			})
		},
		methods: {
			getRandom: function(index) {
				var rnd = Math.floor(Math.random() * 6 + 1);
				return rnd;
			},
			detail: function(document) {
				uni.setStorageSync("office_detail_document",document)
				uni.navigateTo({
					url: '/pages/extend/detail/detail?edit=true'
				});
			},
			like: function(index) {
				this.$set(this.publishDocument[index], 'like', !this.publishDocument[index].like);
			},
			backto: function() {
				uni.reLaunch({
					url: '/'
				});
			},
			onshare: function(e) {
				//#ifdef APP-PLUS
				let index = e.target.dataset.id;
				let title = this.publishDocument[index].title;
				plus.share.sendWithSystem({
						content: 'ThorUI：' + title,
						href: 'https://thorui.cn/'
					},
					function() {
						console.log('分享成功');
					},
					function(e) {
						console.log('分享失败：' + JSON.stringify(e));
					}
				);
				//#endif
				return false;
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
		onShareAppMessage: function(e) {
			let index = e.target.dataset.id;
			let title = this.publishDocument[index].title;
			return {
				title: title
			};
		}
	};
</script>

<style>
	page {
		-webkit-font-smoothing: antialiased;
	}

	.tui-container {
		width: 100%;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.tui-extend-box {
		flex: 1;
		margin-right: 10rpx;
	}

	.tui-extend-box:last-child {
		margin-right: 0;
	}

	.tui-extend-item {
		/* display: inline-block; */
		width: 100%;
		padding: 30rpx 20rpx;
		margin-bottom: 10rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
		color: #fff;
		font-family: 'Microsoft YaHei';
		text-align: justify;
		word-break: break-all;
		word-wrap: break-word;
		position: relative;
	}

	.tui-extend-item::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 20rpx;
	}

	.tui-title {
		font-size: 40rpx;
		line-height: 40rpx;
		font-weight: bold;
		position: relative;
	}

	.tui-sub-title {
		font-size: 32rpx;
		padding-top: 30rpx;
		color: #fff;
		position: relative;
		z-index: 10;
	}

	.tui-footer {
		padding-top: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 10;
		height: 44rpx;
	}

	.tui-r-icon {
		padding-left: 16rpx;
		padding-bottom: 5rpx;
	}

	.tui-l-icon {
		padding: 0 10rpx 5rpx 8rpx;
	}

	.tui-btn {
		background: transparent !important;
		padding: 0;
		/* #ifdef MP-ALIPAY */
		padding: 0 12rpx;
		/* #endif */
		margin: 0;
		display: inline;
		border: 0;
	}

	.tui-btn::after {
		border: 0;
	}

	.tui-bg-1 {
		background: #282537;
		background-image: -webkit-radial-gradient(top, circle farthest-corner, #3c3b52 0%, #252233 80%);
		background-image: radial-gradient(top, circle farthest-corner, #3c3b52 0%, #252233 80%);
	}

	.tui-bg-2 {
		background: #092756;
		background: -webkit-radial-gradient(0% 100%, ellipse farthest-corner, rgba(104, 128, 138, 0.4) 10%, rgba(138, 114, 76, 0) 40%),
			-webkit-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%), -webkit-linear-gradient(-45deg, #670d10 0%, #092756 100%);
		background: -webkit-radial-gradient(0% 100%, ellipse farthest-corner, rgba(104, 128, 138, 0.4) 10%, rgba(138, 114, 76, 0) 40%),
			linear-gradient(to bottom, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%), linear-gradient(135deg, #670d10 0%, #092756 100%);
	}

	.tui-bg-3 {
		background-image: linear-gradient(#8b9da9, #fff6e4);
		box-shadow: inset 0 0 100px hsla(0, 0%, 0%, 0.3);
	}

	.tui-bg-4 {
		background: rgb(105, 155, 200);
		background: -webkit-gradient(radial, top left, 0px, top left, 100%, color-stop(0%, rgba(105, 155, 200, 1)), color-stop(57%, rgba(181, 197, 216, 1)));
		background: -webkit-radial-gradient(top left, ellipse farthest-corner, rgba(105, 155, 200, 1) 0%, rgba(181, 197, 216, 1) 57%);
	}

	.tui-bg-5 {
		background-image: linear-gradient(45deg, rgba(194, 233, 221, 0.5) 1%, rgba(104, 119, 132, 0.5) 100%), linear-gradient(-45deg, #494d71 0%, rgba(217, 230, 185, 0.5) 80%);
	}

	.tui-bg-6 {
		background: rgb(244, 226, 156);
		background: -webkit-linear-gradient(-45deg, rgba(244, 226, 156, 0) 0%, rgba(59, 41, 58, 1) 100%),
			-webkit-linear-gradient(left, rgba(244, 226, 156, 1) 0%, rgba(130, 96, 87, 1) 100%);
		background: linear-gradient(135deg, rgba(244, 226, 156, 0) 0%, rgba(59, 41, 58, 1) 100%), linear-gradient(to right, rgba(244, 226, 156, 1) 0%, rgba(130, 96, 87, 1) 100%);
	}

	.tui-light {
		color: #fff;
		text-shadow: 0 0 0.1em rgba(0, 0, 0, 0.3), 0 0 0.2em rgba(0, 0, 0, 0.3);
	}
</style>
