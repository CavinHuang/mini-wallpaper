<template>
	<view class="pd16_15">
		<view v-if="exchangeType == 1">
			<view class="box pd16_15 flex alcenter">
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
					</view>
				</view>
			</view>
		</view>
		<view v-if="exchangeType == 2">
				<view class="box pd16_15 flex alcenter">
					<view style="width: 160rpx;" class="cl-orange text-center">
						<text class="ft12">¥</text>
						<text class="ft24 ftw600">20</text>
					</view>
					<view style="width: calc(100% - 160rpx);">
						<view class="ft14 ftw600 cl-main">洗剪吹优惠券</view>
						<view class="ft12 cl-notice mt8">满50元可用</view>
						<view class="flex alcenter  mt8">
							<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
							<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
						</view>
					</view>
				</view>
		</view>
		<view v-if="exchangeType == 3">
			<view class="box">
				<view class="delivery-type bd-bottom">
					<sub-tab :tabs="tabs" :selectIndex="deliveryType" @change="changeType"></sub-tab>
				</view>
				<view v-if="deliveryType == 1">
					<select-address v-model="address_id"></select-address>
				</view>
				<view v-if="deliveryType == 0">
					<select-mendian v-model="mendian_id"></select-mendian>
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
						</view>
					</view>
				</view>
			
		</view>
		
		<view v-if="isNeedPay" class="mt16">
			<view  class=" box pd16_15">
				<view class="flex alcenter space">
					<text class="ft14 cl-main">积分扣除</text>
					<text class="ft14 cl-info2">3000积分</text>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view  class="flex alcenter space">
					<text class="ft14 cl-main">还需支付</text>
					<view class="cl-orange">
						<text class="ft12">¥</text>
						<text class="ft20">10</text>
					</view>
				</view>
				
			</view>

			
			<view class="box mt16 pd16_15">
				<view class="ft16 ftw600 cl-main">支付方式</view>
				<view class="bd-line mt16"></view>
				<radio-group @change="changePayType">
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
		
		<view v-else class="mt16">
			<view  class=" box pd16_15">
				<view class="flex alcenter space">
					<text class="ft14 cl-main">我的积分</text>
					<text class="ft14 cl-info2">3000</text>
				</view>
				<view class="bd-line mt16 mb16"></view>
				<view  class="flex alcenter space">
					<text class="ft14 cl-main">扣除积分</text>
					<view class="flex alcenter cl-orange">
						<text class="ft14">-10</text>
					</view>
				</view>
				
			</view>
			<view class="form-footer-h">
				<view class="form-footer form-footer-h">
					<view class="form-footer-main pd10_15">
						<button class="btn-big" :style="getBtnStyle">确定兑换</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				exchangeType:3,// 1套餐 2优惠券 3实物
				tabs:['门店自提','快递到家'],
				deliveryType:0,
				payType:'weixin',
				isNeedPay:true,
				address_id:0,//接口下发默认地址，如果没有就是0
				mendian_id:1,//接口下发默认门店，如果没有就是0
			}
		},
		onLoad(){
			this.mendian_id = this.mendianSelectId; // 返回之前选择的默认门店ID
		},
		methods:{
			changePayType(e){
				this.payType = e.detail.value;
			},
			changeType(e){
				this.deliveryType = e;
			}
		}
	}
</script>

<style>
	.integral-tuan-l{
		width: 240rpx;
		height: 180rpx;
		background: #f2f2f2;
	}
	.delivery-type{
		height: 102rpx;
	}
	
</style>