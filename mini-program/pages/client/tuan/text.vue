<template>
	<view class="Box" style="">
		<!-- 网页背景开始 -->
		<view class="pagbg anmt" :style="{backgroundColor:pageBg}"></view>
		<view class="zhongMenu" @click="dianjile()"></view>
		<view class="listbox" v-if="opdads">
			<text style="font-size: 16px; float: right; top: -10px; " @click="guanbi()">关闭</text>
			<view v-for="(i, k) in audiolist" :key="k" class="list">
				<view v-if="i.id==mid" style="font-size: 14px;color: #EC706B;" @click="op(i.id)">{{ i.title }}</view>
				<view v-else style="font-size: 14px;" @click="op(i.id)">{{ i.title }}</view>
			</view>
		</view>
		<!-- 网页背景结束 -->
		<!-- 带返回键的导航栏开始 -->

		<!-- 带返回键的导航栏结束 -->
		<!-- 菜单开始 -->
		<view class="bottomBox anmt" :style="{color:fontColor,backgroundColor:menuBg,bottom:show?'0':'-150px'}">
			<view style="overflow: hidden;">
				<view style="float: left;width: 50%;overflow: hidden;">
					<view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">字体</view>
					<view style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
						<slider style="width: 100%;" :value="size" min="20" max="100" @changing="changeFontSize" @change="changeFontSize" :activeColor="fontColor" :backgroundColor="pageBg" :block-color="fontColor" block-size="20" />
					</view>
				</view>
				<view style="float: left;width: 50%;overflow: hidden;">
					<view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">间距</view>
					<view style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
						<slider style="width: 100%;" :value="lineHeight" min="50" max="150" @changing="changeLineHeight" @change="changeLineHeight" :activeColor="fontColor" :backgroundColor="pageBg" :block-color="fontColor" block-size="20" />
					</view>
				</view>
			</view>
			<view style="overflow: hidden;">
				<view style="float: left;width: 15%;line-height: 100upx;text-align: center;font-size: 24upx;">背景</view>
				<view style="float: left;width: 85%;height: 100upx;display: flex;">
					<view class="sekuai" v-for="(item,index) in zhutiList" @tap="qiehuan(index)" :key="item.name" :style="{backgroundColor:item.pageBg,borderColor:dqzhuti==index?item.fontColor:'rgba(0,0,0,0)'}" v-if="index!=1&&index!=2"></view>
				</view>
			</view>
			<view style="width: 100%;display: flex;" class="ddd">
				<view @click="mulu()">
					<view><text class="tficon">&#xe671;</text></view>
					<view class="ft12">目录</view>
				</view>
				<view @click="qiehuan(dqzhuti==1?0:1)">
					<view><text class="tficon">{{dqzhuti==1?'&#xe699;':'&#xe612;'}}</text></view>
					<view class="ft12">{{dqzhuti==1?'白天':'夜间'}}</view>
				</view>
				<view @click="qiehuan(dqzhuti==2?0:2)" :style="dqzhuti==2?'color:green':''">
					<view><text class="tficon">&#xe639;</text></view>
					<view class="ft12">护眼</view>
				</view>
			</view>
		</view>
		<!-- 菜单结束 -->

		<!-- 顶部结束 -->
		<!-- 小说正文开始 -->
		<view class="sview" :style="{paddingTop:'calc('+statusBarHeight+' + 0px)',color:textColor,fontSize:forUpx(size)+'px',lineHeight:forUpx(lineHeight)+'px'}">
			<rich-text :nodes="info.infos"></rich-text>
			<view style="width: 100%; display: flex; border-top: 2px sienna solid;padding-top: 10upx;">
				<text @click="op(info.syj)" style="width: 50%; text-align: center; text-indent: 0;" :style="{color: textColor,fontSize:forUpx(size)+'px',}">{{info.syj==0?'当前第一章':'上一章'}}</text>
				<text @click="op(info.xyj)" style="width: 50%; text-align: center; text-indent: 0;" :style="{color: textColor,fontSize:forUpx(size)+'px',}">{{info.xyj==0?'没有了':'下一章'}}</text>
			</view>
		</view>
		
		<!-- 小说正文结束 -->
	</view>
</template>
<script>
	var interval,timeInter,dianliangInter;
import zhuti from '@/zhuti'
export default{
	data(){
		return{
			section_title:'第一章 陨落的天才',//章节标题
			//正文
			content_text:'',
			show:false,//菜单display
			dqzhuti:0,//当前主题
			zhutiList:zhuti.data,//主题列表
			fontColor:'#646778',//菜单字体颜色
			pageBg:'#f7f7f7',//页面背景色
			menuBg:'#ffffff',//菜单背景色
			textColor:'#000000',//富文本文字颜色
			statusBarHeight: '',
			Dindex:'',//当前章节索引
			shuming:'斗破苍穹',//书名

			battery:'',//电量
			systemTime:'',//系统时间
			size:uni.getStorageSync('fontsize')?uni.getStorageSync('fontsize'):40,//正文字体大小
			lineHeight:uni.getStorageSync('lineHeight')?uni.getStorageSync('lineHeight'):70,//正文行间距
			opdads:false,
			id:'',
			mid:0,
			info:[],
			isLogin:false,
			showLogin:false,
			autoplay:false,
			playbtn:true,
			selectIndex:0,
			tabs:['详情'],
			nextStep:'',
			datasa:[],
			dataconfig:[],
			dda:'',
			price:'',
			banners:[],
			audiolist:[],
			isplaytext:'已经购买',
		}
	},
	onUnload() {
		// 页面卸载的时候清除定时器
		// clearInterval(timeInter)
		// clearInterval(dianliangInter)
		// uni.hideLoading();
		//页面卸载的时候将通知栏显示出来
		//plus.navigator.setFullscreen(false);
	},
	created() {
		var this_ = this;
		//获取状态栏高度给顶部占位节点
		//plus.navigator.setFullscreen(true);
		var zt = uni.getStorageSync('zhuti');//主题索引
		if(zt){
			this.dqzhuti = zt;
			this.fontColor=zhuti.data[zt].fontColor;//菜单字体颜色
			this.pageBg=zhuti.data[zt].pageBg;//页面背景色
			this.menuBg=zhuti.data[zt].menuBg;//菜单背景色
			this.textColor=zhuti.data[zt].textColor;//富文本文字颜色
		}else{
			this.dqzhuti = 0;
			this.fontColor=zhuti.data[0].fontColor;//菜单字体颜色
			this.pageBg=zhuti.data[0].pageBg;//页面背景色
			this.menuBg=zhuti.data[0].menuBg;//菜单背景色
			this.textColor=zhuti.data[0].textColor;//富文本文字颜色
		}
		if(this_.pageBg=='rgb(247,247,247)'){
			var ddfrontColor='#000000'
		}else{
			var ddfrontColor='#ffffff'
		}
		if(this_.pageBg=='#dde7c5' || this_.pageBg=='#f8e6c0' || this_.pageBg=='#eec5cb'){
			var ddfrontColor='#000000'
		}
		uni.setNavigationBarColor({
		    frontColor: ddfrontColor,
		    backgroundColor: this_.pageBg,
		})
		uni.getSystemInfo({
			success: res=>{
				this.statusBarHeight = res.statusBarHeight + 'px';
			}
		})
	},
	onShow() {
		//页面显示的时候将通知栏隐藏掉
		//plus.navigator.setFullscreen(true);
		//uni.hideHomeButton()
		this.getinfo(this.id);
	},
	onHide() {
		//页面隐藏的时候将通知栏显示出来
		//plus.navigator.setFullscreen(false);
	},
	onLoad(e) {
		var this_ = this;
		var thia=this
		// plus.navigator.setStatusBarStyle('dark');
		// plus.navigator.setStatusBarBackground('#FF0000');
		if(e.id){
			this.id=e.id
		}
		if(e.mid){
			this.mid=e.mid
		}
	},

	methods:{
		getinfo(id) {
			var this_=this
			let data = {};
			data.id=id
			data.mid=this.mid
			if(uni.getStorageSync("userinfo").token){
				data.token=uni.getStorageSync("userinfo").token
				this.isLogin = true
			}
			uni.request({
				url: this.configs.webUrl+'/api/video/info',
				data: data,
				success: data => {
						if(uni.getStorageSync("userinfo").token){
							if(data.data.isvip>1){
								this.price=data.data.vipprice
								this.priced=data.data.vippriced
							}else{
								this.priced=data.data.priced
								this.price=data.data.price
							}
						}else{
							this.price=data.data.price
							this.priced=data.data.priced
						}
						data.data.pricebuy=this.price
						data.data.pricedbuy=this.priced
						if(data.data.isplayd==1){
							data.data.isplay=1
						}
						this.info=[];
						this.audiolist=[];
						this.info=data.data
						this.audiolist=data.data.video
						if(data.data.isvip>1){
							if(data.data.vipprice*1==0){
								this.isplaytext='VIP免费'
							}
						}else{
							if(data.data.price*1==0){
								this.isplaytext='免费视频'
							}
						}
						if(data.data.isplay==0){
							console.log(data.data.isplay);
							uni.showModal({
								title: '温馨提示',
								content: "您没有权限阅读 请购买",
								showCancel: true,
								confirmText: "返回",
								cancelText:'购买本集',
								success: function (res) {
								if (res.confirm) {
									uni.navigateBack({});							
								} else if (res.cancel) {
										uni.setStorage({//缓存配置信息
											key: 'buydata',  
											data: this_.info
										})
										uni.navigateTo({
											url:'/pages/client/tuan/buy?id='+this_.id+'&mid='+this_.mid
										})						
									}
								}
							});
							return false;
						}
						uni.setNavigationBarTitle({
						    title: this.info.name
						});
				},
				fail: (data, code) => {
				}
			});
		},
		//修改正文字体大小
		changeFontSize(e){
			this.size = e.detail.value;
			uni.setStorageSync('fontsize',e.detail.value);
		},
		//修改正文行间距
		changeLineHeight(e){
			this.lineHeight = e.detail.value;
			uni.setStorageSync('lineHeight',e.detail.value);
		},
		mulu(){
			this.opdads=true
		},
		back(){
			uni.navigateBack({});
		},
		guanbi(){
			this.opdads=false
		},
		op(mid){
			//ddaas.stop()
			if(mid==0){
				uni.showModal({
					title: '温馨提示',
					content: '当前没有章节',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}else{
				this.mid = mid;
				this.getinfo(this.id)
			}
		},
		dianjile(){
			this.show=!this.show;
			this.opdads=false
		},
		//切换主题
		qiehuan(e){
			this.fontColor=zhuti.data[e].fontColor;//菜单字体颜色
			this.pageBg=zhuti.data[e].pageBg;//页面背景色
			this.menuBg=zhuti.data[e].menuBg;//菜单背景色
			this.textColor=zhuti.data[e].textColor;//富文本文字颜色
			uni.setStorageSync('zhuti',e);
			this.dqzhuti=e;
			var thia=this
			console.log(thia.pageBg)
			if(thia.pageBg=='rgb(247,247,247)'){
				var ddfrontColor='#000000'
			}else{
				var ddfrontColor='#ffffff'
			}
			if(thia.pageBg=='#dde7c5' || thia.pageBg=='#f8e6c0' || thia.pageBg=='#eec5cb'){
				var ddfrontColor='#000000'
			}
			uni.setNavigationBarColor({
			    frontColor: ddfrontColor,
			    backgroundColor: thia.pageBg,
			})
		},
		//获取系统电量
		dianliang(){
			var this_ = this;
			if (uni.getSystemInfoSync().platform != 'ios'){
				var main = plus.android.runtimeMainActivity();
				var Intent = plus.android.importClass('android.content.Intent');  
				var recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {  
				          onReceive: function(context, intent) {  
				        var action = intent.getAction();  
				        if (action == Intent.ACTION_BATTERY_CHANGED) {  
				            var level   = intent.getIntExtra("level", 0); //电量  
				            var voltage = intent.getIntExtra("voltage", 0); //电池电压  
				            var temperature = intent.getIntExtra("temperature", 0); //电池温度  
				                        //如需获取别的，在这里继续写，此代码只提供获取电量  
							this_.battery = level;
				        }  
				     }  
				 });  
				var IntentFilter = plus.android.importClass('android.content.IntentFilter');  
				var filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);  
				main.registerReceiver(recevier, filter); 
			}else{
				var UIDevice = plus.ios.import("UIDevice");  
				var dev = UIDevice.currentDevice();  
				if (!dev.isBatteryMonitoringEnabled()) {  
				    dev.setBatteryMonitoringEnabled(true);  
				}  
				var level =dev.batteryLevel();
				this_.battery = level*100;
			}
		},
		getTimes(){
			var times = new Date();
			this.systemTime = (times.getHours()<10?'0'+times.getHours():times.getHours()) + ':' + (times.getMinutes()<10?'0'+times.getMinutes():times.getMinutes());
		},
		forUpx(e){
			return uni.upx2px(e)
		}
	}
}
</script>
<style>
	@font-face {font-family: "iconfont";
	  src: url('@/font/dianliang.ttf') format('truetype');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.icon-80dianliang:before {
	  content: "\e617";
	}
	.pagbg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.zuizhong.active{
		opacity: 1;
		position: fixed;
		width: 100upx;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
		color: #ec706b;
		transform: translateX(50%) scale(0.7);
		right: 80upx;
		-webkit-transition: all 0.5s;
		z-index: 9
	}
	.zuizhong{
		opacity: 0;
		position: fixed;
		width: 100upx;
		text-align: center;
		font-size: 20upx;
		font-weight: bold;
		color: #ec706b;
		right: 80upx;
		transform: translateX(50%)  scale(0.1);
		-webkit-transition: all 0.5s;
		transition: all 0.5s;
		z-index: 9
	}
	.quanquan{
		-webkit-box-shadow: rgba(0,0,0,0.12) 0px 3px 13px 1px;
		box-shadow: rgba(0,0,0,0.12) 0px 3px 13px 1px;
		position: fixed;
		right: 70upx;
		z-index: 9;
		border-radius: 50%;
		overflow: hidden;
		transform: translateX(50%) scale(0.5);
	}
	.back{
		width: 40upx;
		height: 40upx;
		margin: 0 40upx;
	}
	.sview{
		width: calc(100% - 40upx);
		font-size: 45upx;
		line-height: 90upx;
		position: relative;
		text-indent:calc(2em + 12upx);
		margin: 0 auto;
		z-index: 5;
		white-space:normal;
		word-break:break-all;
		word-wrap:break-word;
		overflow: hidden;
		padding: 0 20upx 30upx;
	}
	.titlee{
		width: 100%;
		font-size: 45upx;
		line-height: 65upx;
		position: relative;
		z-index: 5;
		padding: 0 20upx 50upx;
		text-indent:-2.3em;
	}
	.tMain{
		display: flex;
		align-items:center;
	}
	page{
		letter-spacing:6upx;
	}
	.topBox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
	}
	.bottomBox{
		padding: 0 0 20upx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
	}
	.bottomBox .ddd>view{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		line-height: 40upx;
	}
	.bottomBox .ddd image{
		width: 40upx;
		height: 40upx;
	}
	@font-face {font-family: "ydiconfont";
	  src: url('https://at.alicdn.com/t/font_1282539_9h0uwv1sxps.ttf') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	}
	.tficon{
		font-family: ydiconfont;
		font-size: 34upx;
	}
	.guanggao{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 6;
		width: 100%;
	}
	.dianxin{
		position: absolute;
		top: 32.5%;
		left: 11%;
		width: 72%;
		height: 35%;
	}
	.dLiang{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
	}
	.anmt{
		transition: all 0.5s;
	}
	.sekuai{
		width: 150upx;
		height: 100upx;
		background-color: #EC706B;
		border-radius: 12upx;
		border: 5upx solid #000;
		transform: scale(0.4);
		margin: -10upx -35upx 0;
	}
	.zhongMenu{
		top: 50%;
		position: fixed;
		left: 0;
		width: 100%;
		height: 50%;
		transform: translateY(-50%);
		z-index: 9;
	}
	.listbox {
		/* border: 1px solid rgba(0, 0, 0, 0.2); */
		background: #FFFFFF;
		box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);
		border-radius: 16upx;
		box-sizing: border-box;
		position: fixed;
		width: 90%;
		margin-left: 5%;
		padding: 40upx;
		line-height: 80upx;
		z-index: 999;
		/* #ifndef MP */
		.list {
			line-height: 100upx;
			border-top: 1px solid #eeeeee;
			padding: 10px;
			color: #666666;
			button {
				float: right;
				margin-top: 5px;
				margin-left: 5px;
			}
		}
		.lista{
			color: #333333;
			background: #f9f9f9;
		}
		/* #endif */
	}
</style>
