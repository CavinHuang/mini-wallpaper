<template>
	<view>
		<view class="home-header pd5_15" :style="'background: linear-gradient(#fa7c4c,#ff3328);'">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
				<navigator url="/pages/client/mendian">
					<view class="home-mendian flex alcenter space plr15 cl-w9">
						<view  class="flex alcenter" style="width: calc(100% - 40rpx);">
							<text class="iconfont  iconicon_location02 ft14 mr10"></text>
							<text class="text-over ft14" style="width: calc(100% - 80rpx);">小刘便利店[北京路20号]</text>
						</view>
						<text class="iconfont iconicon_arrow_small ft12"></text>
					</view>
				</navigator>
			<view class="mt10">
				<home-banner :banners="banners"></home-banner>
			</view>
		</view>
		<view class="integral-mall-main plr15">	
			<view class="integal-mall-menutop">
			<view class="integal-mall-menu flex pt16 pb16">
				<view class="col2 text-center" @click="linkTo" data-link="/pages/client/tuan/ss?selectIndex=1">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallMenus[0]"></image>
					</view>
					<view class="ft14 mt6">新鲜蔬菜</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/ss?selectIndex=2">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallCat[0]"></image>
					</view>
					<view class="ft14 mt6">日用百货</view>
				</view>
				<!-- /pages/client/integral/role -->
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/ss?selectIndex=3">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallCat[1]"></image>
					</view>
					<view class="ft14 mt6">时令水果</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/ss?selectIndex=3">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallMenus[1]"></image>
					</view>
					<view class="ft14 mt6">家居好物</view>
				</view>
			</view>
			
			<view class="integal-mall-menu flex pt5 pb5">
				<view class="col2 text-center" @click="linkTo" data-link="/pages/client/tuan/ss?selectIndex=1">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallMenus[0]"></image>
					</view>
					<view class="ft14 mt6">新鲜蔬菜</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/ss?selectIndex=2">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallCat[0]"></image>
					</view>
					<view class="ft14 mt6">日用百货</view>
				</view>
				<!-- /pages/client/integral/role -->
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/ss?selectIndex=3">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallCat[1]"></image>
					</view>
					<view class="ft14 mt6">时令水果</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/ss?selectIndex=3">
					<view>
						<image style="width: 60rpx; height: 60rpx;" :src="statics.integralMallMenus[1]"></image>
					</view>
					<view class="ft14 mt6">家居好物</view>
				</view>
			</view>
			</view>
			<image style="width: 100%; height: 320upx; margin-top: 30upx;" src="http://v.demo.hongcd.com/uploads/20210301/3aacd8b2e77f139c408a9491244c8dfa.jpg"></image>
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
					
					<view class="integral-mall-couponyh">
						<view class="topyh">
							<view class="text-center ft14 ftw600 cl-mainyh">
								优惠券
							</view>
							<view class="flex center mt12">
								<view class="coupon-valueyh">
									<image :src="statics.couponNumBg"></image>
									<view class="numyh cl-orange">
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
						<view class="y-lyh"></view>
						<view class="y-ryh"></view>
					</view>
					<view class="integral-mall-couponyh">
						<view class="topyh">
							<view class="text-center ft14 ftw600 cl-mainyh">
								优惠券
							</view>
							<view class="flex center mt12">
								<view class="coupon-valueyh">
									<image :src="statics.couponNumBg"></image>
									<view class="numyh cl-orange">
										<text class="ft24 ftw600">¥</text>
										<text class="ft24 ftw600 ml4">50</text>
									</view>
								</view>
							</view>
							<view class="text-center mt8 ft12 cl-notice">满100元可用</view>
							<view class="flex alcenter center mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft16 cl-orange ftw600">3000 + ¥10</text>
							</view>
						</view>
						<view class="mt12 flex center">
							<view class="btn-small" :data-id="1" @click="exchange"  style="width: 250rpx;" :style="getBtnStyle">兑换</view>
						</view>
						<view class="y-lyh"></view>
						<view class="y-ryh"></view>
					</view>
					
				</view>
				
							
			</view>
			<view class="mt24" v-if="dataindex[1]">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.integralMallMenus[0]"></image>
						<text class="ft16 ftw600 cl-main ml15">推荐视频</text>
					</view>
					<navigator url="/pages/client/tuan/ss?selectIndex=1">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				
				<view class="mt16 flex space">
					<block v-for="(value,key) in dataindex[1]" :key="key" v-if="key<2">
					<view class="box pd16_15" style="width: 330rpx; position: relative;" @click="detail(value.id,value.lx)">
						<view class="btn-mini" style="position: absolute; top: 40upx; right: 40upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 999;" :style="getBtnStyle">{{value.lxname}}</view>
						<image class="integral-mall-goods" mode="aspectFill" :src="value.img"></image>
						<view class="mt8 ft14 ftw600 text-center text-over cl-main">{{value.name}}</view>
						<view class="text-center mt5 ft12 cl-notice">¥{{value.price}}</view>
						<view class="flex alcenter center mt5">
							<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
							<text class="ft14 cl-orange ftw600">会员价 ¥{{value.vipprice*1}}</text>
						</view>
						
					</view>
					</block>	
			
				</view>
				
			</view>	
			
			<view class="mt24" v-if="dataindex[2]">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.integralMallMenus[1]"></image>
						<text class="ft16 ftw600 cl-main ml15">精品音频</text>
					</view>
					<navigator url="/pages/client/tuan/ss?selectIndex=2">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				<block v-for="(value,key) in dataindex[2]" :key="key" v-if="key<3">
				<view class="box pd16_15 flex alcenter mt16" style="position: relative;" @click="detail(value.id,value.lx)">
					<view class="btn-mini" style="position: absolute; top: 40upx; left: 40upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 999;" :style="getBtnStyle">{{value.lxname}}</view>
					<image class="integral-tuan-l" mode="aspectFill" :src="value.img"></image>
					<view class="pl15" style="width: calc(100% - 240rpx);">
						<view class="ft14 cl-main ftw600 text-over">{{value.name}}</view>
						<view class="flex alcenter space mt12 cl-notice">
							<view class="flex alcenter">
								<text class="ft12 text-line">¥{{value.price}}</text>
							</view>
							<view class="flex alcenter">
								<text class="ft12">{{value.updatetime}}</text>
							</view>
						</view>
						<view class="mt12 flex alend space">
							<view class="flex alcenter">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft14 cl-orange ftw600">会员价 ¥{{value.vipprice}}</text>
							</view>
						</view>
					</view>
				</view>
				</block>						
			</view>
			
			<view class="mt24" v-if="dataindex[3]">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.integralMallCat[1]"></image>
						<text class="ft16 ftw600 cl-main ml15">热门小说</text>
					</view>
					<navigator url="/pages/client/tuan/ss?selectIndex=3">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				<view class="mt16 flex space ">
					<block v-for="(value,key) in dataindex[3]" :key="key" v-if="key<2">
					<view class="integral-mall-coupon" @click="detail(value.id,value.lx)">
						<view class="top">
							<view class="ft14 cl-main ftw600 text-center text-over">{{value.name}}</view>
							<view class="flex center mt12">
								<view class="coupon-value" style="position: relative;">
									<view class="btn-mini" style="position: absolute; top: 10upx; right: 10upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 999;" :style="getBtnStyle">{{value.lxname}}</view>
									<image class="integral-tuan-l" mode="aspectFill" :src="value.img"></image>
 									<!--<view class="num cl-orange">
										<text class="ft24 ftw600">¥</text>
										<text class="ft24 ftw600 ml4">20</text>
									</view> -->
								</view>
							</view>
							<view class="text-center mt8 ft12 cl-notice">¥{{value.price*1}}</view>
							<view class="flex alcenter center mt7">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<text class="ft14 cl-orange ftw600">会员价 ¥{{value.vipprice*1}}</text>
							</view>
						</view>
						<view class="y-l"></view>
						<view class="y-r"></view>
					</view>
					</block>				
				</view>		
			</view>
		</view>		
		<home-default :datasa="datasa"></home-default>
		<!-- <com-footer model="index"></com-footer> -->
	</view>
</template>
<script>
	export default{
		data(){
			return {
				navLock:false,
				datasa:[],
				dataconfig:[],
				banners:[],
				datainfo:[],
				dataindex:[],
				mbgColor:this.$mbgColor,
			}
		},
		computed:{
			
		},
		onPageScroll(e){

		},
		onShareAppMessage(e){
			
		},
		onShareTimeline(e){
			
		},
		onLoad(e){
			//this.getList();
		},
		onShow() {
			this.getList();
			this.getList(1);
			this.getList(2);
			this.getList(3);
			let this_=this
			
		},
		methods:{
			getList(lx) {
				let this_=this
				let data = {};
				var limit=15;
				if(lx){
					data.limit=4	
				}else{
					data.limit=limit
				}
				data.ishot=2
				if(lx){
					data.lx=lx
				}
				uni.request({
					url: this.configs.webUrl+'/api/video/lists',
					data: data,
					success: data => {
						//console.log(data.data)
						uni.setStorage({//缓存配置信息
							key: 'config',  
							data: data.data.config
						})
						this.banners=data.data.config.banner
						if(data.data.config.name){
							uni.setNavigationBarTitle({
							    title: data.data.config.name
							});
						}
						if (data.data.total>0) {
							this.dataconfig=data.data.config
							if(lx){
								this.dataindex[lx]=data.data.rows
							}else{
								this.datasa=data.data.rows
							}
						}
					},
					fail: (data, code) => {
					}
				});
			},
			saoma(){
				//#ifdef APP-PLUS  
				uni.scanCode({
				    success: function (res) {
						if(res.result.indexOf("uid") != -1){
							var obj = JSON.parse(res.result); 
							if(obj.uid){
								uni.navigateTo({
									url:'/pages/login/reg?uid='+obj.uid
								})
							}	
						}else{
							uni.showToast({ title: res.result,icon:"none" });	
						}	
				    }
				});
				//#endif
				
			},
			detail(id,lx){
				console.log(lx);
				if(lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/detail?id='+id
					})
				}else if(lx==2){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+id
					})
				}else if(lx==3){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+id
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/tuan/list?id='+id
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
		},
	}
</script>

<style>
	.home-header{
		height: 280rpx;
		width: 100%;
		position: relative;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
	}
	/* #ifdef APP-PLUS  */
	.home-header{
		height: 380rpx;
		width: 100%;
		position: relative;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
	}
	/* #endif */
	.home-main{
		width: 100%;
		position: relative;
		margin-top: -156rpx;
		padding: 0 30rpx;
	}
	.home-mendian{
		width: 100%;
		height: 70rpx;
		background:rgba(255,255,255,0.1);
		border-radius: 16rpx;
	}
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
		margin-top: 120rpx;
	}	
	.integal-mall-menutop{
		width: 100%;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.integal-mall-menu{
		width: 100%;
		height: 160rpx;
	/* 	background: #FFFFFF;
		border-radius: 16rpx; */
	}
	.integral-tuan-l{
		width: 240rpx;
		height: 180rpx;
		background: #f2f2f2;
		border-radius: 16rpx;
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
		width: 100%;
		height: 180rpx;
		position: relative;
	}
	.integral-mall-coupon  .coupon-value image{
		width: 100%;
		height: 180rpx;
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
	
	.integral-mall-couponyh{
		height: 408rpx;
		width: 330rpx;
		background: #FFFFFF;
		position: relative;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.integral-mall-couponyh  .topyh{
		padding: 32rpx 40rpx 24rpx 40rpx;
		border-bottom: 2rpx dashed #FEC675;
	}
	.integral-mall-couponyh  .y-lyh,.integral-mall-couponyh  .y-ryh{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background: #F5F6FA;
		position: absolute;
		z-index: 2;
		top: 284rpx;
	}
	.integral-mall-couponyh  .y-lyh{
		left: -10rpx;
	}
	.integral-mall-couponyh  .y-ryh{
		right: -10rpx;
	}
	
	.integral-mall-couponyh   .coupon-valueyh{
		width: 100%;
		height: 64rpx;
		position: relative;
	}
	.integral-mall-couponyh  .coupon-valueyh image{
		width: 100%;
		height: 64rpx;
	}
	.integral-mall-couponyh  .coupon-valueyh .numyh{
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
		border-radius: 16upx;
	}
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}
	.bd-left {
	    border-left: 1px solid rgba(230, 230, 230, 0.3);
	}
</style>