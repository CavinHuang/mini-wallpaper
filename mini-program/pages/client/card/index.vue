<template>
	<view>
		<view class="card-header">
			<image :src="statics.cardHeader"></image>
		</view>
		
		<view class="pd16_15">
			<navigator url="/pages/client/card/detail">
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
					<button class="btn-small" :style="getBtnStyle">立即购买</button>
				</view>
			</view>
			</navigator>
			<view class="box over-hide mt16">
				<view class="card-box-header">
					<image class="bg" :src="statics.cardBg[1]"></image>
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
					<button class="btn-small" :style="getBtnStyle">立即购买</button>
				</view>
			</view>
			
		</view>
		
		<com-footer model="card"></com-footer>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.card-header image{
		width: 100%;
		height: 200rpx;
	}
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