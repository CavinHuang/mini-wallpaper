<template>
	<view>
		<sub-tabnav :tabs="tabs" @change="changeIndex" :selectIndex="selectIndex" :scrollTop="scrollTop"></sub-tabnav>
		<view class="mt24" style="margin:30upx 30upx 0 30upx;box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);">
			<home-banner :banners="banners"></home-banner>
		</view>
		<view class="pd16_15">
			<block v-for="(value,key) in datasa" :key="key">
			<view class="box pd16_15 flex alcenter mb16" style="position: relative;" @click="detail(value.id,value.lx)">
				<image mode="aspectFill" class="tuan-product-l" :src="value.img"></image>
				<view class="btn-mini" style="position: absolute; top: 40upx; left: 280upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx;" :style="getBtnStyle">{{value.lxname}}</view>
				<view class="tuan-product-r pl15">
					<view class="ft14 ftw600 cl-main text-over2">{{value.name}}</view>
					<view class="mt16">
						<text class="ft12 cl-orange">会员价</text>
						<text class="ft12 cl-orange">¥</text>
						<text class="ft16 cl-orange ftw600">{{value.vipprice}}</text>
						<text class="ml15 ft12 cl-notice text-line">¥{{value.price}}</text>
					</view>
					<view class="mt16 flex space alcenter">
						<view class="ft12 cl-notice">{{value.updatetime}}</view>
					</view>
				</view>
			</view>
			</block>
			<uni-pagination title="" @change="onPageChange" v-if="total>pageSize" show-icon="true" :pageSize="pageSize" :total="total" current="1"></uni-pagination>
		</view>
		
		<!-- <dialog-login v-if="showLogin" @loginYes="loginYes" @closed="showLogin = false"></dialog-login> -->
		<!-- <com-footer model="tuan"></com-footer> -->
		
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	export default{
		components: {
		        uniPagination
		    },
		data(){
			return {
				banners:[],
				vipLevel:0,
				isLogin:true,
				showLogin:false,
				datasa:[],
				dataconfig:[],
				total:0,
				pageSize:10,
				tabs:[
					{name:'全部'},
					{name:'视频'},
					{name:'音频'},
					{name:'小说'},
				],
				selectIndex:0,
				scrollTop:0,
				type:'',
				keytext:''
			}
		},
		onLoad(e){
			//console.log(111)
			if(e.selectIndex){
				this.selectIndex=e.selectIndex
			}
			this.getList(0)
			this.banners=uni.getStorageSync("config").banner
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop;
		},
		//监听搜索框文本变化
		onNavigationBarSearchInputChanged(e) {
			let text = e.text;
			if(text){
				this.keytext=text;	
			}
			console.log(text)
		},
		//监听点击搜索按钮事件
		onNavigationBarSearchInputConfirmed(e) {
			let text = e.text;
			if (!text) {
				uni.showModal({
					title: '',
					content:"请输入搜索内容",
					showCancel: false,
					confirmText: "确定",
					confirmColor:"#e19503",
					success: function (res) {
						
					}
				});
				this.getList(0)
				return;
			} else {
				this.keytext=text;
				this.type='';	
				this.getList(0)
			}
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
			
		},
		methods:{
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
			onPageChange(e) {
			    this.getList(e.current-1)
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100
				});
			},
			getList(offset) {
				let data = {};
				data.limit=this.pageSize
				data.offset=this.pageSize*offset
				if(this.selectIndex){
					data.lx=this.selectIndex
				}
				if(this.keytext){
					data.keytext=this.keytext
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
						this.total=data.data.total
						this.dataconfig=data.data.config
						this.datasa=data.data.rows
					},
					fail: (data, code) => {
					}
				});
			},
			changeIndex(index){
				this.selectIndex = index;
				if(this.tabs[index].name){
					this.type=this.tabs[index].name
					this.getList(0)
				}				
			},
			loginYes(){
				
			},
			mlinkTo(e){
				if(this.isLogin == true){
					let link = e.currentTarget.dataset.link;
				}else{
					this.showLogin = true;
				}
			}
		}
	}
</script>

<style>

	.user-not-vip{
		width: 100%;
		height: 80rpx;
		background: #FDF6EC;
		border-radius: 40rpx;
		border: 2rpx solid #EFC381;
		text-align: center;
		line-height: 76rpx;
		font-size: 24rpx;
		color:#000000;
		font-weight: bold;
	}
	

	.tuan-product-l{
		width: 320rpx;
		height: 240rpx;
		border-radius: 16rpx;
		background: #F2F2F2;
	}
	.tuan-product-r{
		width: calc(100% - 320rpx);
	}
</style>