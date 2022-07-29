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
			<view class="ft16 ftw600 cl-main">支付方式</view>
			<view class="bd-line mt16"></view>
			<radio-group @change="changeType">
			<view class="pt16 pb16 flex alcenter space">
				<view class="flex alcenter">
					<text class="iconfont iconicon_pay_balance ft32" style="color: #FFBD1E;"></text>
					<text class="ml15 ft14 ftw500 cl-main">余额支付</text>
					<text class="ml10 ft12 cl-notice">余额为0，不可用</text>
				</view>
				<view>
					<radio value="money" :checked="payType ==  'money'" :disabled="false" :color="tempColor"  />
				</view>
			</view>
			<view class="bd-line"></view>
			<view class="pt16  flex alcenter space">
				<view class="flex alcenter">
					<text class="iconfont iconicon_pay_balance ft32 cl-green"></text>
					<text class="ml15 ft14 ftw500 cl-main">微信支付</text>
				</view>
				<view>
					<radio value="weixin" :checked="payType ==  'weixin'" :color="tempColor"  />
				</view>
			</view>
			</radio-group>
		</view>	
		<view class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15">
					<button class="btn-big" :style="getBtnStyle">支付 ¥100.00</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				payType:'weixin'
			}
		},
		onLoad(){
			
		},
		methods:{
			changeType(e){
				this.payType = e.detail.value;
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