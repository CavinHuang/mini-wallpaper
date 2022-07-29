<template>
	<view class="pb20">
		<view class="counpon-page-header">
			<image :src="statics.couponHeader"></image>
		</view>
		<view class="coupon-page-main plr15">
			<view class="coupon-vip-box">
				<view class="vip-header">
					<view class="main">VIP领券专区</view>
					<image  :src="statics.couponVipHeader"></image>
				</view>
				<view class="mt16 ft14 cl-w9 text-center">{{getTitle}}</view>
				<view class="pd16_15">
					<scroll-view class="vip-coupon-scroll" :scroll-x="true">
						<view class="item">
							<view class="top">
								<view class="text-center ft14 ftw600 cl-main">
									洗剪吹优惠券
								</view>
								<view class="flex center mt12">
									<view class="vip-coupon-num">
										<image :src="statics.couponNumBg"></image>
										<view class="num cl-orange">
											<text class="ft24 ftw600">¥</text>
											<text class="ft24 ftw600 ml4">20</text>
										</view>
									</view>
								</view>
								<view class="text-center mt8 ft12 cl-notice">满50元可用</view>
							</view>
							<view class="mt12 flex center">
								<view class="btn-small" style="background: #F9D681;color:#000000;width: 190rpx;">会员领取</view>
							</view>
							<view class="y-l"></view>
							<view class="y-r"></view>
						</view>
						<view class="item ml5">
							<view class="top">
								<view class="text-center ft14 ftw600 cl-main">
									洗剪吹优惠券
								</view>
								<view class="flex center mt12">
									<view class="vip-coupon-num">
										<image :src="statics.conponNumBg"></image>
										<view class="num cl-orange">
											<text class="ft24 ftw600">¥</text>
											<text class="ft24 ftw600 ml4">20</text>
										</view>
									</view>
								</view>
								<view class="text-center mt8 ft12 cl-notice">满50元可用</view>
							</view>
							<view class="mt12 flex center">
								<view class="btn-small dis" style="width: 190rpx;">暂不可领</view>
							</view>
							<view class="y-l"></view>
							<view class="y-r"></view>
						</view>
						
						<view class="item ml5">
							<view class="top">
								<view class="text-center ft14 ftw600 cl-main">
									洗剪吹优惠券
								</view>
								<view class="flex center mt12">
									<view class="vip-coupon-num">
										<image :src="statics.conponNumBg"></image>
										<view class="num cl-orange">
											<text class="ft24 ftw600">¥</text>
											<text class="ft24 ftw600 ml4">20</text>
										</view>
									</view>
								</view>
								<view class="text-center mt8 ft12 cl-notice">满50元可用</view>
							</view>
							<view class="mt12 flex center">
								<view class="btn-small dis" style="width: 190rpx;">已领取</view>
							</view>
							<view class="y-l"></view>
							<view class="y-r"></view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<com-empty></com-empty>
			
			<view  class="mt24">
				<view class=" flex alcenter center">
					<image class="coupon-title-img" :src="statics.couponTitleL"></image>
					<view class="ft16 ftw600 cl-main" style="margin-left: 30rpx; margin-right: 30rpx;">普通用户可领</view>
					<image class="coupon-title-img" :src="statics.couponTitleR"></image>
				</view>
				<view class=" mt16 coupon-box">
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
				</view>
				
				<view class="mt16 coupon-box">
					<view class="pd16_15 bg-w flex alcenter space" style="border-bottom: 2rpx dashed   #E4E6ED;">
						<view class="flex alcenter">
							<view class="cl-orange" style="width: 96rpx;">
								<text class="ft12">¥</text>
								<text class="ft24 ftw600 ml4">30</text>
							</view>
							<view class="ml15">
								<view class="ft14 ftw600 cl-main">普通洗剪吹优惠券</view>
								<view class="mt12 ft12 cl-info2">有效期：2019.11.16-2020.11.16</view>
							</view>
						</view>
						<view class="btn-mini dis">已领</view>
					</view>
					<view class="pd16_15 ft12 cl-notice">满50元可用，不可与其他优惠活动同时使用</view>
					<view class="coupon-yl"></view>
					<view class="coupon-yr"></view>
				</view>
			</view>
		</view>
		<com-footer model="coupon"></com-footer>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				vipLevel:1,
				num:3,
				getNum:3,
			}
		},
		computed:{
			getTitle(){
				if(this.vipLevel == 0) return '您当前是普通用户，无法领VIP优惠券';
				if(this.getNum == 0) return 'V'+this.vipLevel+'白银会员本月可领'+this.num+'张优惠券';
				if(this.getNum < this.num) return '=V'+this.vipLevel+'白银会员本月可领'+this.getNum+'/'+this.num+'张优惠券';
				return 'V'+this.vipLevel+'白银会员本月已领完,2020-11-15日再来';
			}
		},
		onReachBottom(){ //拉到底部了
			console.log(1111);
		}
	}
</script>

<style>
	.counpon-page-header{
		position: relative;
	}
	.counpon-page-header image{
		width: 100%;
		height: 480rpx;
	}
	.coupon-page-main{
		position: relative;
		margin-top: -240rpx;
	}
	.coupon-vip-box{
		width: 100%;
		height: 560rpx;
		background: #F87065;
		border-radius: 48rpx;
		overflow: hidden;
	}
	.coupon-vip-box .vip-header{
		width: 100%;
		height: 88rpx;
		position: relative;
	}
	.coupon-vip-box .vip-header image{
		width: 100%;
		height: 88rpx;
	}
	.coupon-vip-box .vip-header .main{
		width: 100%;
		height: 88rpx;
		position: absolute;
		left: 0;
		top: 0;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color:#7B4205;
		font-weight: 600;
	}
	.vip-coupon-scroll{
		white-space: nowrap;
		height: 340rpx;
	}
	.vip-coupon-scroll .item{
		height: 340rpx;
		display: inline-block;
		width: 270rpx;
		background: #FFFFFF;
		position: relative;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.vip-coupon-scroll .item .top{
		padding: 32rpx 40rpx 24rpx 40rpx;
		border-bottom: 2rpx dashed #FEC675;
	}
	.vip-coupon-scroll .item .y-l,.vip-coupon-scroll .item .y-r{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background: #F87065;
		position: absolute;
		z-index: 2;
		top: 220rpx;
	}
	.vip-coupon-scroll .item .y-l{
		left: -10rpx;
	}
	.vip-coupon-scroll .item .y-r{
		right: -10rpx;
	}
	.vip-coupon-num{
		width: 190rpx;
		height: 64rpx;
		position: relative;
	}
	.vip-coupon-num image{
		width: 100%;
		height: 64rpx;
	}
	.vip-coupon-num .num{
		width: 100%;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
	}
	.coupon-title-img{
		width: 120rpx;
		height: 12rpx;
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
	.coupon-box .coupon-yl{
		left: -10rpx;
	}
	.coupon-box .coupon-yr{
		right: -10rpx;
	}
</style>