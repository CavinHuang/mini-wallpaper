<template>
	<view class="pd16_15">
		<block v-for="(item,index) in listData" :key="index">
		<view class="box pd16_15 alcenter space" style="margin-bottom: 30upx;">
			<view class="flex" style="width: 100%;" @click="detail(item.id)">
				<view style="width:230rpx;">
					<image mode="aspectFill" class="order-list-item-l" :src="item.img" style="margin-right: 5%; border-radius: 5px;"></image>
				</view>
				<view style="width: 100%; padding-left: 20upx;">
					<view class="ft14 cl-main">{{item.name}} </view>
					<view class="mt8 ft12 cl-notice">
						￥{{item.price}}
						<text v-if="uid==1" class="ft12 cl-notice" style="float: right;">UID:{{item.uid}} </text>
					</view>
					<view class="mt8 ft12 cl-notice">
						{{item.createtime}}
						<text class="ft12 cl-notice" style="float: right;"> {{item.status=='hidden'?'未审核':'已审核'}} </text>
					</view>
					<view class="mt8">
						<view v-if="uid==1" class="flex alcenter space mt16">
							<view class="btn-small plan"  @tap.stop="tougaodel(item.id,index)">删除</view>
							<view @tap.stop="shenhe(item.id,index,item.status)">
								<view class="btn-small" v-if="item.status=='hidden'" :style="getBtnStyle">{{item.status=='hidden'?'审核':'取消审核'}}</view>
								<view class="btn-small" v-else style="background: #0dbbc3; color: #ffffff;">{{item.status=='hidden'?'审核':'取消审核'}}</view>
							</view>
						</view>
						<view v-else class="flex alcenter space mt16">
							<view class="btn-small plan"  @tap.stop="detail(item.id)">详情</view>
							<view class="btn-small plan" :style="getBtnStyle" @tap.stop="tougaodel(item.id,index)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		</block>	
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	  export default {
		  components: {
		  	uniLoadMore
		  },
	    data() {
	        return {
				uid:'',
	            listData: [],
				last_id: 0,
				reload: true,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有数据了'
				}
	        }
	    },
	    onReachBottom() {
	    	this.status = 'more';
	    	this.getList();
	    },
	    onLoad() {
			if(uni.getStorageSync("userinfo").id){
				this.uid=uni.getStorageSync("userinfo").id
			}
	    	this.getList();
	    },
		methods: {
			getList() {
				let data = {
					//column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				var limit=10;
				if (this.last_id>0) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.offset = this.last_id*limit;
					data._ = new Date().getTime() + '';
				}
				data.limit=limit		
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaojl',
					data: data,
					success: data => {
						if (data.data.total>0) {
							let list = data.data.rows;
							this.listData = this.reload ? list : this.listData.concat(list);
							this.reload = false;
							this.last_id = this.last_id+1;
							if(data.data.total<this.last_id*limit){
								this.status = '';
							}
						}else{
							this.status = '';
							this.contentText.contentdown='没有数据'
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			shenhe(id,index,status){
				var name=status=='hidden'?'审核':'取消审核'
				var this_=this
				uni.showModal({
					title: '温馨提示',
					content: '是否确认'+name,
					showCancel: true,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							this_.shenhe1(id,index);
						} else if (res.cancel) {
														
						}
					}
				});
			},
			shenhe1(id,index){
				var this_=this
				let data = {};
				data.id=id
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaoshenhe',
					data: data,
					success: data => {
						uni.showModal({
							title: '温馨提示',
							content: data.data.msg,
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								if (res.confirm) {
									this_.listData[index].status=data.data.data
								} else if (res.cancel) {
									
								}
							}
						});
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			tougaodel(id,index){
				var this_=this
				uni.showModal({
					title: '温馨提示',
					content: '是否确认删除',
					showCancel: true,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							this_.tougaodel1(id,index);
						} else if (res.cancel) {
														
						}
					}
				});
			},
			tougaodel1(id,index){
				var this_=this
				let data = {};
				data.id=id
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaodel',
					data: data,
					success: data => {
						uni.showModal({
							title: '温馨提示',
							content: data.data.msg,
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								if (res.confirm) {
									this_.listData.splice(index,1)
								} else if (res.cancel) {
									
								}
							}
						});
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			detail(id){
				//console.log(lx);
				uni.navigateTo({
					url:'/pages/client/tuan/infotp?id='+id
				})
			},
		}
	}
</script>

<style>
	.order-list-item-l{
		width: 150rpx;
		height: 225rpx;
		border-radius: 8rpx;
		background: #F2F2F2;
	}
	.order-list-item-r{
		width: calc(100% - 200rpx);
		padding-left: 30rpx;
	}
	.uni-title{
		color: #444;
		font-size: 32upx;
		font-weight: normal;
	}
	.uni-text{
		font-size: 28upx;
	}
	.uni-h5{
		font-size: 32upx;
		color: #3a3a3a;
		font-weight:500;
	}
</style>
