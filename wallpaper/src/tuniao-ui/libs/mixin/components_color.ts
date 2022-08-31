import { ComponentOptionsMixin } from 'vue'
import color from '../function/color'
import string from '../function/string'

export default {
  data() {
    
  },
  props: {
    // 背景颜色
    backgroundColor: {
      type: String,
      default: ''
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: ''
    },
    // 字体大小
    fontSize: {
      type: Number,
      default: 0
    },
    // 字体大小单位
    fontUnit: {
      type: String,
      default: 'rpx'
    }
  },
  computed: {
    backgroundColorStyle() {
      return color.getBackgroundColorStyle(this.backgroundColor)
    },
    backgroundColorClass() {
      return color.getBackgroundColorInternalClass(this.backgroundColor)
    },
    fontColorStyle() {
      return color.getFontColorStyle(this.fontColor)
    },
    fontColorClass() {
      return color.getFontColorInternalClass(this.fontColor)
    },
    fontSizeStyle() {
      return string.getLengthUnitValue(this.fontSize, this.fontUnit)
    }
  },
  methods: {
    
  }
} as ComponentOptionsMixin