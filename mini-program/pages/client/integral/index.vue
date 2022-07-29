<template>
	<view class="pb30">
		<view class="integral-mall-header">
			<image class="bg" :src="statics.integralMallHeader"></image>
			<view class="main pd24_20">
				<view class="flex alcenter center">
					<text class="ft14 cl-w">当前积分</text>
					<text class="ml10 ft24 ftw600 cl-w">--</text>
				</view>
				<view class="mt16">
					<swiper :indicator-dots="false" class="swiper-integral" :autoplay="true" :vertical="true" :interval="2000" :duration="400">
						<swiper-item>
							<view class="flex alcenter">
								<text class="iconfont iconicon_notice ft14 cl-w"></text>
								<text class="ml10 ft14 cl-w" style="width: calc(100% - 50rpx); overflow: hidden;">恭喜franckever成功兑换了洗剪吹加护理一次套餐</text>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="flex alcenter">
								<text class="iconfont iconicon_notice ft14 cl-w"></text>
								<text class="ml10 ft14 cl-w" style="width: calc(100% - 50rpx); overflow: hidden;">恭喜111111成功兑换了洗剪吹加护理一次套餐</text>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="flex alcenter">
								<text class="iconfont iconicon_notice ft14 cl-w"></text>
								<text class="ml10 ft14 cl-w" style="width: calc(100% - 50rpx); overflow: hidden;">恭喜22222成功兑换了洗剪吹加护理一次套餐</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	
		<view class="integral-mall-main plr15">
			<view class="integal-mall-menu flex pt16 pb16">
				<view class="col2 text-center" @click="linkTo" data-link="/pages/client/vipcard/integrallog">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallMenus[0]"></image>
					</view>
					<view class="ft14 ftw600 mt6">积分明细</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/integral/role">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallMenus[1]"></image>
					</view>
					<view class="ft14 ftw600 mt6">赚积分</view>
				</view>
			</view>
			
			<view class="mt24">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.integralMallCat[0]"></image>
						<text class="ft16 ftw600 cl-main ml15">特惠套餐</text>
					</view>
					<navigator url="/pages/client/integral/list?id=0">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				
				<view class="box pd16_15 flex alcenter mt16">
					<navigator url="/pages/client/integral/tuan">
						<image class="integral-tuan-l"></image>
					</navigator>
					<view class="pl15" style="width: calc(100% - 240rpx);">
						<navigator url="/pages/client/integral/tuan">
						<view class="ft14 cl-main ftw600 text-over">洗剪吹加护理一次套餐 会…</view>
						<view class="flex alcenter space mt12 cl-notice">
							<view class="flex alcenter">
								<text class="ft12">门市价：</text>
								<text class="ft12 text-line">¥88</text>
							</view>
							<view class="flex alcenter">
								<text class="ft12">已兑</text>
								<text class="ft12">868</text>
							</view>
						</view>
						</navigator>
						<view class="mt12 flex alend space">
							<view class="flex alcenter">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
							</view>
							
							<button  @click="exchange" :data-id="1" class="btn-mini" :style="getBtnStyle">兑换</button>
							
						</view>
					</view>
				</view>
				
				<view class="box pd16_15 flex alcenter mt16">
					<image class="integral-tuan-l"></image>
					<view class="pl15" style="width: calc(100% - 240rpx);">
						<view class="ft14 cl-main ftw600 text-over">洗剪吹加护理一次套餐 会…</view>
						<view class="flex alcenter space mt12 cl-notice">
							<view class="flex alcenter">
								<text class="ft12">门市价：</text>
								<text class="ft12 text-line">¥88</text>
							</view>
							<view class="flex alcenter">
								<text class="ft12">已兑</text>
								<text class="ft12">868</text>
							</view>
						</view>
						<view class="mt12 flex alend space">
							<view class="flex alcenter">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
							</view>
							<button class="btn-mini" :style="getBtnStyle">兑换</button>
						</view>
					</view>
				</view>
							
			</view>
			
			<view class="mt24">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.integralMallCat[1]"></image>
						<text class="ft16 ftw600 cl-main ml15">优惠券</text>
					</view>
					<navigator url="/pages/client/integral/list?id=1">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				<view class="mt16 flex space ">
					
					<view class="integral-mall-coupon">
						<view class="top">
							<view class="text-center ft14 ftw600 cl-main">
								洗剪吹优惠券
							</view>
							<view class="flex center mt12">
								<view class="coupon-value">
									<image :src="statics.couponNumBg"></image>
									<view class="num cl-orange">
										<text class="ft24 ftw600">¥</text>
										<text class="ft24 ftw600 ml4">20</text>
									</view>
								</view>
							</view>
							<view class="text-center mt8 ft12 cl-notice">满50元可用</view>
							<view class="flex alcenter center mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
							</view>
						</view>
						<view class="mt12 flex center">
							<view class="btn-small" :data-id="1" @click="exchange" style="width:250rpx;" :style="getBtnStyle">兑换</view>
						</view>
						<view class="y-l"></view>
						<view class="y-r"></view>
					</view>
					<view class="integral-mall-coupon">
						<view class="top">
							<view class="text-center ft14 ftw600 cl-main">
								洗剪吹优惠券
							</view>
							<view class="flex center mt12">
								<view class="coupon-value">
									<image :src="statics.couponNumBg"></image>
									<view class="num cl-orange">
										<text class="ft24 ftw600">¥</text>
										<text class="ft24 ftw600 ml4">20</text>
									</view>
								</view>
							</view>
							<view class="text-center mt8 ft12 cl-notice">满50元可用</view>
							<view class="flex alcenter center mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
							</view>
						</view>
						<view class="mt12 flex center">
							<view class="btn-small" :data-id="1" @click="exchange"  style="width: 250rpx;" :style="getBtnStyle">兑换</view>
						</view>
						<view class="y-l"></view>
						<view class="y-r"></view>
					</view>
					
				</view>
				
							
			</view>
			
			<view class="mt24">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.integralMallCat[2]"></image>
						<text class="ft16 ftw600 cl-main ml15">兑换商品</text>
					</view>
					<navigator url="/pages/client/integral/list?id=2">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				
				<view class="mt16 flex space">
					
					<view class="box pd16_15" style="width: 330rpx;">
						<navigator url="/pages/client/integral/goods">
						<image class="integral-mall-goods"></image>
						<view class="mt8 ft14 ftw600 text-over cl-main">专业去屑洗发水-么尚</view>
						<view class="flex alcenter center mt12">
							<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
							<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
						</view>
						</navigator>
						<view class="mt12 flex center">
							<view class="btn-small" @click="exchange" :data-id="1" style="width: 250rpx;" :style="getBtnStyle">兑换</view>
						</view>
					</view>
					<view class="box pd16_15" style="width: 330rpx;">
						<image class="integral-mall-goods"></image>
						<view class="mt8 ft14 ftw600 text-over cl-main">专业去屑洗发水-么尚</view>
						<view class="flex alcenter center mt12">
							<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
							<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
						</view>
						<view class="mt12 flex center">
							<view class="btn-small" style="width: 250rpx;" :style="getBtnStyle">兑换</view>
						</view>
					</view>
				</view>
				
			</view>	
		</view>
		<dialog-login v-if="showLogin" @closed="showLogin = false" @loginYes="loginYes"></dialog-login>
		<com-footer model="integral"></com-footer>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isLogin:true,
				showLogin:false,
			}
		},
		onLoad(){
			
		},
		methods:{
			loginYes(){
				
			},
			exchange(e){
				if(this.isLogin == false){
					this.showLogin = true;
				}else{
					let id = e.currentTarget.dataset.id;
					uni.navigateTo({
						url:'/pages/client/integral/exchange?id='+id
					})
				}
			},
			linkTo(e){
				if(this.isLogin == false){
					this.showLogin = true;
				}else{
					let link = e.currentTarget.dataset.link;
					uni.navigateTo({
						url:link
					})
				}
			},
		}
	}
</script>

<style>
	.integral-mall-header{
		position: relative;
		height: 320rpx;
	}
	.integral-mall-header .bg{
		width: 100%;
		height: 320rpx;
	}
	.integral-mall-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 320rpx;
	}
	.swiper-integral{
		height: 32rpx;
		width: 100%;
	}
	.integral-mall-main{
		position: relative;
		margin-top: -104rpx;
	}
	.integal-mall-menu{
		width: 100%;
		height: 176rpx;
		background: #FFFFFF;
		border-radius: 48rpx;
	}
	.integral-tuan-l{
		width: 240rpx;
		height: 180rpx;
		background: #f2f2f2;
	}
	
	
	.integral-mall-coupon{
		height: 408rpx;
		width: 330rpx;
		background: #FFFFFF;
		position: relative;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.integral-mall-coupon  .top{
		padding: 32rpx 40rpx 24rpx 40rpx;
		border-bottom: 2rpx dashed #FEC675;
	}
	.integral-mall-coupon  .y-l,.integral-mall-coupon  .y-r{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background: #F5F6FA;
		position: absolute;
		z-index: 2;
		top: 284rpx;
	}
	.integral-mall-coupon  .y-l{
		left: -10rpx;
	}
	.integral-mall-coupon  .y-r{
		right: -10rpx;
	}
	.integral-mall-coupon   .coupon-value{
		width: 190rpx;
		height: 64rpx;
		position: relative;
	}
	.integral-mall-coupon  .coupon-value image{
		width: 100%;
		height: 64rpx;
	}
	.integral-mall-coupon  .coupon-value .num{
		width: 100%;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	
	.integral-mall-goods{
		width: 100%;
		height: 200rpx;
		background: #F2F2F2;
	}
</style>