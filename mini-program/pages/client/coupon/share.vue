<template>
	<view class="pd16_15">
		<view class="box noshadow pd16_15">
			<view class="flex alcenter">
				<image class="adviser-face-big" :src="statics.defaultFace"></image>
				<view style="width: calc(100% - 160rpx);" class=" pl15">
					<view class="ft16 cl-main ftw600">张顾问</view>
					<view class="flex alcenter mt8">
						<view class="flex alcenter cl-notice">
							<text class="iconfont iconicon_weixin ft14"></text>
							<text class="ft14 ml5">ffy1203605498</text>
						</view>
						<view class="copy-tag ml10" :style="{background:tempColor}">复制</view>
					</view>
					<view class="flex alcenter space mt8">
						<view class="flex alcenter cl-notice">
							<text class="iconfont iconicon_call ft14"></text>
							<text class="ft14 ml5">13515608638</text>
						</view>
						
						<text class="iconfont iconicon_bottom_call ft20" :style="{color:tempColor}"></text>
					</view>
				</view>
			</view>
			<view class="mt24">
				<button class="btn-mid plan" style="width: 100%;" :style="getBtnPlanStyle">
					绑定顾问
				</button>
			</view>
		</view>

		<view class=" mt24 coupon-box">
			<view class="pd16_15 bg-w flex alcenter space" style="border-bottom: 2rpx dashed   #E4E6ED;">
				<view class="flex alcenter">
					<view class="cl-orange" style="width: 96rpx;">
						<text class="ft12">¥</text>
						<text class="ft24 ftw600 ml4">20</text>
					</view>
					<view class="ml15">
						<view class="ft14 ftw600 cl-main">普通洗剪吹优惠券</view>
						<view class="mt12 ft12 cl-info2">有效期：2019.11.16-2020.11.16</view>
					</view>
				</view>
				<view class="btn-mini" :style="getBtnStyle">领取</view>
			</view>
			<view class="pd16_15 ft12 cl-notice">满50元可用，不可与其他优惠活动同时使用</view>
			<view class="coupon-yl"></view>
			<view class="coupon-yr"></view>
			<view class="coupon-vip-tag">会员专享</view>
		</view>

		<view class="mt24">
			<button class="btn-big" :style="{color:tempColor,background:'#fff'}">查看更多优惠券 <text class="iconfont iconicon_arrow_small ft14 ml10"></text></button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.adviser-face-big{
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
		background: #FFFFFF;
	}
	.copy-tag{
		width: 96rpx;
		height: 40rpx;
		color:#FFFFFF;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 20rpx;
	}
	
	.coupon-box{
		background: #FAFAFA;
		border-radius: 16rpx;
		overflow: hidden;
		position: relative;
		height: 252rpx;
	}
	.coupon-box .coupon-yl,.coupon-box .coupon-yr{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 148rpx;
		background: #F5F6FA; 
		z-index: 2;
	}
	.coupon-box .coupon-vip-tag{
		width: 120rpx;
		height: 40rpx;
		background: linear-gradient(139deg, #FFEDC6 0%, #FFD08D 100%);
		border-radius: 20rpx 0rpx 20rpx 0rpx;
		position: absolute;
		left: 0;
		top: 0;
		font-size: 24rpx;
		color:#A86B1B;
		text-align: center;
		line-height: 40rpx;
	}
	.coupon-box .coupon-yl{
		left: -10rpx;
	}
	.coupon-box .coupon-yr{
		right: -10rpx;
	}
</style>