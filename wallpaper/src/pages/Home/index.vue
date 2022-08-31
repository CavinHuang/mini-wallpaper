import { ref } from 'vue';
<template>
  <view class="page-container">
    <view class="home-swiper">
      <tn-swiper :list="list" indicatorPosition="bottomRight"></tn-swiper>
    </view>

    <view class="tn-flex tn-margin-sm">
        <view class="tn-flex-1 tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-orange--light tn-color-orange">
              <view class="tn-icon-moon-fill tn-three"></view>
            </view>  
            <view class="tn-color-white tn-text-center">
              <text class="tn-text-ellipsis">高清壁纸</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-purple--light tn-color-purple">
              <view class="tn-icon-light-fill tn-three"></view>
            </view>  
            <view class="tn-color-white tn-text-center">
              <text class="tn-text-ellipsis">热门排行</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-indigo--light tn-color-indigo">
              <view class="tn-icon-star-fill tn-three"></view>
            </view>  
            <view class="tn-color-white tn-text-center">
              <text class="tn-text-ellipsis">文艺可爱</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-purplered--light tn-color-purplered">
              <view class="tn-icon-like-fill tn-three"></view>
            </view>  
            <view class="tn-color-white tn-text-center">
              <text class="tn-text-ellipsis">精选壁纸</text>
            </view>
          </view>
        </view>
    </view>

    <tn-button>ssss</tn-button>

    <view class="tn-flex tn-flex-wrap tn-margin-xs">
      <block v-for="(item, index) in pics" :key="index">
        <view class=" " style="width: 50%;">
          <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.image + ')'">
            <view class="image-wallpaper">
            </view>
          </view>  
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface INav {
  title: string;
  slug: string;
  bgImage: string;
  bgColor: string;
}

const list = ref([
  {image: 'https://lhsk.demo.hongcd.com/uploads/20220727/ea3838d155328fa2583f5a538b66ae59.jpg'},
  {image: 'https://lhsk.demo.hongcd.com/uploads/20210304/e522390a2607d8f7a92c7196f0fe2d9b.jpg'},
  {image: 'https://lhsk.demo.hongcd.com/uploads/20220727/74f418b81146eb2d22540d2d95efd0f7.jpg'}
])

const pics = ref([
  {image: 'https://lhsk.demo.hongcd.com/uploads/20220727/ea3838d155328fa2583f5a538b66ae59.jpg'},
  {image: 'https://lhsk.demo.hongcd.com/uploads/20210304/e522390a2607d8f7a92c7196f0fe2d9b.jpg'},
  {image: 'https://lhsk.demo.hongcd.com/uploads/20220727/74f418b81146eb2d22540d2d95efd0f7.jpg'}
])

const homeNav = [
  { title: '收藏榜', slug: 'Collection', bgImage: '', bgColor: '' },
  { title: '热门榜', slug: 'TOP', bgImage: '', bgColor: '' },
  { title: '点赞榜', slug: 'Likes', bgImage: '', bgColor: '' }
]

/**
 * 设置榜单样式
 * @param item 
 */
const setNavItemStyle = (item: INav) => {
  const style:Partial<Record<'backgroundImage' | 'backgroundColor', string>> = {}
  if (item.bgImage) {
    style.backgroundImage = `url('${item.bgImage}') no-repeat top right`
  }

  if (item.bgColor) {
    style.backgroundColor = item.bgColor
  }

  return style
}
</script>

<style lang="scss" scoped>
@import './custom_nav_bar.scss';
.custom-nav {
  height: 100%;
  
  &__back {
    margin: auto 5rpx;
    font-size: 40rpx;
    margin-right: 10rpx;
    margin-left: 30rpx;
    flex-basis: 5%;
  }
  
  &__search {
    flex-basis: 70%;
    width: 100%;
    height: 100%;
    
    &__box {
      width: 100%;
      height: 70%;
      padding: 10rpx 0;
      margin: 0 30rpx;
    }
    
    &__icon {
      padding-right: 10rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
    }
    
    &__text {
      color: #AAAAAA;
    }
  }
}
.icon12 {
  &__item {
    width: 30%;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;
    
    &--icon {
      width: 100rpx;
      height: 100rpx;
      font-size: 60rpx;
      border-radius: 50%;
      margin-bottom: 18rpx;
      position: relative;
      z-index: 1;
      
      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;
        background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg.png);

          
      }
    }
  }
}
</style>
