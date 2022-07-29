<template>
	<view class="pd16_15">
		<view>
			<text class="ft16 mb10" style="color: #666;line-height: 100upx; padding-left: 10upx;">请选择分类</text>
		</view>
		<view>
			<block v-for="(value,key) in configfenlei" :key="key">
			<text class="ft16 mb10 dfhgvb"  @click="opda(value.id)" :style="tyid==value.id?'background:#00C657; color: #ffffff; box-shadow: 0px 4px 16px -4px rgba(0, 198, 87, 0.3);':''" >{{value.name}}</text>
			</block>
		</view>>
		<view>
			<text class="ft16 mb10" style="color: #666;line-height: 100upx; padding-left: 10upx;">请选择图片上传</text>
		</view>
			<easy-upload
			        :dataList="imageList" 
					:uploadfiles="uploadfiles" 
			        types="image"
					isImmediate="true"
					uploadMaxCount="9"
			        :uploadUrl="uploadUrl" 
			        :deleteUrl="deleteUrl" 
			        @onUploadSuccess="successFails" 
			        @onDelSuccess="deleteFails"
			    >
			        <!-- <template v-slot:uploadBtn>
			            <view class="upload-btn">上传</view>
			        </template> -->
			    </easy-upload>
		<view class="mt16">
			<button class="btn-big mb10" @click="tjtp()" :style="isSubmit ? getBtnStyle : getBtnStyle">立即提交</button>
		</view>
		<view class="mt16">
			<button class="btn-big" @click="tougaojl()" :style="isSubmit ? getBtnDisStyle : getBtnDisStyle">投稿记录</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				name:'',
				tags:[],
				uploadUrl:'',
				deleteUrl:'',
				imageList: [],
				imageLists: [],
				uploadfiles:1,
				configfenlei:[],
				tyid:0,
			}
		},
		computed:{
			isSubmit(){
				if(this.imageLists.length>0){
					return true;
				}else{
					return false;
				}
			}
		},
		onLoad(){
			this.uploadUrl=this.configs.webUrl+'/api/user/upload?token='+uni.getStorageSync("userinfo").token
			this.deleteUrl=this.configs.webUrl+'/api/user/deleteUrl?token='+uni.getStorageSync("userinfo").token
			this.configfenlei=uni.getStorageSync("config").fenlei
		},
		
		methods:{
			opda(tyid){
				this.tyid=tyid
			},
			successFails(list){
			        console.log(list)
			        const res = list.map(item => {
			             return item;
			        });
			        this.imageLists = [...this.imageLists, ...res];
			        // uni.showModal({
			        //     content : '上传成功'
			        // });
			    },
			    deleteFails(e){
			        console.log(e)
			        const { data, index} = e;
			        this.imageLists.splice(index,1)
			        // uni.showModal({
			        //     content: "删除成功",
			        //     showCancel: true
			        // });
			    },
			changeTag(e){
				let index = parseInt(e.currentTarget.dataset.index);
				this.tags[index].select = this.tags[index].select == 1 ? 0 : 1;
			},
			tougaojl(){
				uni.navigateTo({
					url:'/pages/client/member/tougaojl'
				})
			},
			tjtp(){
				var this_=this
				let data = {};
				// if(!this.name){
				// 	uni.showModal({
				// 	    content : '请填写标题'
				// 	});
				// 	return
				// }
				if(this.tyid==0){
					uni.showModal({
					    content : '请选择分类'
					});
					return
				}
				if(this.imageLists.length<=0){
					uni.showModal({
					    content : '请填上传图片'
					});
					return
				}
				var lists=this.imageLists
				var pic=''
				var img=''
				const res = lists.map(item => {
					if(pic){
						pic=pic+','+item;
					}else{
						pic=item
						img=item
					} 
				});
				
				data.img=img
				data.type=this.tyid
				//data.name=this.name
				data.pic=pic
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougao',
					data: data,
					success: res =>{
						if(res.data.code==1){
							uni.showModal({
								title: '温馨提示',
								content: res.data.msg,
								showCancel: false,
								confirmText: "确定",
								success: function (res) {
									if (res.confirm) {
										this_.imageList=[]
										this_.imageLists=[]
										this_.uploadfiles=2
										this_.tougaojl()
									} else if (res.cancel) {
										
									}
								}
							});
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});	
			}
		}
	}
</script>

<style>
	.dfhgvb{
		background:#eee;
		color: #353535;
		padding: 8rpx 15rpx;
		border-radius: 8rpx;
		margin:10rpx 8rpx;
		display: inline-block;
	}
	.tag-feedback{
		height: 64rpx;
		border:2rpx solid #E4E6ED;
		padding: 0 20rpx;
		line-height: 60rpx;
		color:#000000;
		font-size: 28rpx;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.tag-feedback.on{
		border:none;
		color:#FFFFFF;
		line-height: 64rpx;
		padding: 0 22rpx;
	}
	.list {
	  display: flex;
	  flex-direction: column;
	  padding: 0rpx;
	}
	
	.list-call {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	  height: 100rpx;
	  color: #333333;
	  border-bottom: 0.5px solid #e2e2e2;
	}
	
	.list-call .img {
	  width: 40rpx;
	  height: 40rpx;
	}
	
	.list-call .sl-input {
	  flex: 1;
	  text-align: left;
	  font-size: 32rpx;
	  margin-left: 16rpx;
	}
</style>