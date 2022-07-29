<template>
	<view>
		<view class="coupon-mine-header-h">
			<view class="coupon-mine-main coupon-mine-header-h">
				<sub-tab :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tab>
			</view>
		</view>
		
		<view v-if="selectIndex == 0" class="pd16_15">
			
			<view class="coupon-box">
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
					<view class="btn-mini" :style="getBtnStyle">使用</view>
				</view>
				<view class="pd16_15 ft12 cl-notice">满50元可用，不可与其他优惠活动同时使用</view>
				<view class="coupon-yl"></view>
				<view class="coupon-yr"></view>
				<view class="coupon-vip-tag">会员专享</view>
			</view>
			
		</view>
		<view class="pd16_15" v-else>
			<view class="coupon-box over">
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
				</view>
				<view class="pd16_15 ft12 cl-notice">满50元可用，不可与其他优惠活动同时使用</view>
				<view class="coupon-yl"></view>
				<view class="coupon-yr"></view>
				<view class="coupon-vip-tag">会员专享</view>
				<view class="over-used">
					<image :src="statics.statusImg[0]"></image>
					<!-- <image :src="statics.statusImg[1]"></image> -->
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				selectIndex:0,
				tabs:['待使用','历史券'],
			}
		},
		onLoad(){
			
		},
		methods:{
			changeIndex(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.coupon-mine-header-h{
		height: 100rpx;
	}
	.coupon-mine-main{
		position: fixed;
		width: 100%;
		background: #FFFFFF;
		z-index: 10;
		left: 0;
		top: 0;
	}
	
	.coupon-box{
		background: #FAFAFA;
		border-radius: 16rpx;
		overflow: hidden;
		position: relative;
		height: 252rpx;
	}
	.coupon-box.over{
		opacity: 0.8;
		filter: grayscale(100%);
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
	.coupon-box .coupon-yl{
		left: -10rpx;
	}
	.coupon-box .coupon-yr{
		right: -10rpx;
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
	.coupon-box .over-used{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(255,255,255,.4);
		text-align: right;
	}
	.coupon-box .over-used image{
		width: 104rpx;
		height: 104rpx;
	}
</style>