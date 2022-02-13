<template>
	
	<view class="tui-container">

<!-- 			<tui-navigation-bar backgroundColor="#fff" :isFixed="true" :isOpacity="false">
				<view class="tui-content-box">
					<view class="tui-avatar-box"><image src="/static/images/index/logo.png" class="tui-avatar"></image></view>
					<view class="tui-search-box">
						<tui-icon name="search-2" :size="18" color="#bfbfbf"></tui-icon>
						<view class="tui-search-text">请输入搜索关键字</view>
					</view>
					<view class="tui-notice-box">
						<tui-icon name="square-fill" color="#333" :size="30"></tui-icon>
						<tui-badge type="danger" absolute :scaleRatio="0.8" top="-4rpx">9</tui-badge>
					</view>
				</view>
			</tui-navigation-bar> -->

		
		<view class="tui-extend-box">
			<block v-for="(item, index) in publishDocument" :key="index" v-if="(index + 1) % 2 != 0">
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
		<view class="tui-extend-box">
			<block v-for="(item, index) in publishDocument" :key="index" v-if="(index + 1) % 2 == 0">
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
					{
						id: 1434,
						content: "<p style=\"text-align: center;\">  da&#39;w&#39;da&#39;wdawdawda&#39;wdawda&#39;w&#39;da&#39;w&#39;dadawdawdaw&nbsp;</p><p style=\"text-align: center;\">我是公文</p><p style=\"text-align: center;\">dawdawdawword</p><p style=\"text-align: center;\"></p><p style=\"text-align: center;\"></p><p style=\"text-align: center;\"><audio controls=\"controls\" style=\"display: none;\"></audio></p>",
						publisher: 2,
						publisherName: "李四",
						state: "6",
						like: false,
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					},{
						id: 1453,
						content: "<p style=\"text-alig style=\"display: none;\"></audio></p>",
						publisher: 2,
						publisherName: "李四",
						state: "6",
						like: false,
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					},{
						id: 166,
						content: "<p style=\"text-align: s=\"controls\" style=\"display: none;\"></audio></p>",
						publisher: 2,
						publisherName: "李四",
						state: "6",
						like: false,
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					},{
						id: 155,
						content: "<p style=\"text-align: center;\">da&#39;w&#39;da&#39;wdawdawda&#39;wdawda&#39;w&#39;da&#39;w&#39;dadawdawdaw&nbsp;</p><p styrols=\"controls\" style=\"display: none;\"></audio></p>",
						publisher: 2,
						like: false,
						publisherName: "李四",
						state: "6",
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					},{
						id: 144,
						content: "<p style=\"text-align: center;\">da&#39;w&#39;da&#39;wdawdawda&#39;wdawda&#39;w&#39;da&#39;w&#39;dadawdawdaw&nbsp;</p><p style=\"text-align: center;\">我是公文</p><p style=\"text-align: center;\">dawdawdawword</p><p style=\"text-align: center;\">我是内容</p><p style=\"text-align: center;\">  </p><p style=\"text-align: center;\"><audio controls=\"controls\" style=\"display: none;\"></audio></p>",
						publisher: 2,
						publisherName: "李四",
						like: false,
						state: "6",
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					},{
						id: 123,
						content: "<p style=\"text-align: center;\">da&#39;w&#39;da&#39;wdawdawda&#39;wdawda&#39;w&#39;da&#39;w&#39;dadawdawdaw&nbsp;</p><p style=\"text-align: center;\">我是公文</p><p style=\"text-align: center;\">dawdawdawword</p><p style=\"text-align: center;\">我是内容</p><p style=\"text-align: center;\">  </p><p style=\"text-align: center;\"><audio controls=\"controls\" style=\"display: none;\"></audio></p>",
						publisher: 2,
						publisherName: "李四",
						state: "6",
						like: false,
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					},{
						id: 421,
						content: "<p style=\"text-align: center;\">da&#39;w&#39;da&#39;wdawdawda&#39;wdawda&#39;w&#39;da&#39;w&#39;dadawdawdaw&nbsp;</p><p style=\"text-align: center;\">我是公文</p><p style=\"text-align: center;\">dawdawdawword</p><p style=\"text-align: center;\">我是内容</p><p style=\"text-align: center;\">  </p><p style=\"text-align: center;\"><audio controls=\"controls\" style=\"display: none;\"></audio></p>",
						publisher: 2,
						publisherName: "李四",
						like: false,
						state: "6",
						title: "测试公文",
						bg: this.getRandom(),
						date: "2022-02-08T16:12:49.000+00:0"
					}
				],
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5
			};
		},
		computed: {
			...mapState(['networkConnected', 'isOnline'])
		},
		watch: {
		
		},
		onLoad() {
			this.tui.request('/document/getPublish', "GET", {}, false,true, false ).then((res) => {
				this.publishDocument = res.data;
				for(var i = 0; i < this.publishDocument.length; i++){
					this.publishDocument[i].bg = this.getRandom();
					this.publishDocument[i].like = false;
					this.publishDocument[i].stateName = uni.getStorageSync("office_state")[parseInt(this.publishDocument[i].state)].name;
				}
				console.log(res.data)
			}).catch((res) => {
				this.tui.toast(res.message, 2000, false);
			})
		},
		
		methods: {
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			back() {
				uni.navigateBack();
			},
			getRandom: function(index) {
				var rnd = Math.floor(Math.random() * 6 + 1);
				return rnd;
			},
			detail: function(document) {
				uni.setStorageSync("office_detail_document",document)
				uni.navigateTo({
					url: '/pages/extend/detail/detail?edit=false'
				});
			},
			like: function(index) {
				this.$set(this.publishDocument[index], 'like', !this.publishDocument[index].like);
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
		line-height: 45rpx;
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
	
.tui-content-box {
	width: 100%;
	height: 100rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}
	.tui-avatar-box {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #eaeef1;
		flex-shrink: 0;
	}
	.tui-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
	}
	
	.tui-search-box {
		width: 100%;
		height: 32px;
		margin: 0 28rpx;
		border-radius: 18px;
		font-size: 14px;
		background-color: #f1f1f1;
		padding: 0 12px;
		box-sizing: border-box;
		color: #bfbfbf;
		display: flex;
		align-items: center;
	}
	
	.tui-bg-white {
		background-color: #ffffff !important;
	}
	.tui-search-text {
		padding-left: 10rpx;
	}
	
	.tui-notice-box {
		position: relative;
		flex-shrink: 0;
		font-size: 44rpx;
		color: #fff;
	}
</style>
