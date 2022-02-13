<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#fafafa" borderRadius="10rpx"></tui-skeleton>
		<view class="container tui-skeleton">
			<image src="https://www.thorui.cn/img/wait.gif"  mode="widthFix" class="tui-banner tui-skeleton-rect"></image>
			
			
			<view class="tui-content-log">
				<view class="tui-version-date">
					{{document.code?document.code:"echo."}} | {{document.title?document.title:"echo."}}
				</view>
				<view  class="tui-log-text tui-skeleton-rect tui-doc-box" >
					<text >上次更新时间：{{document.date.substr(0,19).replace('T',' ')}} </text>
					<text >  公文等级：[{{document.estate}}]</text>
				</view>
				<view  class="tui-log-text tui-skeleton-rect" >
					<view class="tui-doc-box" style="justify-content: space-between">
						 <text >发布人：[{{document.publisherName}}]</text>
						  <text >  发布状态：[{{stateName[parseInt(document.state)].name}}]</text>
						   
					</view>
				</view>
			</view>
			
			<!-- 新建 / 草稿状态 -->
			<view class="tui-view" v-if="this.new || this.document.state == '0'">
				<!-- 内容 -->
				<form :report-submit="true" @submit="formLogin">
				<view class="tui-content">
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">公文编号</view>
								<input placeholder-class="tui-phcolor" v-model="document.code" class="tui-input" name="code" placeholder="请输入公文编号" maxlength="50" type="text" />
				
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">公文标题</view>
								<input placeholder-class="tui-phcolor" v-model="document.title" class="tui-input" name="title" placeholder="请输入公文标题" maxlength="50" type="text" />
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">保密等级</view>
								<input placeholder-class="tui-phcolor" v-model="document.estate" class="tui-input" name="estate" placeholder="数值越高保密等级越高" maxlength="50" type="number" />
							</view>
						</tui-list-cell>
				</view>
				</form>
				<jinEdit placeholder="请输入内容"  :html="document.content" @editOk="editOk"
				 uploadFileUrl="/#"></jinEdit>
			</view >
			
			<view class="tui-view" v-else>
				<block v-for="(item,index) in dataList" :key="index">
					<tui-collapse :index="index" :current="item.current" :disabled="item.disabled" @click="change">
						<template v-slot:title>
							<tui-list-cell :hover="!item.disabled" class="tui-skeleton-rect" style="font-size: 35rpx;">{{item.name}}</tui-list-cell>
						</template>
						<template v-slot:content>
							<view class="tui-content">
								<view class="tui-cell" v-if="index == 0">
									<!-- 审核 -->
									<view class="tui-link" >
										<view class="my-margin">
										
										<tui-button type="green" class="tui-skeleton-fillet "  shape="circle" @tap="pass(true)">提交</tui-button></view><view class="my-margin">
										<tui-button type="danger"  class="tui-skeleton-fillet"  shape="circle" @tap="pass(false)">打回</tui-button></view>
										<input placeholder-class="tui-phcolor" class="tui-input" name="remark" placeholder="提交备注"  v-model="remark" type="input" />
									</view>
								</view>
								<view class="tui-cell" v-if="index == 1">
									<!-- 内容 -->
									<jinEdit placeholder="请输入内容"  :html="document.content" @editOk="editOk"
									 uploadFileUrl="/#"></jinEdit>

								</view>
							</view>
						</template>
					</tui-collapse>
				</block>
				<view class="tui-order-tracking tui-skeleton-rect">
					<tui-time-axis>
						<tui-timeaxis-item backgroundColor="transparent"  v-for="(item,index) in document.documentHistory" :key="index">
							<template v-slot:node>
								<!-- <view class="tui-node" :style="{backgroundColor:backgroundColor}"> -->
								<view class="tui-node" style="backgroundColor:green" v-if="item.publish">
									<tui-icon :name="stateIcon[parseInt(item.state)]" color="#fff" :size="14" :bold="true"></tui-icon>
								</view>
								<view class="tui-node" style="backgroundColor:red" v-if="!item.publish">
									<tui-icon :name="stateIcon[parseInt(item.state)]" color="#fff" :size="14" :bold="true"></tui-icon>
								</view>
								
							</template>
						
							<template v-slot:content>
								<view>
									<view class="tui-order-title" v-if="item.publish">{{stateName[parseInt(item.state)].name}} <text style="color: green;"> [通过]</text></view>
									<view class="tui-order-title" v-if="!item.publish">{{stateName[parseInt(item.state)].name}}<text style="color: red;">[回退]</text> </view>
									<view class="tui-order-desc">备注：{{item.remark}}</view>
									<view class="tui-order-desc">审核人：{{item.approverName}}</view>
									<view class="tui-order-time tui-gray">{{item.date.substr(0,19).replace('T',' ')}}</view>
								</view>
							</template>
						</tui-timeaxis-item>

					</tui-time-axis>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import tuiCollapse from "@/components/thorui/tui-collapse/tui-collapse";
	import form from '@/components/common/tui-validation/tui-validation.js'
	import thorui from "@/components/common/tui-clipboard/tui-clipboard.js";
	import tuiTimeaxisItem from "@/components/thorui/tui-timeaxis-item/tui-timeaxis-item"
		import jinEdit from '@/components/jin-edit/jin-edit.vue';
	export default {
		components: {
			tuiCollapse,
			tuiTimeaxisItem,
			jinEdit
		},
		data() {
			return {
				remark: "",
				dataList: [{
						name: "公文审批",
						current: 0,
						disabled: false
					},
					{
						name: "公文详细",
						current: -1,
						disabled: false
					}
				],
				document: {
					"code": "",
					"content": "",
					"date": "",
					"documentHistory": [],
					"estate": "",
					"publisher": 0,
					"publisherName": "",
					"state": "",
					"title": ""
				},
				edit: false,
				new: false,
				skeletonShow: true,
				stateIcon: ["edit","transport","people","home","notice","order","check"],
				stateName:[],
			}
		},
		onLoad(option) {
			
			
			var titleName = '';
			this.stateName = uni.getStorageSync("office_state");
			//新建
			if (option.edit == "true"){
				this.edit = true;
				
			}else{
				this.dataList[0].disabled = true;
				this.dataList[0].current = -1;
				this.dataList[0].name += "（无操作权限）";
			}
			if (option.new == "true"){
				var user = uni.getStorageSync("office_user");
				this.document.publisher = user.id;
				this.document.publisherName = user.name;
				this.document.date = new Date().toISOString();
				this.document.state = "0";
				this.new = true;
				titleName = "[新建]";
			}else{
				this.document = uni.getStorageSync("office_detail_document");
				this.dataList[0].name += "流程-->[" + this.stateName[parseInt(this.document.state)].name + "]";
				this.document.documentHistory.sort(function(a, b) {
				  var x = a.date;
				  var y = b.date;
				  return x > y ? -1 : x < y ? 1 : 0;
				});
				titleName = this.document.title || 获取失败;
			}
			uni.setNavigationBarTitle({
				title: "公文：" + titleName
			})
			if (option.edit == "true"){
				this.edit = true;
			}
			
			
			setTimeout(() => {
				this.skeletonShow = false
			}, 800);
		},
		methods: {
			pass(ifPass){
				this.tui.modal("提示", ifPass?"确定通过？":"确认退回", true, (res) => {
					if (res) {
						let postData = {
							documentId: this.document.id,
							notification: 0,
							pass: ifPass,
							remark: this.remark,
						};
						this.tui.request("/document/approval", "GET", postData, false,true,false).then((res) => {
							res = res.data;	
							uni.setStorageSync("office_detail_document",res);
							this.tui.toast('提交成功', 2000, true);
							if(res.state != "0"){
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/extend/detail/detail?edit=false'
									});
								},1000);
							}else{
								setTimeout(() => {
									uni.reLaunch({
										url: '/'
									});
								},1000);
							}
							
						}).catch((res) => {
							this.tui.toast(res, 2000, true);
							console.log(res);
						})
						
					}
				})
			},
			change(e) {
				let index = e.index;
				let item = this.dataList[index];
				item.current = item.current == index ? -1 : index
			},
			getLink(e) {
				let link = e.currentTarget.dataset.link
				thorui.getClipboardData(link, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("链接复制成功")
					} else {
						this.tui.toast("链接复制失败")
					}
					// #endif
				})
			},
			editOk(res) {
				//alert(res);
				// errMsg: "getContents:ok"
				// html: "<p style=\"text-align: center;\">我是内容</p><p style=\"text-align: center;\"><img src=\"https://office-system-1592862-1309456602.ap-shanghai.run.tcloudbase.com/erupt-attachment/2022-02-09/NeExxugarvER.png\"><img src=\"https://office-system-1592862-1309456602.ap-shanghai.run.tcloudbase.com/erupt-attachment/2022-02-10/kryDYlpkPIgc.jpg\"></p><p style=\"text-align: center;\">da'w'da'wdawdawda'wdawda'w'da'w'dadawdawdaw&nbsp;</p><p style=\"text-align: center;\">我是公文</p><p style=\"text-align: center;\">dawdawdawword</p><p style=\"text-align: center;\"><br></p>"
				// isPublic: false
				// text: "我是内容\n\nda'w'da'wdawdawda'
				if(this.edit == false) {
					this.tui.toast('你没有权限编辑', 2000, true);
					return;
				}
				this.document.content = res.html;
				// if(this.new == false) {
				// 	this.tui.toast('公文已更新，请提交审核', 2000, true);
				// 	return;
				// }
				console.log(res);
				let rules = [
					{
						name: 'code',
						rule: ['required', 'isEnOrNo'],
						msg: ['请输入公文编号', '编号只能为英文或者数字']
					},
					{
						name: 'title',
						rule: ['required','maxLength:100'],
						msg: ['请输入公文标题','标题最长为100']
					},
					{
						name: 'estate',
						rule: ['required', 'isNum'],
						msg: ['请输入公文等级', '请输入数字等级1-3']
					}
				];
				//进行表单检查
				let formData = {
					code: this.document.code,
					title: this.document.title,
					estate: this.document.estate,
				};
				let checkRes = form.validation(formData, rules);
				if (checkRes) {
					this.tui.toast(checkRes);
					return;
				}
				if(this.document.estate < 0 || this.document.estate > 3){
					this.tui.toast("保密等级限定1-3");
					return;
				}
				if(res.text.length < 7){
					this.tui.toast("公文内容长度最短需要大于5");
					return;
				}
				if(res.isPublic == true) this.document.state = "1";
				else this.document.state = "0";
				
				this.tui.request("/document/", "POST", JSON.stringify(this.document) , false,false,false).then((res) => {
					if(res.status == 200){
						res = res.data;
						uni.setStorageSync("office_detail_document",res);
						this.tui.toast('提交成功', 2000, true);
						if(res.isPublic){
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/extend/detail/detail?edit=false'
								});
							},1000);
						}else{
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/myjob'
								});
							},1000);
						}
					}else{
						this.tui.toast(res.message, 2000, true);
					}
					
					
				}).catch((res) => {
					this.tui.toast(res, 2000, true);
					console.log(res);
				})
			},
		}
	}
</script>

<style>
	.container {
		padding-bottom: 20rpx;
	}

	.tui-banner {
		width: 100%;
		height: 375rpx;
	}

	.tui-text {
		width: 100%;
		padding: 12rpx 30rpx 20rpx;
		box-sizing: border-box;
		color: #B3B3B3;
		font-size: 26rpx;
		text-align: right;
		margin-top: 8rpx
	}

	.tui-view {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}


	.tui-cell {
		padding: 24rpx 0;
		color: #555;
	}

	.tui-title {
		padding: 0 8rpx;
		box-sizing: border-box;
		display: inline-block;
	}

	.tui-link {
		width: 100%;
		padding: 30rpx;
		
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0px 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		color: #06c;

		word-break: break-all;
	}

	.tui-order-header {
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-text {
		font-size: 28rpx;
		color: #333;
		padding: 4rpx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-node {
		height: 44rpx;
		width: 44rpx;
		border-radius: 50%;
		background-color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
	}

	.tui-node-dot {
		height: 16rpx;
		width: 16rpx;
		background-color: #ddd;
		border-radius: 50%;
		/* transform: translateY(45%); */
		margin-top: 6rpx;
	}

	.tui-bg-primary {
		background: #EB0909 !important;
	}

	.tui-order-tracking {
		padding: 30rpx 30rpx 5rpx 40rpx;
		background: #fff;
		margin-top: 20rpx;
		box-sizing: border-box;
	}

	.tui-order-title {
		padding-bottom: 12rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.tui-order-desc {
		padding-bottom: 12rpx;
		font-size: 28rpx;
		color: #333;
	}

	.tui-ptop {
		display: flex;
		justify-content: flex-start;
		line-height: 28rpx;
	}

	.tui-order-time {
		font-size: 24rpx;
		font-weight: bold;
	}

	.tui-gray {
		color: #848484 !important;
	}

	.tui-light-gray {
		color: #888 !important;
	}

	.tui-primary {
		color: #5677fc;
	}
	.tui-input {
		font-size: 32rpx;
		flex: 1;
		width: 100%;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		overflow: hidden;
	}
	.my-margin{
		margin-bottom: 20rpx;
	}
	.tui-content-log {
			margin-top: -80rpx;
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
		}
		
		.tui-doc-box {
			display: flex;
			justify-content: space-between;
			padding-top: 20rpx;
			word-break: break-all;
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
		
</style>
