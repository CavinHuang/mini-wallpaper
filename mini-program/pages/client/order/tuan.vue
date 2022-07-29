<template>
	<view>
		<view v-if="detail.status == -1" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status07 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已取消</text>
			</view>
		</view>
		
		<view v-if="detail.status == 0" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status01 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待付款</text>
			</view>
			<view class="flex alcenter">
				<text class="ft14 cl-main mr10"></text>
				<countdown-time :t="900"></countdown-time>
			</view>
		</view>
		<view v-if="detail.status  == 1" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status02 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待使用</text>
			</view>
		</view>
		<view v-if="detail.status  == 2" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status03 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待评价</text>
			</view>
		</view>
		<view v-if="detail.status  == 4" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status07 ft24 cl-notice"></text>
				<text class="ml10 ft16 ftw600">已过期</text>
			</view>
		</view>
		<view v-if="detail.status  == 8" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status06 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已完成</text>
			</view>
		</view>
		
	<view class="pd16_15">
		
		<view class="box pd16_15 ">
			<view class="flex">
				<image class="tuan-buy-l"></image>
				<view class="tuan-buy-r pl15">
					<view class="ft14 ftw600 cl-main">单人精致洗剪吹1次，国庆3折…</view>
					<view class="mt8 ft12 cl-notice">
						下单时间：2020-04-05 12:00
					</view>
					<view class="mt12 flex alcenter space">
						
						<text class="ft16 cl-orange ftw600">¥68</text>
						
						<text class="ft12 cl-notice">x1</text>
					</view>
				</view>
			</view>
			<view class="mt16 flex space alcenter">
				<text class="ft12 cl-notice">套餐总额</text>
				<text class="ft12 cl-main">¥58</text>
			</view>
			<view class="mt16 flex space alcenter">
				<text class="ft12 cl-notice">优惠券</text>
				<text class="ft12 cl-main">-¥0</text>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex end alcenter">
				<text class="ft14 cl-info">实付款：</text>
				<text class="ft14 cl-orange">¥53</text>
			</view>
		</view>
		
		<view v-if="detail.status > 0" class="box mt16 pd16_15">
			<view class="flex alcenter space">
				<view class="flex alcenter">
					<text class="ft16 ftw600 cl-main">核销码</text>
					<text class="ml10 ft12 cl-notice">已核销：2次</text>
				</view>
				<view class="flex alcenter">
					<text class="ml10 ft12 cl-notice">剩余核销：</text>
					<text class="ml10 ft12" :style="{color:tempColor}">0次</text>
				</view>
			</view>
			<view class="mt24 flex center" :class="{op3:detail.status > 1}">
				<image  :src="qrcodeImg" style="width: 400rpx;height: 400rpx;"></image>
			</view>
			<view v-if="detail.status == 1" class="text-center mt12 ft12 cl-notice">请出示二维码给商家扫码核销</view>
			<view v-if="detail.status == 4" class="text-center mt12 ft12 cl-notice">已过期，不可再使用</view>
			<view v-if="detail.status == 2 || detail.status == 8" class="text-center mt12 ft12 cl-notice">已核销完</view>
		</view>
		
		<view class="box mt16 pd16_15 flex alcenter space">
			<text class="ft16 ftw600" :style="{color:tempColor}">查看适用门店</text>
			<text class="iconfont iconicon_arrow_small ft14 cl-notice"></text>
		</view>
		
		<view class="box mt16 pd16_15">
			<view class="ft16 ftw600 cl-main">订单详情</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">订单编号：</text>
				<text class="ft14 cl-main">1034568888</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">手机号码：</text>
				<text class="ft14 cl-main">13515608638</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">下单时间：</text>
				<text class="ft14 cl-main">2020-10-23 15:10:10</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">订单状态：</text>
				<text class="ft14 cl-main">未支付</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">支付时间：</text>
				<text class="ft14 cl-main">2020-10-23 15:10:10</text>
			</view>	
		</view>
		
		<view class="box mt16 pd16_15">
			
			<view class="ft16 ftw600 cl-main">温馨提示</view>
			<view class="flex mt16">
				<view style="width: 140rpx;" class="ft14 cl-info2 text-right">有效期：</view>
				<view style="width: calc(100% - 140rpx);" class="ft14 cl-main lh20">2020.6.1 至 2020.7.12 23:59（周末、法定节假日通用）</view>
			</view>
			
			<view class="flex mt16">
				<view style="width: 140rpx;" class="ft14 cl-info2 text-right">使用时间：</view>
				<view style="width: calc(100% - 140rpx);" class="ft14 cl-main lh20">11:30-14:30，17:30-20:30</view>
			</view>
			<view class="flex mt16">
				<view style="width: 140rpx;" class="ft14 cl-info2 text-right">使用规则：</view>
				<view style="width: calc(100% - 140rpx);" class="ft14 cl-main lh20">
					抢购用户不可同时享受其他优惠酒水饮料等问题，请致电商家咨询，以商家反馈为准
					如部分菜品因时令或其他不可抗因素导致无法提供，商家会用等价菜品替换，具体事宜请与商家协商
					可免费使用包间
					无需预约，消费高峰期可能需要等位
					商家提供免费WiFi
					停车位收费标准：停车费自理
					发票问题请询问商家
					堂食外带均可，可以打包，打包费详情请咨询商家
				</view>
			</view>
		</view>
		
	</view>
	<dialog-payment v-if="showPayment" @closed="showPayment = false;"></dialog-payment>
	
	<view v-if="detail.status == 0" class="form-footer-h">
		<view class="form-footer form-footer-h">
			<view class="form-footer-main pd10_15 flex alcenter space">
				<button class="btn-big plan" style="width: 330rpx;">取消订单</button>
				<button class="btn-big" @click="showPayment = true" :style="getBtnStyle" style="width: 330rpx;">立即支付</button>
			</view>
		</view>
	</view>
	<view v-if="detail.status == 2 " class="form-footer-h">
		<view class="form-footer form-footer-h">
			<view class="form-footer-main pd10_15 ">
				<navigator url="/pages/client/order/comment">
					<button class="btn-big plan" :style="getBtnPlanStyle">评星立得10个积分</button>
				</navigator>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import  QR   from '../../../static/js/wxqrcode.js';
	export default{
		data(){
			return {
				showPayment:false,
				detail:{
					status:2,//status  0,待付款  1待使用   -1订单取消 2待评价  4已过期  8已完成
					
				},
				qrcodeImg:'',
			}
		},
		onLoad(){
			let img = QR.createQrCodeImg('youge', {
			     size: 300//二维码大小  
			})
			this.qrcodeImg = img;
		},
		methods:{
			
		}
	}
</script>

<style>
	.tuan-buy-l{
		width: 200rpx;
		height: 150rpx;
		background: #F2F2F2;
	}
	.tuan-buy-r{
		width: calc(100% - 200rpx);
	}
</style>