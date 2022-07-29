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
						<text class="cl-w ft12">有效期至：2020-12-31</text>
					</view>
				</view>
			</view>
			<navigator url="/pages/client/card/mine/log">
			<view class="pd16_15 flex alcenter space">
				<view class="flex alcenter" >
					<text class="iconfont iconicon_record ft20" :style="{color:tempColor}"></text>
					<text class="ft16 ftw600 cl-main ml10">消费记录</text>
				</view>
				<text class="iconfont iconicon_arrow_small cl-notice ft14"></text>
			</view>
			</navigator>
		</view>
		
		<view class="box pd24_15 mt16">
			<view class="text-center ft18 ftw600 cl-main">核销码</view>
			<view class="mt16 flex center" :class="detail.status != 1 ? 'op3' : ''">
				<image :src="qrcodeImg" style="width: 400rpx; height: 400rpx;"></image>
			</view>
			<view v-if="detail.status == 1" class="text-center mt16 ft14 cl-notice">请出示二维码给商家扫码核销</view>
			<view v-if="detail.status == 2" class="text-center mt16 ft14 cl-notice">您正在赠送朋友中，不可使用</view>
			<view v-if="detail.status == 3" class="text-center mt16 ft14 cl-notice">您已经赠送给朋友了，不可使用</view>
			<view v-if="detail.status == 4" class="text-center mt16 ft14 cl-notice">您的次卡已经过期，不可使用</view>
			<view v-if="detail.status == 8" class="text-center mt16 ft14 cl-notice">次卡已经核销完了</view>
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
						<text class="ft14 cl-main ftw600 ml5">4次</text>
						
						<text class="ft12 cl-notice ml30">剩余次数</text>
						<text class="ft14 cl-orange ftw600 ml5">4次</text>
						
					</view>
				</view>
			</view>
			<view class="mt16">
				<view class="ft14 cl-main ftw600">单人潮流洗吹造型</view>
				<view class="mt12 flex alcenter space">
					<view class="ft12 cl-notice">门市价：<text class="ft12 text-line">¥88</text></view>
					<view>
						<text class="ft12 cl-notice">总次数</text>
						<text class="ft14 cl-main ftw600 ml5">4次</text>
						<text class="ft12 cl-notice ml30">剩余次数</text>
						<text class="ft14 cl-orange ftw600 ml5">4次</text>
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
		
		<view v-if="detail.status == 1 && detail.type == 1" class="form-footer-h">
			<view class="form-footer-h form-footer">
				<view class="form-footer-main pd10_15">
					<button @click="sendAct" class="btn-big plan" :style="getBtnPlanStyle">赠送朋友</button>
				</view>
			</view>
		</view>
		<dialog-cardsend v-if="showSend" @closed="showSend = false"></dialog-cardsend>
	</view>
</template>

<script>
	import  QR   from '../../../../static/js/wxqrcode.js';
	export default{
		data(){
			return {
				//is_send 0 自己购买 1 朋友赠送  //status 1正常中   8用完  4过期   2赠送中  3赠送成功 type1可送好友 type2 不可以送
				detail:{
					is_send:0,
					status:1,
					type:1,
				},
				qrcodeImg:'',
				showSend:false,
			}
		},
		onLoad(){
			let img = QR.createQrCodeImg('youge', {
			     size: 300//二维码大小  
			})
			this.qrcodeImg = img;
		},
		methods:{
			sendAct(){
				this.showSend = true;
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