<template>
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
		<view class="box mt16 pd16_15 flex alcenter space">
			<text class="ft16 ftw600" :style="{color:tempColor}">查看适用门店</text>
			<text class="iconfont iconicon_arrow_small ft14 cl-notice"></text>
		</view>
		<view class="box mt16 pd16_15">
			<view class="ft16 ftw600 cl-main">使用说明</view>
			<view class="bd-line mt16"></view>
			<view class="mt16 ft14 cl-info2">使用时间：</view>
			<view class="mt12 ft14 cl-main">周末、法定假日通用</view>
			<view class="mt16 ft14 cl-info2">使用规则：</view>
			<view class="mt12">
				<text class="ft14 cl-main lh20">
					开卡后一年内有效，支付后不可退款
					可线下门店出示VIP码使用
					次卡可赠送好友
					使用前可联系顾问预约时间
				</text>
			</view>
		</view>
		
		<view class="form-footer-h">
			<view class="form-footer-h form-footer">
				<view class="form-footer-main pd10_15 flex alcenter space">
						<view class="flex alcenter space" style="width: calc(100% - 400rpx);">
							<navigator open-type="reLaunch" url="/pages/client/index">
								<view class="form-footer-item text-center">
									<view class="iconfont iconicon_bottom_home ft22"></view>
									<view class="ft12 mt8">首页</view>
								</view>
							</navigator>
							
							<view @click="contactAct" class="form-footer-item text-center ">
								<view class="iconfont iconicon_bottom_call ft22"></view>
								<view class="ft12 mt8">联系</view>
							</view>
						
							<button open-type="share" class="form-footer-item text-center ">
								<view class="iconfont iconicon_bottom_share ft22"></view>
								<view class="ft12 mt8">分享</view>
							</button>
							
						</view>
						<button  @click="buyAct" class="btn-big" style="width: 288rpx;" :style="getBtnStyle">¥100购买</button>
				</view>
			</view>
		</view>
		
		<dialog-login v-if="showLogin" @loginYes="loginYes" @closed="showLogin = false"></dialog-login>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isLogin:true,
				showLogin:false,
				nextStep:'buy',
			}
		},
		onLoad(){
			
		},
		methods:{
			contactAct(){
				if(this.isLogin == false){
					this.showLogin = true;
					this.nextStep = 'contact';
				}else{
					uni.navigateTo({
						url:'/pages/client/vipcard/adviser'
					})
				}
			},
			buyAct(){
				if(this.isLogin == false){
					this.showLogin = true;
					this.nextStep = 'buy';
				}else{
					uni.navigateTo({
						url:'/pages/client/card/buy'
					})
				}
			},
			loginYes(){
				if(this.nextStep == 'buy'){
					uni.navigateTo({
						url:'/pages/client/card/buy'
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/vipcard/adviser'
					})
				}
			}
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