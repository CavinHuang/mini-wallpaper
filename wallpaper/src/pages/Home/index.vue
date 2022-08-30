import { ref } from 'vue';
<template>
  <view class="page-container">
    <view class="home-swiper">
      <tn-swiper :list="list" indicatorPosition="bottomRight"></tn-swiper>
    </view>

    <view class="home-nav">
      <tn-grid align="center" hoverClass="tn-hover" :col="3">
          <block v-for="(item, index) in homeNav" :key="index">
            <tn-grid-item>
              <view class="home-nav-item" :style="setNavItemStyle(item)">
                <view class="nav-title">{{ item.title }}</view>
                <view class="nav-slug">{{ item.slug }}</view>
              </view>
            </tn-grid-item>
          </block>
      </tn-grid>
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
