<template>
	<view class="pd24_20">
		<view class="user-top-bg" :style="currentBgImage ? 'background-image: url(' + currentBgImage + ');' : ''"></view>
		<view v-if="isLogin == false" @click="showLoginAct" class="flex alcenter space">
			<view class="flex alcenter">
				<view class="member-face">
					<image class="face" :src="statics.defaultFace"></image>
				</view>
				<view class="ml15">
					<view class="ft16 cl-main">暂未登录</view>
					<view class="mt12 ft12 cl-notice">点击登录 享受更多会员特惠</view>
				</view>
			</view>
			<text class="iconfont iconicon_arrow_small ft12 cl-notice"></text>
		</view>
		<view v-else class="flex alcenter space">
			<view class="flex alcenter" @click="opsets">
				<view class="member-face">
					<image class="face" :src="avatar"></image>
					<image class="vip-level" :src="userinfo.group_id>1?statics.vipLevelImg[0]:''"></image>
				</view>
				<view class="ml15">
					<view class="ft16 cl-main">{{ userinfo.nickname || '' }}</view>
					<view class="mt12 ft12 cl-notice" :style="currentBgImage ? 'color: #333;' : ''">ID:{{ userinfo.id || '' }}</view>
				</view>
			</view>
			
			<view>
				<view class="btn-mini theme-icon" @click="actionShow = true">
					<image src="../../../static/icon/theme.png"></image>
				</view>
				<view class="btn-mini opsetads" @click="opset">
					<text class="yticon icon-shezhi ft24 cl-notice"></text>
				</view>
			</view>
		</view>
		<view style="width: 100%; height: 30upx;"></view>
		<home-vipcard :userinfo="userinfo" @loginAct="showLoginAct" @qrcode="showQrcode = true"></home-vipcard>
		<view class="mt24">
			<!-- #ifdef MP-WEIXIN -->
			<ad v-if="BannerAd" :unit-id="BannerAd"></ad>
			<home-banner v-else :banners="banners"></home-banner>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<home-banner :banners="banners"></home-banner>
			<!-- #endif -->
		</view>
		<view class="flex wrap space mt16">
			<view v-for="(item,index) in getMenus" :key="index" :class="index > 1 ? 'mt16': ''">
				<view v-if="item.type == 'link'" :data-index="index" @click="memberLinkTo"
					class="box pd16_15 flex alcenter" style="width: 320rpx;">
					<image :src="item.icon" style="width: 64rpx;height: 64rpx;"></image>
					<text class="ml15 ft14 ftw500 cl-main">{{item.name}}</text>
				</view>
				<view v-else style="width: 320rpx;">
					<button class="box pd16_15 flex alcenter" :open-type="item.type"
						style="padding: 32rpx 30rpx; margin: 0;">
						<image :src="item.icon" style="width: 64rpx;height: 64rpx;"></image>
						<text class="ml15 ft14 ftw500 cl-main">{{item.name}}</text>
					</button>
				</view>
			</view>
		</view>

		<!-- 		<navigator open-type="reLaunch" url="/pages/staff/index">
			<view class="box pd16_15 mt16 flex alcenter space">
				<view class="flex alcenter">
					<text class="iconfont iconicon_my_shop cl-main ft24"></text>
					<text class="ml15 ft14 ftw500 cl-main">商户管理入口</text>
				</view>
				<text class="iconfont iconicon_arrow_small cl-notice"></text>
			</view>
		</navigator> -->

		<!-- 		<view class="mt32 flex center alcenter">
			<view class="bd-line" style="width: 120rpx;"></view>
			<view class="ml30 mr30 ft12 cl-notice">推荐小程序</view>
			<view class="bd-line" style="width: 120rpx;"></view>
		</view>
		<view class="mt24 flex alcenter space">
			<view class="flex alcenter">
				<image class="miniapp-icon" style="background: #00C657;"></image>
				<text class="ft14 cl-info2 ml10">小程序A</text>
			</view>
			<view class="flex alcenter">
				<image class="miniapp-icon" style="background: #007AFF;"></image>
				<text class="ft14 cl-info2 ml10">小程序b</text>
			</view>
			
			<navigator url="/pages/client/miniapp">
				<view class="flex alcenter">
					<text class="ft24 iconfont iconicon_more cl-notice"></text>
					<text class="ft14 cl-info2 ml10">更多</text>
				</view>
			</navigator>
		</view> -->

		<com-copyright></com-copyright>

		<!-- <com-footer model="member"></com-footer> -->

		<dialog-birthday v-if="showBirthday" @closed="showBirthday = false"></dialog-birthday>
		<dialog-login v-if="showLogin" @loginYes="loginYes" @closed="showLogin = false"></dialog-login>
		<dialog-qrcode v-if="showQrcode" @closed="showQrcode = false"></dialog-qrcode>
		
		<ActionSheet
			:show="actionShow"
			@close="ActionClose"
			:title="title"
		>
			<view class="select-bg-container">
				<view class="bg-item" v-for="(item, index) in pic" :key="index" @click="selectBg(index)" :class="{ active: index === currentBgIndex }">
					<view class="bg-content">
						<view class="image-box">
							<image :src="item.link" class="bg-image"></image>
						</view>
						<view class="bg-name">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</ActionSheet>
	</view>
</template>

<script>
	import ActionSheet from '../../../components/actionSheet/actionSheet.vue'
	export default {
		components: {
			ActionSheet
		},
		data() {
			return {
				actionShow: false,
				title: '选择背景图',
				isLogin: false,
				showLogin: false,
				isBirthday: true,
				showBirthday: false,
				showQrcode: false,
				avatar: '',
				BannerAd: '',
				userinfo: [],
				banners: [],
				vipLevel: 0,
				iskq: 0,
				pic: [{
					link: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9225cf9c-812a-460f-a2e6-59b295dc56e4/259e96cd-2334-47e1-8552-8d2cbf2d5bf7.jpg',
					name: '荷塘远山'
				}, {
					link: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9225cf9c-812a-460f-a2e6-59b295dc56e4/84bce2d3-a60f-49c8-82b6-96d9329795cf.jpg',
					name: '花丛蓝天'
				}, {
					link: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9225cf9c-812a-460f-a2e6-59b295dc56e4/e5e1f410-ba7d-41ac-919f-32e55e5324d0.jpg',
					name: '初夏树林'
				}, {
					link: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9225cf9c-812a-460f-a2e6-59b295dc56e4/b5e48354-42ce-45c0-b7db-2f7a3a162294.jpg',
					name: '金秋麦穗'
				}, {
					link: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9225cf9c-812a-460f-a2e6-59b295dc56e4/a3c9410c-f5bf-46f2-8a33-975893a30737.jpg',
					name: '桃花纷飞'
				}, {
					link: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9225cf9c-812a-460f-a2e6-59b295dc56e4/d06210c5-7d64-4afe-a02d-98508a1ac8a9.jpg',
					name: '清新地球'
				}],
				currentBgIndex: -1,
				currentBgImage: null,
				memberMenus: [{
						name: '积分奖励',
						type: 'link',
						model: '',
						link: '/pages/client/integral/role',
						icon: this.$config.staticUrl + 'vipcard_icon_my_card@2x.png',
						show: 1
					},
					{
						name: '我的订单',
						type: 'link',
						model: '',
						link: '/pages/client/order/index',
						icon: this.$config.staticUrl + 'vipcard_icon_my_order@2x.png',
						show: 1
					},
					{
						name: '收货地址',
						type: 'link',
						model: '',
						link: '/pages/client/member/address',
						icon: this.$config.staticUrl + 'vipcard_icon_my_address@2x.png',
						show: 0
					},
					{
						name: '官方商城',
						type: 'link',
						model: '',
						link: '/pages/client/shop',
						icon: this.$config.staticUrl + 'vipcard_icon_my_integral@2x.png',
						show: 0
					},
					{
						name: '我的邀请',
						type: 'link',
						model: '',
						link: '/pages/client/mytuandui',
						icon: this.$config.staticUrl + 'vipcard_icon_my_invite@2x.png',
						show: 1
					},
					{
						name: '我要投稿',
						type: 'link',
						model: '',
						link: '/pages/client/member/tougao',
						icon: this.$config.staticUrl + 'vipcard_icon_my_advise@2x.png',
						show: 1
					},
					{
						name: '专属顾问',
						type: 'link',
						model: '',
						link: '/pages/client/vipcard/adviser',
						icon: this.$config.staticUrl + 'vipcard_icon_my_advise@2x.png',
						show: 0
					},
				],
			}
		},
		computed: {
			getMenus() {
				let arr = new Array;
				for (var a in this.memberMenus) {
					if (this.memberMenus[a].show == 1) {
						arr.push(this.memberMenus[a]);
					}
				}
				return arr;
			}
		},
		onLoad() {

		},
		onShow() {
			if (uni.getStorageSync("userinfo").token) {
				this.isLogin = true;
				this.ongrzlTap();
			} else {
				this.isLogin = false;
			}
			this.banners = uni.getStorageSync("config").banner
			this.currentBgImage = uni.getStorageSync('user-top-bg')
			// this.getList();
		},
		onShareAppMessage(e) {

		},
		onShareTimeline(e) {

		},
		methods: {
			setBgImage() {
				if (this.currentBgIndex === -1) return null
				this.currentBgImage = this.pic[this.currentBgIndex].link
			},
			ActionClose() {
				this.actionShow = false
			},
			selectBg(index) {
				this.currentBgIndex = index
				this.actionShow = false
				this.setBgImage()
				uni.setStorage({
					key: 'user-top-bg',
					data: this.pic[this.currentBgIndex].link
				})
			},
			opset() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
			},
			opsets() {
				uni.navigateTo({
					url: '/pages/set/grzl/grzl'
				})
			},
			async ongrzlTap() {
				let data = {};
				data.appid = this.configs.appId
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				uni.request({
					url: this.configs.webUrl + '/api/user/index',
					data: data,
					success: res => {
						if (res.data.code == 1) {
							let ionfo = res.data.data
							ionfo.isLogin = true
							this.userinfo = ionfo
							uni.setStorage({ //缓存配置信息
								key: 'userinfo',
								data: res.data.data
							})
							if (res.data.data.avatar) {
								var str = res.data.data.avatar;
								if (str.indexOf("data:image") != -1) {
									this.avatar = '';
								} else {
									if (str.indexOf("http") != -1) {
										this.avatar = res.data.data.avatar;
									} else {
										this.avatar = this.configs.imgUrl + res.data.data.avatar;
									}
								}
							} else {
								this.avatar = '';
							}
							uni.setStorage({ //缓存配置信息
								key: 'avatar',
								data: this.avatar
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			getList() {
				let data = {};
				var limit = 15;
				data.limit = limit
				data.ishot = 2
				uni.request({
					url: this.configs.webUrl + '/api/video/lists',
					data: data,
					success: data => {
						//console.log(data.data)
						uni.setStorage({ //缓存配置信息
							key: 'config',
							data: data.data.config
						})
						if (uni.getStorageSync("config").iskq) {
							this.iskq = uni.getStorageSync("config").iskq;
						}
					},
					fail: (data, code) => {}
				});
			},
			memberLinkTo(e) {
				let index = parseInt(e.currentTarget.dataset.index);
				if (this.isLogin == false && this.getMenus[index].model != 'integral') {
					this.showLogin = true;
				} else {
					if (this.getMenus[index].link != '') {
						if (this.getMenus[index].model == 'integral') {
							uni.redirectTo({
								url: this.getMenus[index].link
							})
						} else {
							uni.navigateTo({
								url: this.getMenus[index].link
							})
						}
					}
				}
			},
			birthdayAct() {
				if (this.isBirthday) {
					uni.navigateTo({
						url: '/pages/client/member/birthday'
					})
				} else {
					uni.navigateTo({
						url: '/pages/client/member/info'
					})
				}
			},
			showLoginAct() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			loginYes() {

			},
			outlogin() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
				 		uni.clearStorageSync();

							setTimeout(() => {
								this.isLogin = false;
								this.userinfo.isLogin = false
							}, 200)
						}
					}
				});
			}
		}
	}
</script>

<style>
	.opsetads {
		background: #FFFFFF;
		color: #000000;
		width: 70upx;
		line-height: 70upx;
		height: 70upx;
		text-align: center;
		border-radius: 100%;
		animation: rotate 10s linear infinite;
	}
	
	.user-top-bg {
		background-size: 100% 100%;
		height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 400upx;
		z-index: -1;
	}
	
	.theme-icon {
		background: #FFFFFF;
		color: #000000;
		width: 70rpx;
		height: 70rpx;
		text-align: center;
		border-radius: 100%;
		padding: 6rpx;
		margin-bottom: 12rpx;
	}
	
	.theme-icon image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg) skew(0deg) scale(1);
			-ms-transform: rotate(0deg) skew(0deg) scale(1);
			/* IE 9 */
			-moz-transform: rotate(0deg) skew(0deg) scale(1);
			/* Firefox */
			-webkit-transform: rotate(0deg) skew(0deg) scale(1);
			/* Safari  Chrome */
			-o-transform: rotate(0deg) skew(0deg) scale(1);
		}

		100% {
			transform: rotate(360deg) skew(0deg) scale(1);
			-ms-transform: rotate(360deg) skew(0deg) scale(1);
			/* IE 9 */
			-moz-transform: rotate(360deg) skew(0deg) scale(1);
			/* Firefox */
			-webkit-transform: rotate(360deg) skew(0deg) scale(1);
			/* Safari  Chrome */
			-o-transform: rotate(360deg) skew(0deg) scale(1);
		}
	}

	.member-face {
		position: relative;
	}

	.member-face .vip-level {
		height: 48rpx;
		width: 48rpx;
		position: absolute;
		left: calc(50% - 24rpx);
		top: -30rpx;
	}

	.member-face .face {
		width: 160rpx;
		height: 160rpx;
		border: 6rpx solid #FFFFFF;
		background: #FFFFFF;
		border-radius: 100rpx;
		box-shadow: 0rpx 24rpx 48rpx 0rpx rgba(197, 202, 219, 0.3);
	}

	.miniapp-icon {
		width: 48rpx;
		height: 48rpx;
		border-radius: 24rpx;
		background: #F2F2F2;
	}
	
	.select-bg-container {
		padding: 32upx;
		display: grid;
		grid-template-columns: repeat(3, 210upx);
		grid-gap: 32upx;
		grid-auto-flow: row dense;
	}
	
	.select-bg-container .bg-item {
		overflow: hidden;
		height: 200upx;
	}
	.select-bg-container .bg-item .image-box {
		height: 160upx;
		overflow: hidden;
	}
	.select-bg-container .bg-item .bg-name {
		font-size: 28upx;
		text-align: center;
		line-height: 56upx;
		color: #777;
	}
	.select-bg-container .bg-item.active .image-box {
		border: 1px solid #00c657;
	}
	
	.select-bg-container .bg-item.active .bg-name {
		color: #00c657;
	}
</style>
