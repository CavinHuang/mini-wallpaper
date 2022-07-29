<template>
	<view>
		<view class="tuan-detail-header">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff" class="tuan-detail-swiper" :autoplay="true"  :interval="3000" :duration="400">
				 <swiper-item>
					 <image></image>
				 </swiper-item>
			</swiper>
		</view>
		<view class="tuan-detail-tit pd20_15">
			<view class="ft18 cl-main ftw600">专业去屑洗发水-么尚</view>
			<view class="flex alcenter space mt12">
				<view class="flex alcenter">
					<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
					<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
					<text class="ml10 ft12 cl-notice">门市价：</text>
					<text class="ft12 cl-notice text-line">¥88</text>
				</view>
				<view class="cl-notice ft12">已兑868</view>
			</view>
		</view>
		
		<view class="tuan-detail-content mt16">
			<view class="tuan-detail-content-tab bd-bottom">
					<sub-tab :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tab>
			</view>
			<view v-if="selectIndex == 0" class="pd16_15">
				<view class="ft14 cl-main  lh20 mb16">星级服务，温馨舒适，我们拒绝暴利，保品质、不推销、不办卡，，为每一位顾客量身定制适合自己的发型，满足每位顾客不同的要求，给您专业的设计与建议，为您的美不停奋斗！</view>
				<view class="mb16">
					<image mode="widthFix" style="width: 100%; background: #F2F2F2; height: 500rpx;"></image>
				</view>
			</view>
			<view v-if="selectIndex == 1" class="pd16_15">
				<text class="ft14 cl-main  lh20">
					此商品需扣除积分和支付相应费用；
					支持到店领取和物流快递，兑换后不可退货。
				</text>
			</view>
		</view>
		<dialog-login v-if="showLogin" @closed="showLogin = false" @loginYes="loginYes"></dialog-login>
		
		<view class="form-footer-h">
			<view class="form-footer-h form-footer">
				<view class="form-footer-main pd10_15 flex alcenter space">
						
						<navigator open-type="reLaunch" url="/pages/client/index">
							<view class="form-footer-item text-center">
								<view class="iconfont iconicon_bottom_home ft22"></view>
								<view class="ft12 mt8">首页</view>
							</view>
						</navigator>
					
						<button  class="btn-mid" style="width: calc(100% - 120rpx);" :style="getBtnStyle">立即兑换</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isLogin:true,
				showLogin:false,
				selectIndex:0,
				tabs:['商品详情','兑换须知'],
			}
		},
		onLoad(){
			
		},
		
		onShareAppMessage(e){
			
		},
		onShareTimeline(e){
			
		},
		methods:{
			loginYes(){
				
			},
			changeIndex(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.tuan-detail-header{
		position: relative;
	}
	.tuan-detail-swiper{
		height: 500rpx;
	}
	.tuan-detail-swiper image{
		width: 100%;
		height: 500rpx;
		background: #F2F2F2;
	}
	.tuan-detail-tit{
		width: 100%;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		position: relative;
		margin-top: -32rpx;
	}
	.tuan-detail-content-tab{
		height: 102rpx;
	}
	.tuan-detail-content{
		min-height: calc(100vh - 600rpx);
		background: #FFFFFF;
	}
</style>