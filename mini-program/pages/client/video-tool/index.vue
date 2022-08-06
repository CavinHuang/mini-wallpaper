<template>
	<view class="wrap">
	  <view class="platforms">
	    <text class="platforms-title">微航去水印助手暂只支持解析抖音小视频,其他平台后续开放</text>
	    <view class="page-body">
	      <view class="page-section page-section-spacing swiper">
	        <swiper>
	          <swiper-item>
	            <view class="swiper-item">
	              <view class="platforms-item">
	                <image src="/static/images/logo-douyin.png"></image>
	                <text>抖音</text>
	              </view>
	              <view class="platforms-item">
	                <image src="/static/images/logo-gitShow.png"></image>
	                <text>快手</text>
	              </view>
	              <view class="platforms-item">
	                <image src="/static/images/logo-ppx.png"></image>
	                <text>皮皮虾</text>
	              </view>
	              <view class="platforms-item">
	                <image src="/static/images/logo-volcano.png"></image>
	                <text>火山视频</text>
	              </view>
	            </view>
	            <view class="swiper-item">
	              <view class="platforms-item">
	                <image src="/static/images/logo-microview.png"></image>
	                <text>微视</text>
	              </view>
	              <view class="platforms-item">
	                <image src="/static/images/logo-meipai.png"></image>
	                <text>美拍</text>
	              </view>
	              <view class="platforms-item">
	                <image src="/static/images/logo-xiaokaxiu.png"></image>
	                <text>小咖秀</text>
	              </view>
	              <view class="platforms-item">
	                <image src="/static/images/logo-zuiyou.png"></image>
	                <text>最右</text>
	              </view>
	            </view>
	          </swiper-item>
	        </swiper>
	      </view>
	    </view>
	  </view>
	  <view class="watermark">
	    <view class="watermark-input">
	      <input id="inputText" placeholder=" 请复制视频链接，粘贴到这里" type="text" :value="url" @blur="onBlur"></input>
	      <button @click="mousuosuo_clear" id="clearInputText">
	        <image src="/static/images/icon-clear-active.png"></image>
	      </button>
	    </view>
		<ad unit-id="adunit-be33d9473f28505f" ad-type="video" ad-theme="white"></ad>
	    <button @click="removeWatermark" class="parsing" hoverClass="parsing-btn-hover" style="margin-top:10px;">一键去除水印</button>
		<button @click="get_ad" class="parsing" hoverClass="parsing-btn-hover">获取更多积分</button>
		<button class="parsing" open-type="share" hoverClass="parsing-btn-hover">转发邀请好友</button>
		<button @click="turn" class="parsing" hoverClass="parsing-btn-hover">文字转成语音</button>
		<button @click="get_image" class="parsing" hoverClass="parsing-btn-hover">聊天表情包</button>
		<button @click="go_video" class="parsing" hoverClass="parsing-btn-hover">在线看视频</button>
	    <!-- <ad unitId="adunit-c0c3a4f8e7555786"></ad> -->
		<ad unit-id="adunit-008c9220b25bdc2a" :class="show_view?'':'show_view'"></ad>
	    <view class="faq">
	      <view class="faq-header">
	        <text class="faq-header-title">常见问题</text>
	      </view>
	      <view class="faq-content">
	        <view @click="mousuosuo_showSvPro" class="faq-content-list" data-index="1">
	          <text>使用方法</text>
	          <image src="/static/images/icon-more.png"></image>
	        </view>
			<view @click="mousuosuo_showSvPro" class="faq-content-list" data-index="2">
			  <text>邀请好友说明</text>
			  <image src="/static/images/icon-more.png"></image>
			</view>
			<view @click="mousuosuo_showSvPro" class="faq-content-list" data-index="3">
			  <text>为什么无法下载视频？</text>
			  <image src="/static/images/icon-more.png"></image>
			</view>
	        <view @click="mousuosuo_showSvPro" class="faq-content-list" data-index="4">
	          <text>为什么视频成功解析了还有水印？</text>
	          <image src="/static/images/icon-more.png"></image>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoAd: null,  // 在页面中定义激励视频广告
				show_view: false,
				userInfo: {},
				videoUrl: '',
				url: '',
				params: {},
				inviter_uid: '',
				uid: ''
			}
		},
		//事件处理函数
		/* bindViewTap: function () {
		    wx.navigateTo({
		      url: '../logs/logs'
		    })
		}, */
		onShareAppMessage(res) {
			if (res.from === 'menu') { // 来自右上角分享按钮
				console.log(res.target)
			}
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			this.params.inviter_uid = this.uid;
			return {
				title: '微航一键去除抖音小视频水印',
				path: '/pages/index/index?query=' + encodeURIComponent(JSON.stringify(this.params))
			}
		},
		onLoad(e) {
			if(e.query!=undefined) {
				try {
					this.params = JSON.parse(decodeURIComponent(e.query));
					this.inviter_uid = this.params.inviter_uid;
				} catch (error) {
					this.params = JSON.parse(e.query);
					this.inviter_uid = this.params.inviter_uid;
				}
			}
			
			if(this.inviter_uid) {
				uni.setStorageSync('inviter_uid', this.inviter_uid);
			}
			
			this.uid = uni.getStorageSync('uid');
			
			// 在页面中定义激励视频广告
			//let videoAd = null
			
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
			    this.videoAd = wx.createRewardedVideoAd({
			        adUnitId: 'adunit-6da65ed6ccaa1a8d'
			    })
			    this.videoAd.onLoad(() => {
					/* uni.showToast({
					    icon: 'none',
					    title: '激励视频 广告显示成功',
					}) */
				})
			    this.videoAd.onError((err) => {
					uni.showToast({
					    icon: 'none',
					    title: '获取积分失败！',
					})
					console.log(1);
					console.log(err);
				})
			    this.videoAd.onClose((res) => {
					if (res && res.isEnded || res === undefined) {
						uni.request({
							url: this.$api_url + '/user/reward_integral',
							method: 'POST',
							header: {'content-type': 'application/x-www-form-urlencoded'},
							data: {type:1,uid:this.uid},
							success: (result) => {
								if (result.statusCode !== 200) {
									return;
								}
								
								/* if(result.data.code==200) {
									uni.showToast({
										icon: 'none',
										title: '恭喜您获得奖励10积分！',
									})
								}else {
									uni.showToast({
										icon: 'none',
										title: result.data.msg,
									})
								} */
								uni.showToast({
									icon: 'none',
									title: '恭喜您获得奖励10积分！',
								})
							},
							fail: (err) => {
								console.log('获取接口返回错误:', err);
							},
						});
						
						console.log('视频正常关闭 下发奖励')
					} else {
						// 播放中途退出，进行提示
						uni.showToast({
						    icon: 'none',
						    title: '中途关闭无法获得奖励',
						})
					}
					
					console.log(2);
					console.log(res);
				})
			}
			
			uni.request({
				url: this.$api_url + '/home/index',
				method: 'POST',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				data: '',
				success: (result) => {
					if (result.statusCode !== 200) {
						return;
					}
					this.show_view = result.data;
					
				},
				fail: (err) => {
					console.log('获取接口返回错误:', err);
				},
			});
		},
		methods: {
			onBlur(event) {
				this.url = event.detail.value;
				
				console.log(this.url);
			},
			get_ad() {
				var sid = uni.getStorageSync('sid');
				var uid = uni.getStorageSync('uid');
				if (!sid || !uid) {
					uni.showModal({
						title: '您没有登录！',
						content: '请先登录！',
						showCancel: false
					});
					return;
				}
				
				uni.request({
					url: this.$api_url + '/user/check_reward',
					method: 'POST',
					header: {'content-type': 'application/x-www-form-urlencoded'},
					data: {type:1,uid:this.uid},
					success: (result) => {
						if (result.statusCode !== 200) {
							return;
						}
						
						if(result.data.code==200) {
							// 用户触发广告后，显示激励视频广告
							if (this.videoAd) {
							    this.videoAd.show().catch(() => {
							        // 失败重试
							        this.videoAd.load()
							        .then(() => this.videoAd.show())
							        .catch(err => {
									    uni.showToast({
									  	    icon: 'none',
									  	    title: '获取更多积分已达上限，请明天再来！',
									    })
										console.log(err);
							            console.log('激励视频 广告显示失败')
							        })
							    })
							}
						}else {
							uni.showToast({
								icon: 'none',
								title: result.data.msg,
							})
						}
					},
					fail: (err) => {
						console.log('获取接口返回错误:', err);
					},
				});
				// 用户触发广告后，显示激励视频广告
				/* if (this.videoAd) {
				    this.videoAd.show().catch(() => {
				        // 失败重试
				        this.videoAd.load()
				        .then(() => this.videoAd.show())
				        .catch(err => {
						    uni.showToast({
						  	    icon: 'none',
						  	    title: '获取更多积分已达上限，请明天再来！',
						    })
							console.log(err);
				            console.log('激励视频 广告显示失败')
				        })
				    })
				} */
			},
			removeWatermark() {
				/* var sid = uni.getStorageSync('sid');
				if (!sid) {
					uni.showModal({
						title: '您没有登录！',
						content: '请先登录！',
						showCancel: false
					});
					return;
				}
				uni.showModal({
					content: '您要消耗5积分去水印么？',
					success: (res) => {
						if (res.confirm) { */
							this.removeWatermark_api();
						/* }
					},
				}) */
			},
			removeWatermark_api() {
				uni.request({
					url: 'https://img.navculture.com/test/index',
					method: 'POST',
					header: {'content-type': 'application/x-www-form-urlencoded'},
					data: {url:this.url},
					success: (result) => {
						if (result.statusCode !== 200) {
							return;
						}
						
						if(result.data.code==200) {
							//this.video_url = result.data.data;
							//this.video_title = result.data.video_title;
							
							//if(this.show_view) {
								// 比如解析出来的视频地址有 v1-dy v2-dy v3-dy ... v9-dy 将此9条或更多加入到自己小程序合法下载域名内
								// 设置匹配数组 
								/* var matchArr = ['v1-dy.ixigua.com', 'v2-dy.ixigua.com', 'v3-dy.ixigua.com','v4-dy.ixigua.com', 'v5-dy.ixigua.com', 'v6-dy.ixigua.com','v7-dy.ixigua.com', 'v8-dy.ixigua.com', 'v9-dy.ixigua.com'];
								var flag = 0
								for (const i in matchArr) {
								    if (result.data.data.indexOf(matchArr[i])!=-1) {
										// 执行下载逻辑
										// ... 下载逻辑
										flag = 1
										break
								    }
								}
								if (!flag) {
									console.log(result.data);
									this.removeWatermark_api();
									return;
								    // 执行解析逻辑 继续解析接口 在匹配 直到匹配完成 或 匹配10次未成功则提示 请重新解析
								} */
								
								uni.navigateTo({
									url: '/pages/video/index?query=' + encodeURIComponent(JSON.stringify(result.data))
								});
							/* } else {
								uni.showModal({
									content: result.data.data,
									showCancel: false,
									confirmText: '复制',
									success: (res) => {
										if (res.confirm) {
											uni.setClipboardData({
											    data: result.data.data,
											    success: function () {
											        uni.showToast({
											        	icon: 'none',
											        	title: '复制成功',
											        })
											    }
											});
										}
									}
								})
							} */
							
						}else {
							uni.showToast({
								icon: 'none',
								title: result.data.msg,
							})
						}
						
						console.log(result.data);
					},
					fail: (err) => {
						console.log('获取接口返回错误:', err);
					},
				});
			},
			mousuosuo_showSvPro(e) {
			    var index = e.target.dataset.index
			    switch (index) {
			      case '1':
					/* uni.showToast({
						icon: 'none',
						title: '去除一个小视频水印消耗5积分，每天签到可获取10积分'
					}) */
					uni.showModal({
						title: '使用说明',
						content: '1、去除一个小视频水印消耗5积分，每天签到获得10积分。 2、连续签到7天可额外获得1000积分；连续签到15天可额外获得2000积分；连续签到30天可额外获得5000积分。3、补签1天可额外获得10积分。',
						showCancel: false
					});
			        break
				  case '2':
						uni.showModal({
							title: '邀请好友说明',
							content: '转发小程序给微信好友或微信群，好友点击使用(登录授权)后即算邀请成功；成功邀请1位好友可获得1000积分，邀请好友及获取积分无上限。',
							showCancel: false
						});
				    break
				  case '3':
				    uni.showToast({
				    	icon: 'none',
				    	title: '先授权保存到相册'
				    })
				    break
			      case '4':
				    uni.showToast({
				    	icon: 'none',
				    	title: '视频自带无法去除'
				    })
			        break
			      default:
			        break
			    }
			},
			mousuosuo_clear () {
			    this.url = ''
			},
			turn() {
				uni.navigateToMiniProgram({
				    appId: 'wxd3e0f36addf19fd2',
				    path: 'pages/index/index',
				    success(res) {
						// 打开成功
				    }
				})
			},
			get_image() {
				uni.navigateToMiniProgram({
				    appId: 'wxf31807c4ce22d741',
				    path: 'pages/home/home',
				    success(res) {
						// 打开成功
				    }
				})
			},
			go_video() {
				uni.navigateToMiniProgram({
				    appId: 'wx2f5ef9271905d01f',
				    path: 'pages/index/index',
				    success(res) {
						// 打开成功
				    }
				})
			}
		}
	}
</script>

<style>
	page {
	    background-color: #0000;
	    height: 100%;
	    font-size: 32rpx;
	    line-height: 1.6;
	}
	
	.wrap {
	    height: 100%;
	}
	
	.page-body {
	    height: 400rpx;
	    padding-top: 28rpx;
	}
	
	.page-section {
	    position: relative;
	    overflow: hidden;
	    width: 514rpx;
	    margin: 0 auto;
	}
	
	.page-section swiper {
	    height: 194rpx;
	}
	
	.page-section_center {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	}
	
	.page-section:last-child {
	    margin-bottom: 0;
	}
	
	.page-section-gap {
	    box-sizing: border-box;
	    padding: 0 30rpx;
	}
	
	.page-section-title {
	    font-size: 50rpx;
	    color: #999;
	    margin-bottom: 10rpx;
	    padding-left: 30rpx;
	    padding-right: 30rpx;
	}
	
	.page-section-gap .page-section-title {
	    padding-left: 0;
	    padding-right: 0;
	}
	
	.show_view {
		display: none !important;
	}
	
	.demo-text-1 {
	    position: relative;
	    align-items: center;
	    justify-content: center;
	    background-color: #1aad19;
	    color: #fff;
	    font-size: 36rpx;
	}
	
	.demo-text-1:before {
	    content: 'A';
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}
	
	.demo-text-2 {
	    position: relative;
	    align-items: center;
	    justify-content: center;
	    background-color: #2782d7;
	    color: #fff;
	    font-size: 36rpx;
	}
	
	.demo-text-2:before {
	    content: 'B';
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}
	
	.demo-text-3 {
	    position: relative;
	    align-items: center;
	    justify-content: center;
	    background-color: #f1f1f1;
	    color: #353535;
	    font-size: 36rpx;
	}
	
	.demo-text-3:before {
	    content: 'C';
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}
	
	button {
	    margin-bottom: 30rpx;
	}
	
	button:last-child {
	    margin-bottom: 0;
	}
	
	.page-section-title {
	    padding: 0;
	}
	
	.swiper-item {
	    overflow: hidden;
	    display: block;
	    margin-bottom: 14rpx;
	}
	
	.page-section-title {
	    margin-top: 60rpx;
	    position: relative;
	}
	
	.info {
	    position: absolute;
	    right: 0;
	    color: #d81818;
	    font-size: 30rpx;
	}
	
	.page-foot {
	    margin-top: 50rpx;
	}
	
	.platforms {
	    background-color: #99CCFF;
	    position: absolute;
	    top: 0;
	    width: 100%;
	    z-index: 1;
	}
	
	.platforms-title {
	    display: block;
	    font-size: 22rpx;
	    color: #999999;
	    text-align: center;
	    padding-top: 32rpx;
	}
	
	.platforms-title::before,.platforms-title::after {
	    content: '';
	    display: inline-block;
	    width: 6rpx;
	    height: 6rpx;
	    background-color: #999999;
	    border-radius: 2px;
	    transform: rotate(45deg);
	    vertical-align: middle;
	}
	
	.platforms-title::before {
	    margin-right: 8rpx;
	}
	
	.platforms-title::after {
	    margin-left: 8rpx;
	}
	
	.platforms-item {
	    float: left;
	    width: 80rpx;
	    text-align: center;
	    margin-right: 58rpx;
	}
	
	.platforms-item:last-child {
	    margin-right: 0;
	}
	
	.platforms-item image {
	    display: block;
	    width: 60rpx;
	    height: 60rpx;
	    margin: 0 auto;
	}
	
	.platforms-item text {
	    display: block;
	    font-size: 20rpx;
	    color: #fff;
	    text-align: center;
	    white-space: nowrap;
	    margin-top: 2rpx;
	}
	
	.dots {
	    overflow: hidden;
	    width: 50rpx;
	    margin: 40rpx auto 80rpx;
	}
	
	.dot {
	    float: left;
	    width: 26rpx;
	    height: 8rpx;
	    border-radius: 20rpx;
	    margin-right: 16rpx;
	    background-color: white;
	}
	
	.dot:last-child {
	    margin-right: 0;
	}
	
	.active {
	    width: 8rpx;
	    height: 8rpx;
	    background-color: #fff;
	}
	
	.watermark {
	    position: relative;
	    background-color: #fff;
	    border-top-left-radius: 20rpx;
	    border-top-right-radius: 20rpx;
	    padding-top: 76rpx;
	    top: 412rpx;
	    z-index: 9;
	}
	
	.watermark-input {
	    position: absolute;
	    top: -64rpx;
	    left: 50%;
	    width: 664rpx;
	    height: 108rpx;
	    margin-left: -332rpx;
	    z-index: 9;
	    background-color: #fff;
	    box-shadow: 0 12rpx 28rpx rgba(153,153,153,0.34);
	    border-radius: 16rpx;
	}
	
	.watermark-input input {
	    float: left;
	    width: 80%;
	    height: 100%;
	    font-size: 28rpx;
	    padding-left: 30rpx;
	}
	
	#clearInputText {
	    display: flex;
	    width: 100rpx;
	    height: 100%;
	    border: none;
	    background-color: #fff;
	    align-items: center;
	}
	
	#clearInputText:after {
	    border: none;
	}
	
	#clearInputText image {
	    display: block;
	    width: 30rpx;
	    height: 30rpx;
	}
	
	.parsing {
	    overflow: hidden;
	    display: block;
	    width: 664rpx;
	    height: 88rpx;
	    line-height: 88rpx;
	    color: #fff;
	    background-color: #337aff;
	    box-shadow: 0 14rpx 28rpx rgba(51,122,255,0.3);
	}
	
	.appreciate {
	    color: #000;
	    background-color: #f8f8f8;
	    box-shadow: none;
	}
	
	.parsing-btn-hover {
	    background: #3f6ddd;
	    border: 1px solid #1e4ecb;
	}
	
	.list-hover-class {
	    background-color: #EBEBEB;
	    border-radius: 12rpx;
	}
	
	.faq {
	    width: 664rpx;
	    margin: 106rpx auto 0;
	}
	
	.faq-header {
	    display: flex;
	    justify-content: space-between;
	    margin-bottom: 16rpx;
	}
	
	.faq-header-title {
	    font-size: 28rpx;
	    font-weight: 600;
	}
	
	.faq-header-more {
	    font-size: 24rpx;
	    color: #989898;
	}
	
	.faq-content {
	    width: 100%;
	    border-radius: 12rpx;
	    background: #f6f6f6;
	}
	
	.faq-content-list {
	    overflow: hidden;
	    height: 108rpx;
	    line-height: 108rpx;
	}
	
	.faq-content-list text {
	    font-size: 26rpx;
	    color: #666;
	    margin-left: 32rpx;
	}
	
	.faq-content-list image {
	    float: right;
	    width: 16rpx;
	    height: 22rpx;
	    margin-top: 43rpx;
	    margin-right: 38rpx;
	}
	
	.contact {
	    font-size: 24rpx;
	    text-align: center;
	    padding-top: 70rpx;
	    padding-bottom: 32rpx;
	}
	
	.contact-copy {
	    color: #337aff;
	    text-decoration: underline;
	    margin-left: 30rpx;
	}
	.center {
	  text-align: center;
	  color: #f0f0f0;
	}
</style>