<template>
  <view class="tn-swiper__wrap-class tn-swiper__wrap" :style="{borderRadius: `${radius}rpx`}">
    <!-- 轮播图 -->
    <swiper
      class="tn-swiper"
      :class="[backgroundColorClass]"
      :style="[swiperStyle]"
      :current="current"
      :interval="interval"
      :circular="circular"
      :autoplay="autoplay"
      :duration="duration"
      :previous-margin="effect3d ? effect3dPreviousSpacing + 'rpx' : '0'"
      :next-margin="effect3d ? effect3dPreviousSpacing + 'rpx' : '0'"
      @change="change"
    >
      <swiper-item
        v-for="(item, index) in list"
        :key="index"
        class="tn-swiper__item"
      >
        <view
          class="tn-swiper__item__image__wrap"
          :class="[swiperIndex !== index ? 'tn-swiper__item__image--scale' : '']"
          :style="{
            borderRadius: `${radius}rpx`,
            transform: effect3d && swiperIndex !== index ? 'scaleY(0.9)' : 'scaleY(1)',
            margin: effect3d && swiperIndex !== index ? '0 20rpx' : 0
          }"
          @click="click(index)"
        >
          <image class="tn-swiper__item__image" :src="item[name] || item" :mode="imageMode"></image>
          <view
            v-if="title && item[titleName]"
            class="tn-swiper__item__title tn-text-ellipsis"
            :style="[titleStyle]">
            {{ item[titleName] }}
          </view>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- 指示点 -->
    <view class="tn-swiper__indicator" :style="([indicatorStyle] as any)">
      <block v-if="mode === 'rect'">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="tn-swiper__indicator__rect"
          :class="{'tn-swiper__indicator__rect--active': swiperIndex === index}"
        ></view>
      </block>
      <block v-if="mode === 'dot'">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="tn-swiper__indicator__dot"
          :class="{'tn-swiper__indicator__dot--active': swiperIndex === index}"
        ></view>
      </block>
      <block v-if="mode === 'round'">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="tn-swiper__indicator__round"
          :class="{'tn-swiper__indicator__round--active': swiperIndex === index}"
        ></view>
      </block>
      <block v-if="mode === 'number'">
        <view class="tn-swiper__indicator__number">{{ swiperIndex + 1 }}/{{ list.length }}</view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
  import { ComponentOptions, CSSProperties } from 'vue'
  import color from '../../libs/function/color'
  export default {
    name: 'tn-swiper',
    props: {
      // 轮播图列表数据
      // [{image: xxx.jpg, title: 'xxxx'}]
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 初始化时，默认显示第几项
      current: {
        type: Number,
        default: 0
      },
      // 高度
      height: {
        type: Number,
        default: 250
      },
      // 背景颜色
      backgroundColor: {
        type: String,
        default: 'transparent'
      },
      // 图片的属性名
      name: {
        type: String,
        default: 'image'
      },
      // 是否显示标题
      title: {
        type: Boolean,
        default: false
      },
      // 标题的属性名
      titleName: {
        type: String,
        default: 'title'
      },
      // 用户自定义标题样式
      titleStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 圆角的值
      radius: {
        type: Number,
        default: 8
      },
      // 指示器模式
      // rect -> 方形 round -> 圆角方形 dot -> 点 number -> 轮播图下标
      mode: {
        type: String,
        default: 'round'
      },
      // 指示器位置
      // topLeft \ topCenter \ topRight \ bottomLeft \ bottomCenter \ bottomRight
      indicatorPosition: {
        type: String,
        default: 'bottomCenter'
      },
      // 开启3D缩放效果
      effect3d: {
        type: Boolean,
        default: false
      },
      // 在3D缩放模式下，item之间的间隔
      effect3dPreviousSpacing: {
        type: Number,
        default: 50
      },
      // 自定播放
      autoplay: {
        type: Boolean,
        default: true
      },
      // 图片之间播放间隔多久
      interval: {
        type: Number,
        default: 3000
      },
      // 轮播间隔时间
      duration: {
        type: Number,
        default: 500
      },
      // 是否衔接滑动
      circular: {
        type: Boolean,
        default: true
      },
      // 图片裁剪模式
      imageMode: {
        type: String,
        default: 'aspectFill'
      }
    },
    computed: {
      backgroundColorStyle() {
        return color.getBackgroundColorStyle(this.backgroundColor)
      },
      backgroundColorClass() {
        return color.getBackgroundColorInternalClass(this.backgroundColor)
      },
      swiperStyle() {
        let style: any = {}
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        if (this.height) {
          style.height = this.height + 'rpx'
        }
        return style
      },
      indicatorStyle() {
        let style: CSSProperties = {}
        if (this.indicatorPosition === 'topLeft' || this.indicatorPosition === 'bottomLeft') style.justifyContent = 'flex-start'
        if (this.indicatorPosition === 'topCenter' || this.indicatorPosition === 'bottomCenter') style.justifyContent =  'center'
        if (this.indicatorPosition === 'topRight' || this.indicatorPosition === 'bottomRight') style.justifyContent =  'flex-end'
        if (['topLeft','topCenter','topRight'].indexOf(this.indicatorPosition) >= 0) {
          style.top = '12rpx'
          style.bottom = 'auto'
        } else {
          style.top = 'auto'
          style.bottom = '12rpx'
        }
        style.padding = `0 ${this.effect3d ? '74rpx' : '24rpx'}`
        
        return style
      },
      swiperTitleStyle() {
        let style: any = {}
        if (this.mode === 'none' || this.mode === '') style.paddingBottom = '12rpx'
        if (['bottomLeft','bottomCenter','bottomRight'].indexOf(this.indicatorPosition) >= 0 && this.mode === 'number') {
          style.paddingBottom = '60rpx'
        } else if (['bottomLeft','bottomCenter','bottomRight'].indexOf(this.indicatorPosition) >= 0 && this.mode !== 'number') {
          style.paddingBottom = '40rpx'
        } else {
          style.paddingBottom = '12rpx'
        }
        
        style = Object.assign(style, this.titleStyle)
        return style
      }
    },
    data() {
      return {
        // 当前显示的item的index
        swiperIndex: this.current
      }
    },
    watch: {
      list(newVal, oldVal) {
        console.log("🚀 ~ file: tn-swiper.vue ~ line 234 ~ list ~ list", newVal)
        // 如果修改了list的数据，重置current的值
        if (newVal.length !== oldVal.length) this.swiperIndex = 0
      },
      current(value) {
        // 监听外部current的变化，实时修改内部依赖于此测swiperIndex值，如果更新了current，而不是更新swiperIndex，就会错乱，因为指示器是依赖于swiperIndex的
        this.swiperIndex = value
      }
    },
    methods: {
      click(index: number) {
        this.$emit('click', index)
      },
      // 图片自动切换时触发
      change(event: any) {
        const current = event.detail.current
        this.swiperIndex = current
        this.$emit('change', current)
      }
    }
  }  as ComponentOptions
</script>

<style lang="scss" scoped>
  
  .tn-swiper {
    
    &__wrap {
      position: relative;
      overflow: hidden;
      transform: translateY(0);
    }
    
    &__item {
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow: hidden;
      
      &__image {
        width: 100%;
        height: 100%;
        will-change: transform;
        display: block;
        /* #ifdef H5 */
        pointer-events: none;
        /* #endif */
        
        &__wrap {
          width: 100%;
          height: 100%;
          flex: 1;
          transition: all 0.5s;
          overflow: hidden;
          box-sizing: content-box;
          position: relative;
        }
        
        &--scale {
          transform-origin: center center;
        }
      }
      
      &__title {
        width: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
        bottom: 0;
        left: 0;
        font-size: 28rpx;
        padding: 12rpx 24rpx;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    
    &__indicator {
      padding: 0 24rpx;
      position: absolute;
      display: flex;
      flex-direction: row;
      width: 100%;
      z-index: 1;
      
      &__rect {
        width: 26rpx;
        height: 8rpx;
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 0.5s;
        
        &--active {
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
      
      &__dot {
        width: 14rpx;
        height: 14rpx;
        margin: 0 6rpx;
        border-radius: 20rpx;
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 0.5s;
        
        &--active {
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
      
      &__round {
        width: 14rpx;
        height: 14rpx;
        margin: 0 6rpx;
        border-radius: 20rpx;
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 0.5s;
        
        &--active {
          width: 34rpx;
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
      
      &__number {
        padding: 6rpx 16rpx;
        line-height: 1;
        background-color: rgba(0, 0, 0, 0.3);
        color: rgba(255, 255, 255, 0.8);
        border-radius: 100rpx;
        font-size: 26rpx;
      }
    }
  }
</style>
