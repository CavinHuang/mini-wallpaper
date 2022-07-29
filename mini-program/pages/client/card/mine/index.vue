<template>
	<view>
		<view class="card-mine-h">
			<view class="card-mine-h card-mine-main">
				<sub-tab :tabs="tabs" :selectIndex="selectIndex" @change="changeIndex"></sub-tab>
			</view>
		</view>
		
		<view v-show="selectIndex == 0" class="pd16_15">
			<view  v-for="(item,index) in cards" :key="index" :class="index > 0 ? 'mt16' : ''">
				<navigator url="/pages/client/card/mine/detail">
					<view class="box card-box-mine pd16_15 " :class="item.status != 1 ? 'over' : ''"> <!--消费完或过期都加透明度-->
						<view v-if="item.is_send == 1" class="ft12 cl-notice mb16">来自手机尾号为8638用户的赠送</view>
						<view class="flex alcenter">
							<image class="card-mine-l" :src="statics.cardMineFace" />
							<view class="card-mine-r pl15">
								<view class="ft16 ftw600 cl-main text-over">VIP洗剪吹次卡</view>
								<view class="mt8 flex alcenter">
									<view class="tag-card">次卡</view>
									<text class="ft12 cl-notice ml4">全门店通用</text>
								</view>
								<view v-if="item.type == 1" class="mt15 flex alcenter" :style="{color:tempColor}">
									<text class="iconfont iconicon_yes"></text> 
									<text class="ft12 ml5">可送好友</text>
								</view>
								<view v-else class="mt15 flex alcenter" :style="{color:'#C5CADB'}">
									<text class="iconfont iconicon_no"></text> 
									<text class="ft12 ml5">不可赠送</text>
								</view>
							</view>
						</view>
						<view class="bd-line mt16"></view>
						<view class="flex alcenter space mt16">
							<view class="ft14 cl-notice">有效期至：<text class="ft14 cl-info2">2020.12.31</text></view>
							<button v-if="item.status == 1 && item.type == 1" @click="sendAct" class="btn-small plan" :style="getBtnPlanStyle">赠送好友</button>
						</view>
						
						<image v-if="item.status == 4" class="status-img" :src="statics.statusImg[0]" /> <!-- 过期 -->
						<image v-if="item.status == 8" class="status-img" :src="statics.statusImg[2]" /> <!--使用完-->
						<image v-if="item.status == 2" class="status-img" :src="statics.statusImg[3]" /><!-- 赠送中-->
						<image v-if="item.status == 3" class="status-img" :src="statics.statusImg[4]" /> <!-- 赠送成功-->
					</view>
				</navigator>
			</view>
		</view>
		
		<view v-show="selectIndex == 1" class="pd16_15">
				<!--没有详情只能接受不接受-->
				<view class="box card-box-mine pd16_15">
					<view class="ft12 cl-notice mb16">来自手机尾号为8638用户的赠送</view>
					<view class="flex alcenter">
						<image class="card-mine-l" :src="statics.cardMineFace" />
						<view class="card-mine-r pl15">
							<view class="ft16 ftw600 cl-main text-over">VIP洗剪吹次卡</view>
							<view class="mt8 flex alcenter">
								<view class="tag-card">次卡</view>
								<text class="ft12 cl-notice ml4">全门店通用</text>
							</view>
						<!-- 	<view class="mt15 flex alcenter" :style="{color:tempColor}">
								<text class="iconfont iconicon_yes"></text> 
								<text class="ft12 ml5">可送好友</text>
							</view> 如果定义送一次后不能再送这里就是不能再送了 -->
							<view class="mt15 flex alcenter" :style="{color:'#C5CADB'}">
								<text class="iconfont iconicon_no"></text> 
								<text class="ft12 ml5">不可赠送</text>
							</view>
						</view>
					</view>
					<view class="bd-line mt16"></view>
					<view class="flex alcenter space mt16">
						<view class="ft14 cl-notice">有效期至：<text class="ft14 cl-info2">2020.12.31</text></view>
						<view class="flex alcenter">
							<button class="btn-mini plan">拒绝</button>
							<button class="btn-mini"  style="margin-left: 20rpx;" :style="getBtnStyle">接受</button>
						</view>
					</view>
				</view>
			
		</view>
		
		<dialog-cardsend  v-if="showCardSend" @closed="showCardSend = false"></dialog-cardsend>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				tabs:['持有次卡','待处理'],
				selectIndex:0,
				showCardSend:false,
				cards:[ //is_send 0 自己购买 1 朋友赠送  //status 1正常中   8用完  4过期   2赠送中  3赠送成功 type1可送好友 type2 不可以送
					{type:1,is_send:0,status:1},
					{type:2,is_send:1,status:1}, 
					{type:1,is_send:0,status:2},
					{type:1,is_send:0,status:3},
					{type:1,is_send:0,status:4},
					{type:1,is_send:0,status:8},
				],
			}
		},
		onLoad(){
			
		},
		methods:{
			sendAct(){
				this.showCardSend = true;
			},
			changeIndex(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.card-mine-h{
		height: 100rpx;
	}
	.card-mine-main{
		position: fixed;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		background: #FFFFFF;
	}
	.card-box-mine{
		position: relative;
	}
	.card-box-mine.over{
		opacity: 0.6;
		filter: grayscale(100%);
	}
	.card-mine-l{
		width: 200rpx;
		height: 150rpx;
		border-radius: 8rpx;
	}
	.card-mine-r{
		width: calc(100% - 200rpx);
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
	.status-img{
		width: 112rpx;
		height: 112rpx;
		position: absolute;
		right: 0;
		top: 0;
	}
</style>