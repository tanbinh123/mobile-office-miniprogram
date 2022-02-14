<template>
	<view>
		<view class="container">

			<view class="tui-page-hd ">
				<view class="tui-page-title" @tap="doc">
					<image src="/static/images/index/logo.png" class="tui-logo"></image>

					<view class="tui-title">
						{{appName}}
						<view class="tui-badge">说明</view>
					</view>
				</view>

				<view class="tui-page-desc">

				</view>
				<view v-if="!isLogin">
					<image src="https://www.thorui.cn/img/wait.gif" style="z-index: -1;"  mode="widthFix" class="tui-banner"></image>

				</view>

			</view>
			<!--banner-->
			<view class="tui-banner-box">
				<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="tui-banner-swiper"
				 :circular="true" previous-margin="60rpx" next-margin="60rpx" @change="change">
					<swiper-item v-for="(item, index) in banner" :key="'index1' + index" class="tui-banner-item">
						<image :src="item" class="tui-slide-image" :class="[current != index ? 'tui-banner-scale' : '']" mode="scaleToFill"
						 lazy-load @tap="detail" />
					</swiper-item>
				</swiper>
			</view>
			<!--banner-->
			<!--headlines-->
			<view class="tui-container list-item">

				<swiper :vertical="true" :autoplay="true" :circular="true" :interval="4000" class="tui-swiper">
					<swiper-item v-for="(item, index) in headlines" :key="'index' + index" class="tui-swiper-item">
						<view class="tui-news-item"><text>{{ item }}</text>
							<text class="tui-link" @tap="openThorUI">小程序</text></view>
					</swiper-item>
				</swiper>

			</view>
			<view class="tui-container" v-if="isLogin">

				<view class="tui-extend-box">
					<block>
						<view class="tui-extend-item tui-bg-2" @tap.stop="toMyDocument">
							<view class="tui-title-white tui-light">历史记录</view>

							<view class="tui-footer">
								<tui-tag padding="12rpx 24rpx" size="24rpx" type="white" shape="circle" :plain="true">查看详情</tui-tag>
							</view>
						</view>
					</block>
				</view>
				<view class="tui-extend-box">
					<block>
						<view class="tui-extend-item tui-bg-1" @tap.stop="toMyJob">

							<view class="tui-title-white tui-light">当前任务<tui-badge type="white_red" absolute :scaleRatio="1.4" translateX="0%"
								 top="-22rpx">{{myTask}}</tui-badge>
							</view>


							<view class="tui-footer">
								<tui-tag padding="12rpx 24rpx" size="24rpx" type="white" shape="circle" :plain="true">查看详情</tui-tag>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="tui-container" v-if="isLogin">
				<view class="tui-extend-box">
					<block>
						<view class="tui-extend-item tui-bg-3" @tap.stop="detail(item)">
							<view class="tui-title-white tui-light" >欢迎来自 {{user.eruptOrg != null? user.eruptOrg.name:'未知'}}的{{user.eruptPost != null? user.eruptPost.name : '未知'}}-{{user.name}}</view>
							<view class="tui-flex-box tui-title-white tui-sub-title">
								<tui-tag v-for="(item, index) in department" :key="'index2' + index" margin="10rpx 10rpx 5rpx 5rpx" shape="circle"
								 :type="item.bg" @click="show">{{item.name}}:{{item.sort}}人</tui-tag>
								<tui-tag v-for="(item, index) in post" :key="index" margin="10rpx 10rpx 5rpx 5rpx" shape="circle" :type="item.bg"
								 @click="show">{{item.name}}:{{item.weight}}人</tui-tag>
							</view>
						</view>
					</block>
				</view>

			</view>
			<!--headlines-->
			<tui-no-data :fixed="false" style="margin-top: 20rpx;" imgUrl="/static/images/toast/img_noorder_3x.png" v-if="!isLogin"
			 btnText="前往登录" @click="toLogin">
				<text class="tui-color__black">暂无数据~</text>

				<!--如果需要自定义按钮，可在插槽中自定义，不使用默认按钮-->
			</tui-no-data>




		</view>
	</view>
</template>

<script>
	import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'
	import tuiBadge from "@/components/thorui/tui-badge/tui-badge"
	import {
		mapActions,
		mapState,
	} from 'vuex';
	export default {
		components: {
			tuiBadge
		},
		data() {
			return {
				hitokotoWord: '正在加载~',
				platform: 'uni-app',
				user: [],
				list: [],
				department: [],
				post: [],
				banner: ['/static/images/mall/banner/1.jpg', '/static/images/mall/banner/2.jpg', '/static/images/mall/banner/3.jpg',
					'/static/images/mall/banner/4.jpg', '/static/images/mall/banner/11.gif'
				],
				classify: [{
						img: 'kongtiao',
						name: '空调'
					},
					{
						img: 'Icewash',
						name: '冰洗'
					},
					{
						img: 'heater',
						name: '热水器'
					},
					{
						img: 'bed',
						name: '床'
					},
					{
						img: 'boutique',
						name: '精品'
					}
				],
				current: 0,
				headlines: ['让审批效率倍速提升-更多功能敬请期待', '欢迎使用本程序~作者QQ：xxxxxxx', '初次使用可点击右上角关于查看说明', '系统在开发阶段，意见反馈前往我的查看'],
				color: ["black", "white", "green", "btn-gray", "light-blue", "light-brownish", "light-orange",
					"light-green"
				],
				colorIndex: 0
			};
		},
		computed: {
			...mapState(['networkConnected', 'isOnline', 'appName', 'isLogin','myTask'])
		},
		watch: {
			networkConnected(isConnected) {
				if (isConnected) {
					this.menuHandle();
				}
			},
			isOnline(val) {
				if (val) {
					this.menuHandle();
				}
			}
		},
		onLoad() {
			
			this.tui.request("https://v1.hitokoto.cn/", "GET", {}, false, true, true).then((res) => {
				console.log(res);
				this.hitokotoWord = res.hitokoto + "--" + res.from;
				this.headlines.push(this.hitokotoWord)
			}).catch((res) => {
				console.log(res);
			})
			this.user = uni.getStorageSync("office_user");
			this.department = uni.getStorageSync('office_department');
			this.post = uni.getStorageSync('office_post');
			for (var i = 0; i < this.department.length; i++) {
				this.department[i].bg = this.randColor();
			}
			for (var i = 0; i < this.post.length; i++) {
				this.post[i].bg = this.randColor();
			}
			// #ifdef MP
			this.platform = '小程序';
			// #endif
			uni.$on('emit', data => {
				setTimeout(() => {
					this.tui.toast('您选择了：' + data);
				}, 350);
			});
			setTimeout(() => {
				this.menuHandle();
			}, 50);
		},
		methods: {
			...mapActions(['getOnlineStatus']),
			randColor() {

				this.colorIndex++;
				if (this.colorIndex >= this.color.length) {
					this.colorIndex = 0;
				}
				return this.color[this.colorIndex];
			},
			show() {
				this.tui.toast("click~")
			},
			async menuHandle() {
				this.list = this.listOnline;
			},
			kindToggle: function(e) {
				var id = e.currentTarget.id,
					list = this.list;
				for (var i = 0, len = list.length; i < len; ++i) {
					if (list[i].id == id) {
						list[i].open = !list[i].open;
					} else {
						list[i].open = false;
					}
				}
				this.list = list;
			},
			github: function(event) {
				//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
				thorui.getClipboardData('https://github.com/dingyong0214/ThorUI-uniapp', res => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast('链接复制成功');
					} else {
						this.tui.toast('链接复制失败');
					}
					// #endif
				}, event);
			},
			change: function(e) {
				this.current = e.detail.current;
			},
			mall: function() {
				if (this.list.length < 8) return;
				uni.navigateTo({
					url: '../../template/mall/mall/mall'
				});
			},
			doc: function() {
				uni.navigateTo({
					url: '../../doc/doc/doc'
				});
			},
			toLogin: function() {
				uni.navigateTo({
					url: '/pages/common/login/login'
				});
			},
			toMyJob: function() {
				uni.navigateTo({
					url: '/pages/index/myjob'
				});
			},
			toMyDocument: function() {
				uni.navigateTo({
					url: '/pages/index/mydocument'
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
		}
	};
</script>

<style>
	.container {
		width: 100%;
		padding-bottom: 30rpx;
	}

	.container1 {
		padding: 20rpx 30rpx 40rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-text {
		position: absolute;
		bottom: 0rpx;
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		color: #000000;
		font-size: 26rpx;
		text-align: right;
	}

	.tui-banner {
		position: absolute;
		bottom: -60rpx;
		width: 100%;
		height: 375rpx
	}

	.tui-page-title {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0 30rpx 0;
	}

	.tui-logo {
		height: 108rpx;
		width: 108rpx;
		border-radius: 50%;
	}

	.tui-title {
		font-size: 64rpx;
		padding-left: 20rpx;
		color: #333;
		position: relative;
	}

	.tui-link {
		color: #5677fc;
	}

	.tui-cell {
		padding: 10px 15px;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.tui-cell:before {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		border-top: 1px solid #eaeef1;
		color: #eaeef1;
		left: 15px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
	}

	.tui-cell:first-child:before {
		display: none;
	}

	.tui-cell_active {
		background-color: #f7f7f9;
	}

	.tui-cell_bd {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}

	.tui-cell_ft {
		text-align: right;
		color: #999;
	}

	.tui-cell_access {
		color: inherit;
	}

	.tui-cell_ft_in-access {
		padding-right: 13px;
		position: relative;
	}

	.tui-cell_ft_in-access:after {
		content: ' ';
		height: 11px;
		width: 11px;
		border-width: 2px 2px 0 0;
		border-color: #b2b2b2;
		border-style: solid;
		-webkit-transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
		transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
		position: absolute;
		top: 50%;
		margin-top: -7px;
		right: 2px;
	}

	.tui-form-preview_item {
		overflow: hidden;
	}

	.tui-flex {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	.tui-flex_item {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}

	.tui-page-desc {
		width: 100%;
		color: #666;
		font-size: 28rpx;
		text-align: center;
		padding: 0 80rpx;
		box-sizing: border-box;
	}

	.tui-link {
		color: #586c94;
	}

	.tui-flex {
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.tui-cells {
		margin-top: 0;
		opacity: 0;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}

	.tui-cells:before,
	.tui-cells:after {
		display: none;
	}

	.tui-cells_show {
		opacity: 1;
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

	.tui-cell:before {
		right: 15px;
	}

	.kind-list_item {
		margin: 10px 0;
		background-color: #fff;
		border-radius: 2px;
		overflow: hidden;
	}

	.kind-list_item:first-child {
		margin-top: 0;
	}

	.kind-list_img {
		width: 30px;
		height: 30px;
	}

	.tui-img-1,
	.tui-img-2,
	.tui-img-8 {
		width: 32px !important;
		height: 32px !important;
	}

	.tui-img-7 {
		width: 28px !important;
		height: 28px !important;
	}

	.kind-list_item-hd {
		padding: 20px;
		-webkit-transition: opacity 0.3s;
		transition: opacity 0.3s;
	}

	.kind-list_item-hd_show {
		opacity: 0.4;
	}

	.kind-list_item-bd {
		height: 0;
		overflow: hidden;
	}

	.kind-list_item-bd_show {
		height: auto;
	}

	.tui-badge {
		position: absolute;
		width: 80rpx;
		height: 30rpx;
		border-radius: 30rpx 30rpx 30rpx 0;
		color: #fff;
		background: #eb0909;
		font-size: 25rpx;
		font-weight: 400;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: scale(0.8) translateX(100%);
		transform-origin: center center;
		top: -18rpx;
		right: 0;
	}

	/*banner*/

	.tui-banner-box {
		width: 100%;
		padding-top: 10rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-banner-swiper {
		width: 100%;
		height: 300rpx;
	}

	.tui-banner-item {
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-slide-image {
		width: 100%;
		height: 300rpx;
		display: block;
		border-radius: 12rpx;
		/* transition: all 0.1s linear; */
	}

	.tui-banner-scale {
		transform: scaleY(0.9);
		transform-origin: center center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.tui-banner-swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */
	/*banner*/

	/*headlines*/

	.tui-rolling-news {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: #fff;
	}

	.tui-rolling-news::after {
		left: 0;
	}

	.tui-swiper {

		margin-left: 8rpx;
		font-size: 28rpx;
		height: 80rpx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;

		justify-content: center;
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #555;
	}

	/*headlines*/
	.tui-color__black {
		color: #000000;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 10rpx;

	}

	.tui-container {
		width: 100%;
		padding: 5rpx 45rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.tui-extend-box {
		flex: 1;
		padding: 5rpx 1rpx;
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

	.tui-title-white {
		font-size: 40rpx;
		line-height: 40rpx;
		font-weight: bold;
		position: relative;
	}

	.tui-sub-title {
		font-size: 32rpx;
		padding-top: 10rpx;
		color: #fff;
		position: relative;
		z-index: 10;
	}

	.tui-footer {
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 10;
		height: 44rpx;
	}

	.tui-bg-1 {
		background: rgb(105, 155, 200);
		background: -webkit-gradient(radial, top left, 0px, top left, 100%, color-stop(0%, rgba(105, 155, 200, 1)), color-stop(57%, rgba(181, 197, 216, 1)));
		background: -webkit-radial-gradient(top left, ellipse farthest-corner, rgba(105, 155, 200, 1) 0%, rgba(181, 197, 216, 1) 57%);
	}

	.tui-bg-2 {
		background-image: linear-gradient(45deg, rgba(194, 233, 221, 0.5) 1%, rgba(104, 119, 132, 0.5) 100%), linear-gradient(-45deg, #494d71 0%, rgba(217, 230, 185, 0.5) 80%);
	}

	.tui-bg-3 {
		background-image: linear-gradient(#8b9da9, #fff6e4);
		box-shadow: inset 0 0 100px hsla(0, 0%, 0%, 0.3);
	}

	.tui-badge-box {
		padding-right: 40rpx;
	}
</style>
