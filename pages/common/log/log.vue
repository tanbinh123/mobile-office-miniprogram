<template>
	<view class="container">
		<view class="tui-header">
			Hi，欢迎使用移动审批小程序！当前版本：
			<text class="tui-version">V{{ version }}</text>
		</view>
		<view class="tui-log">
			<tui-time-axis>
				<tui-timeaxis-item v-for="(item, index) in logList" :key="index">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="explore-fill" :color="version == item.version ? '#5c8dff' : '#ddd'"
								:size="18"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-content-log" :class="[version == item.version ? '' : 'tui-log-gray']">
							<view class="tui-version-date">
								{{ logList.length - 1 == index ? item.version : 'V' + item.version }}（{{ item.date }}）
							</view>
							<view v-for="(model, index2) in item.log" :key="index2" class="tui-log-text">{{ model }}
							</view>
							<view class="tui-doc-box" v-if="index === logList.length - 1">
								<view>组件文档地址：</view>
								<view class="tui-link" @tap.stop="getLink('https://thorui.cn/doc/')">
									https://thorui.cn/doc/</view>
								<view class="tui-link" @tap.stop="getLink('http://www.donarui.com')">
									http://www.donarui.com</view>
								<view>uni-app版本GitHub地址：</view>
								<view class="tui-link"
									@tap.stop="getLink('https://github.com/dingyong0214/ThorUI-uniapp')">
									https://github.com/dingyong0214/ThorUI-uniapp</view>
								<view>uni-app版本插件市场地址：</view>
								<view class="tui-link" @tap.stop="getLink('https://ext.dcloud.net.cn/plugin?id=556')">
									https://ext.dcloud.net.cn/plugin?id=556</view>
								<view>小程序版本GitHub地址：</view>
								<view class="tui-link" @tap.stop="getLink('https://github.com/dingyong0214/ThorUI')">
									https://github.com/dingyong0214/ThorUI</view>
								<view>小程序版本插件市场地址：</view>
								<view class="tui-link" @tap.stop="getLink('https://ext.dcloud.net.cn/plugin?id=569')">
									https://ext.dcloud.net.cn/plugin?id=569</view>
							</view>
						</view>
					</template>
				</tui-timeaxis-item>
			</tui-time-axis>
		</view>
	</view>
</template>

<script>
	import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['version']),
		data() {
			return {
				logList: [{
						version: 'preface',
						date: '2022-02-08',
						log: ['本项目前台采用ThorUI，后台采用Erupt框架，部署使用微信云托管，感谢以上框架的支持']
					},
					{
						version: '1.0.0',
						date: '2022-02-09',
						log: [
							'======初始化后台=======',
							'1.【初始化】后台框架搭建完成（Erupt）',
							'2.【初始化】前台技术及原型初选',
							'3.【初始化】API鉴权、全局统一返回',
							'4.【拓展】魔改Erupt后台token接口',
							'5.【扩展】采用knife4j统一接口页面',
							'6.【开发】完善用户基础接口',
							'7.【开发】完善公文基础接口',
							'8.【开发】完善信息基础接口',
							'9.已知bug修复，以及部分功能优化'
						]
					},
					{
						
						version: '1.0.0',
						date: '2022-02-10',
						log: [
							'======完善后台逻辑&集成发布=======',
							'1.【部署】采用云容器技术集成发布（微信云托管）',
							'2.【完善】完善后台接口',
							'3.【完善】完成单元测试',
							'4.【开发】完善所有基础接口',
							'5. 已知bug修复，以及部分功能优化'
						]
					},
					{
						version: '1.0.1',
						date: '2022-02-11',
						log: [
							'========搭建脚手架对接API=========',
							'1.【初始化】前台框架搭建完成（Thor UI）',
							'2.【初始化】首页、个人页、登录、注册页面完成',
							'3.【拓展】接入api、统一拦截管理请求',
							'4.【扩展】支持登录、注册',
							'5.【完善】搭建基础脚手架完成',
							'6.已知bug修复，以及部分功能优化'
						]
					},
					{
						version: '1.0.2',
						date: '2022-02-14',
						log: [
							'========搭建脚手架对接API=========',
							'1.【完善】支持发布公文，支持渲染富文本公文',
							'2.【完善】前台逻辑全部完成，支持获取个人公文，个人审批记录',
							'3.【完善】完善拦截管理',
							'4.【修复】修复微信小程序v-if无效（使用v-model）',
							'5.【Bug】公文暂不支持上传图片',
							'6.已知bug修复，以及部分功能优化'
						]
					}
					
				].reverse()
			};
		},
		methods: {
			getLink: function(link) {
				thorui.getClipboardData(link, res => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast('链接复制成功');
					} else {
						this.tui.toast('链接复制失败');
					}
					// #endif
				});
			}
		}
	};
</script>

<style>
	.container {
		overflow: hidden;
	}

	.tui-header {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #999;
		height: 54rpx;
		line-height: 54rpx;
		background: #fff8d5;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 999999;
	}

	.tui-version {
		color: #f54f46;
		font-weight: bold;
	}

	.tui-log {
		padding: 84rpx 80rpx 30rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-node {
		padding: 3px 0;
	}

	.tui-content-log {
		border-radius: 10rpx;
		position: relative;
		padding: 20rpx 26rpx;
		font-size: 28rpx;
		color: #fff;
		background: #5c8dff;
		border: 1rpx solid #5c8dff;
		display: inline-block;
		word-break: break-all;
	}

	/* 
.tui-log-text {
	word-break: break-all;
	word-wrap: break-word;
	text-align: justify;
} */

	.tui-content-log::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		top: 14rpx;
		border: 16rpx solid;
		right: 100%;
		border-color: transparent #5c8dff transparent transparent;
	}

	.tui-log-gray {
		background: #ededed !important;
		border: 1rpx solid #ededed !important;
		color: #999 !important;
	}

	.tui-log-gray::before {
		border-color: transparent #ededed transparent transparent !important;
	}

	.tui-version-date {
		font-size: 32rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
	}

	.tui-doc-box {
		padding-top: 20rpx;
		word-break: break-all;
	}

	.tui-link {
		padding-bottom: 20rpx;
		color: #0066cc;
	}
</style>
