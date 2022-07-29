<template>
	<view>
		<view v-if="detail.status == -1" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status07 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已取消</text>
			</view>
		</view>
		
		<view v-if="detail.status == 0" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status01 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待付款</text>
			</view>
			<view class="flex alcenter">
				<text class="ft14 cl-main mr10"></text>
				<countdown-time :t="900"></countdown-time>
			</view>
		</view>
		<view v-if="detail.status > 0" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status02 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已完成</text>
			</view>
		</view>
		<view class="pd16_15">
			<view class="box over-hide">
				<view class="card-box-header">
					<image class="bg" :src="statics.cardBg[0]"></image>
					<view class="main pd16_15">
						<view class="flex space">
							<view>
								<view class="ft16 ftw600 cl-w">VIP洗剪吹次卡</view>
								<view class="mt8 flex alcenter">
									<view class="tag-card">次卡</view>
									<text class="ft12 cl-w ml4">全门店通用</text>
								</view>
							</view>
							<text class="iconfont iconicon_arrow_circle ft22 cl-w8"></text>
						</view>
						<view class="mt16  flex alcenter space">
							<view class="flex alcenter">
								<view class="cl-yellow">
									<text class="ft12">¥</text>
									<text class="ml4 ft24 ftw600">100</text>
								</view>
								<view class="tag-save ml10">
									省999元
								</view>
							</view>
							<text class="cl-yellow ft12">有效期：1年</text>
						</view>
					</view>
				</view>
				<view class="pd16_15 flex alcenter space">
					<view class="ft12 cl-notice">200人已购</view>
					<view class="flex alcenter" :style="{color:tempColor}">
						<text class="iconfont iconicon_yes"></text>
						<text class="ft12 ml5">可送好友</text>
					</view>
					<!-- <view class="flex alcenter" :style="{color:'#C5CADB'}">
						<text class="iconfont iconicon_no"></text> 
						<text class="ft12 ml5">不可赠送</text>
					</view> -->
				</view>
				
				
			</view>
			<view class="box mt16 pd16_15 flex alcenter space">
				<text class="ft16 ftw600" :style="{color:tempColor}">查看适用门店</text>
				<text class="iconfont iconicon_arrow_small ft14 cl-notice"></text>
			</view>
			<view class="box mt16 pd16_15">
				<view class="ft16 ftw600 cl-main">包含套餐服务</view>
				<view class="bd-line mt16"></view>
				<view class="mt16">
					<view class="ft14 cl-main ftw600">单人潮流洗吹造型</view>
					<view class="mt12 flex alcenter space">
						<view class="ft12 cl-notice">门市价：<text class="ft12 text-line">¥88</text></view>
						<view>
							<text class="ft12 cl-notice">总次数</text>
							<text class="ft14 cl-main ftw600">4次</text>
						</view>
					</view>
				</view>
				<view class="mt16">
					<view class="ft14 cl-main ftw600">单人潮流洗吹造型</view>
					<view class="mt12 flex alcenter space">
						<view class="ft12 cl-notice">门市价：<text class="ft12 text-line">¥88</text></view>
						<view>
							<text class="ft12 cl-notice">总次数</text>
							<text class="ft14 cl-main ftw600">4次</text>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="box mt16 pd16_15">
				<view class="ft16 ftw600 cl-main">订单详情</view>
				<view class="flex mt16">
					<text class="ft14 cl-info2">订单编号：</text>
					<text class="ft14 cl-main">1034568888</text>
				</view>
				<view class="flex mt16">
					<text class="ft14 cl-info2">手机号码：</text>
					<text class="ft14 cl-main">13515608638</text>
				</view>
				<view class="flex mt16">
					<text class="ft14 cl-info2">下单时间：</text>
					<text class="ft14 cl-main">2020-10-23 15:10:10</text>
				</view>
				<view class="flex mt16">
					<text class="ft14 cl-info2">订单状态：</text>
					<text class="ft14 cl-main">未支付</text>
				</view>
		
			</view>
		
		</view>
		<dialog-payment v-if="showPayment" @closed="showPayment = false;"></dialog-payment>
		
		<view v-if="detail.status == 0" class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15 flex alcenter space">
					<button class="btn-big plan" style="width: 330rpx;">取消订单</button>
					<button class="btn-big" @click="showPayment = true" :style="getBtnStyle" style="width: 330rpx;">立即支付</button>
				</view>
			</view>
		</view>
		<view v-if="detail.status >0" class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15 ">
					<navigator url="/pages/client/card/mine/detail">
						<button class="btn-big plan" :style="getBtnPlanStyle">查看次卡</button>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				showPayment:false,
				detail:{
					status:1,//status  0,待付款  1已完成   -1订单取消
					// 2赠送中  3已赠送   4已过期  8已完成 这些状态不在这里 
				}
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.card-box-header{
		height: 232rpx;
		width: 100%;
		position: relative;
	}
	.card-box-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 232rpx;
	}
	.card-box-header .bg{
		width: 100%;
		height: 232rpx;
	}
	.tag-card{
		width: 64rpx;
		height: 32rpx;
		background: linear-gradient(139deg, #FFE5AD 0%, #FFBC5C 100%);
		border-radius: 4rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 32rpx;
		color: #A86B1B;
	}
	.tag-save{
		width: 138rpx;
		height: 40rpx;
		background: linear-gradient(139deg, #FFE5AD 0%, #FFBC5C 100%);
		border-radius: 20rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		color:#F51A1A;
		font-weight: 600;
	}
</style>