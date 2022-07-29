<template>
	<view>
		<view class="integral-list-h">
			<view class="integral-list-header integral-list-h">
				<sub-tab :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tab>
			</view>
		</view>
		
		<view  v-show="selectIndex == 0" class="pd16_15">
			
			<view class="box pd16_15 flex alcenter">
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
						<button  @click="exchange" :data-id="1" class="btn-mini" :style="getBtnStyle">兑换</button>
					</view>
				</view>
			</view>
		</view>
		<view  v-show="selectIndex == 1" class="pd16_15">
			<view class="flex space ">
				
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
						<view class="btn-small" @click="exchange" :data-id="1" style="width:250rpx;" :style="getBtnStyle">兑换</view>
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
						<view class="btn-small"  @click="exchange" :data-id="1"  style="width: 250rpx;" :style="getBtnStyle">兑换</view>
					</view>
					<view class="y-l"></view>
					<view class="y-r"></view>
				</view>
				
			</view>
		</view>
		<view  v-show="selectIndex == 2" class="pd16_15">
			
			<view class="flex space">
				
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
			</view>
		</view>
		
		<dialog-login v-if="showLogin" @closed="showLogin = false" @loginYes="loginYes"></dialog-login>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isLogin:false,
				showLogin:false,
				selectIndex:0,
				tabs:['视频','音频','小说文章'],
			}
		},
		onLoad(e){
			if(e.id){
				let id = parseInt(e.id);
				this.selectIndex = id;
			}
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
			changeIndex(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.integral-list-h{
		height: 100rpx;
	}
	.integral-list-header{
		position: fixed;
		z-index: 10;
		background: #FFFFFF;
		width: 100%;
		left: 0;
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