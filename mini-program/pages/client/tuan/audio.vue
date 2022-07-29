<template>
	<view class="content">
		<zaudio theme="theme1"></zaudio>
		<view class="tuan-detail-tit pd20_15">
			<view class="ft18 cl-main ftw600">{{info.name}}</view>
			<view class="flex alcenter space mt12">
				<view class="flex alcenter">
					<text class="ft14 cl-orange">会员价：</text>
					<text class="ft16 cl-orange ftw600">¥{{info.vipprice}}</text>
					<text class="ml10 ft12 cl-notice">普通价：</text>
					<text class="ft12 cl-notice text-line">¥{{info.price}}</text>
				</view>
				<view class="cl-notice ft12">{{info.updatetime}}</view>
			</view>
		</view>
		<view class="listbox">
			<view class="ft16 cl-main" style="padding:10px;">播放列表:</view>
			<view  v-for="(i, k) in audiolist" :key="k" style="display: flex;padding-bottom: 5upx;"  :class="!paused && i.src === playinfo.src ? 'list lista' : 'list'">
				<view style="font-size: 24upx; width: 100%;line-height: 80upx;">{{ i.title }}</view>
				<button v-if="i.isplay==1"   @click="play(k)" style="background: #e4e2e2; margin-top: 5upx; width: 180upx; height: 80upx; line-height: 80upx; padding: 0upx 10upx;" size="mini">{{ !paused && i.src === playinfo.src ? '播放中' : '播放' }}</button>
				<button @click="buys(i)" v-else style="background: #e4e2e2; margin-top: 5upx; width: 180upx; height: 80upx; line-height: 80upx; padding: 0upx 10upx;" size="mini">{{ !paused && i.src === playinfo.src ? '播放中' : '购买' }}</button>
				<!-- <button size="mini" @click="play(k)" style="float: left;">{{ i.title }}</button> -->
			</view>
		</view>
		<view  class="mt24" style="margin:0upx 30upx 30upx 30upx;box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);">
			<home-banner :banners="banners"></home-banner>
		</view>
		<view class="form-footer-h" style="display: none;">
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
							<button @click="vipcard" class="form-footer-item text-center ">
								<view class="iconfont icontabbar01 ft22"></view>
								<view class="ft12 mt8">开通VIP</view>
							</button>
						</view>
						<button v-if="info.isplay==0" @click="buyAct" class="btn-big" style="width: 288rpx;" :style="getBtnStyle">¥{{price}}购买</button>
						<button v-if="info.isplay==1" class="btn-big" style="width: 288rpx; color: #ffffff; background: #C0C0C0!important;">{{isplaytext}}</button>
						
				</view>
			</view>
		</view>
		<view class="demo" v-if="id==-10000">
			<button @click="asyncSetAudio" size="mini">异步设置音频</button>
			<button @click="reset" size="mini">覆盖音频</button>
			<button @click="add" size="mini">添加音频</button>
			<button @click="setRender" size="mini">渲染第2首</button>
			<button @click="willStop(10)" size="mini">注册5秒后暂停事件</button>
			<button @click="removeStop" size="mini">卸载5秒后暂停事件</button>
			<button @click="logPlaying('log')" size="mini">注册播放时打印事件</button>
			<button @click="offPlaying('log')" size="mini">卸载播放时打印事件</button>
			<button @click="stepPlay(20)" size="mini">快进20s</button>
			<button @click="stepPlay(-20)" size="mini">快退20s</button>
		</view>
	</view>
</template>

<script>
import zaudio from '@/components/uniapp-zaudio/zaudio';
// import zaudio from 'uniapp-zaudio/zaudio'
export default {
	components: { zaudio: zaudio },
	data() {
		return {
			//audiolist: this.$zaudio.audiolist, //当前音频列表
			playIndex: this.$zaudio.playIndex, //当前播放的索引
			paused: this.$zaudio.paused, //当前是否暂停
			playinfo: this.$zaudio.playinfo ,//当前播放的信息
			audiolist:[
			],
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
			isplaytext:'已经购买',
		};
	},
	
	onLoad(option){
		
		this.$zaudio.stop();
		
		//注意: 不同的回调方法, 相同的业务函数方法名, 不会相互影响;
		this.$zaudio.on('stop', 'aaa', function(){
			console.log('我是强制暂停或关闭小程序音频浮窗触发的')
		})
		this.$zaudio.on('seek', 'aaa', function(time){
			console.log('进度拖动A', time)
		})
		//注意: 相同的回调方法, 且相同的业务函数方法名, 只作用于第一次注册的业务
		this.$zaudio.on('seek', 'aaa', function(time){
			console.log('进度拖动B', time)
		})
		if(option.id){
			this.id=option.id
		}
		if(option.mid){
			this.mid=option.mid
		}
		this.getinfo(this.id);
	},
	onUnload() {
		//this.$zaudio.stop();
		this.$zaudio.loading=false;
	},
	onShow() {
		this.banners=uni.getStorageSync("config").banner
		//this.getinfo(this.id);
		//实时渲染当前的播放状态
		this.$zaudio.syncRender()
		//实时获取当前播放状态
		this.$zaudio.syncStateOn('page-index-get-state', ({ audiolist, playIndex, paused, playinfo }) => {
			this.audiolist = audiolist;
			this.playIndex = playIndex;
			this.paused = paused;
			this.playinfo = playinfo;
		});
		//console.log('audiolist1', this.audiolist)
	},
	onHide() {
		//卸载不需要的业务和获取播放状态的业务,提高页面性能
		this.$zaudio.syncStateOff('page-index-get-state');
		this.$zaudio.off('seek', 'aaa');
		this.$zaudio.off('stop', 'aaa');
	},
	methods: {
		buys(value){
			let dataa = {};
			this.info.priced=value.price
			this.info.vippriced=value.vipprice
			this.info.pricedbuy=this.info.price
			if(uni.getStorageSync("userinfo").token){
				if(this.info.isvip>1){
					this.info.pricedbuy=value.vipprice
				}
			}
			console.log(value)
			
			uni.setStorage({//缓存配置信息
				key: 'buydata',  
				data: this.info
			})
			uni.navigateTo({
				url:'/pages/client/tuan/buy?id='+this.id+'&mid='+value.id
			})	
		},
		getinfo(id) {
			this.info=[];
			uni.showLoading({
			    title: '加载中'
			});
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
						uni.hideLoading();
						if(uni.getStorageSync("userinfo").token){
							if(data.data.isvip>1){
								this.price=data.data.vipprice
							}else{
								this.price=data.data.price
							}
						}else{
							this.price=data.data.price
						}
						data.data.pricebuy=this.price
						if(data.data.isplayd==1){
							data.data.isplay=1
						}
						this.audiolist=[];
						this.info=data.data
						this.audiolist=data.data.video
						// 设置音频数据
						this.$zaudio.setAudio(this.audiolist);
						//zaudio.setAudio(data)
						//渲染第一首音频
						this.$zaudio.setRender(this.info.playIndex)
						//this.removeStop();
						this.$zaudio.off('playing', 'recharge');
						this.willStop(this.info.mrseek)
						if(data.data.isvip>1){
							if(data.data.vipprice*1==0){
								this.isplaytext='VIP免费'
							}
						}else{
							if(data.data.price*1==0){
								this.isplaytext='免费视频'
							}
						}
						uni.setNavigationBarTitle({
						    title: this.info.name
						});
				},
				fail: (data, code) => {
					uni.hideLoading();
				}
			});
		},
		play(key) {
			//播放或暂停
			this.$zaudio.operate(key);
		},

		go(key) {
			uni.navigateTo({
				url: '/pages/detail/index?key=' + key
			});
		},
		reset() {
			let data = [
				{
					src: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2020/08/21/21a_zj/01.mp3',
					title: '二人转',
					singer: '作者333',
					coverImgUrl: 'https://img.1ting.com/images/special/374/s300_2f06b17427718e01e54be1cfe462f3e0.jpg'
				}
			];
			this.$zaudio.setAudio(data);
		},
		add() {
			let data = [
				{
					src: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/jn/12.jlhg/8.zhg/2.mp3',
					title: '天边',
					singer: '作者222',
					coverImgUrl: 'https://img.1ting.com/images/special/377/s300_4631dc844ab6429b6bc6fe4ccdc6ed6f.jpg'
				}
			];
			this.$zaudio.updateAudio(data);
		},
		//异步加载音频并渲染
		asyncSetAudio() {
			let data = [{
					src: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/zzzzzmp3/2014iSep/15F/15xwsk/21.mp3',
					title: '蓝莲花',
					singer: '许巍',
					coverImgUrl: 'https://img.1ting.com/images/special/358/s100_6d9c9a3f9f67fa76b041561ff0042ae4.jpg'
				}];
				
				uni.showLoading()
				setTimeout(()=>{
					this.$zaudio.setAudio(data);
					this.$zaudio.setRender(0);  //setRender: 用于渲染zaudio, 具体查看文档
					uni.hideLoading()
				},1500)
		},
		setRender(){
			this.$zaudio.setRender(1);
		},
		willStop(mrseek) {
			console.log(this.info.isplay);
			if(this.info.isplay==0){
				this.$zaudio.on('playing', 'recharge', info => {
					if (info.current_value > mrseek) {
						this.$zaudio.stop();
						let this_=this
						uni.showModal({
							title: '温馨提示',
							content: '没权限听当前音频',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
			}
		},

		removeStop() {
			this.$zaudio.off('playing', 'recharge');
			this.$zaudio.operate();
		},

		logPlaying(action) {
			// 一个回调事件可以注册多次业务, action用于区分相同回调事件的不同业务
			//例: playing回调时注册 打印事件
			this.$zaudio.on('playing', action, info => {
				console.log('播放中----' + action, info);
			});
		},
		offPlaying(action) {
			//注意解除事件action必须与注册事件的action相同
			this.$zaudio.off('playing', action);
		},
		vipcard(){
			uni.navigateTo({
				url:'/pages/client/vipcard/index'
			})
		},
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
		stepPlay(val) {
			this.$zaudio.stepPlay(val);
		},
		buyAct(){
			if(this.price*1==0){
				uni.showToast({ title: '免费视频不需要购买',icon:"none" });
				return false; 
			}
			if(this.isLogin == false){
				this.showLogin = true;
				this.nextStep = 'buy';
			}else{
				uni.setStorage({//缓存配置信息
					key: 'buydata',  
					data: this.info
				})
				uni.navigateTo({
					url:'/pages/client/tuan/buy?id='+this.id
				})
			}
		},
	}
};
</script>

<style scoped lang="scss">
.listbox {
	margin: 0px 10px 10px;
	//border: 1px solid rgba(0, 0, 0, 0.2);
	background: #FFFFFF;
	box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);
	border-radius: 16upx;
	.list {
		line-height: 100upx;
		border-top: 1px solid #eeeeee;
		padding: 0 10px;
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
}

.demo {
	margin-top: 20px;
	button {
		margin: 5px;
	}
}
</style>
