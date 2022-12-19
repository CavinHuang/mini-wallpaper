import { AuthMenu } from '@/api/modules'
import { isArray } from '@/utils/is'

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
  window.localStorage.clear()
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export function deepCopy<T>(obj: any): T {
  let newObj: any
  try {
    newObj = obj.push ? [] : {}
  } catch (error) {
    newObj = {}
  }
  for (let attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepCopy(obj[attr])
    } else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max)
  return num
}

/**
 * @description 获取当前时间
 * @return string
 */
export function getTimeState() {
  // 获取当前时间
  let timeNow = new Date()
  // 获取当前小时
  let hours = timeNow.getHours()
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) return '早上好 ⛅'
  if (hours >= 10 && hours <= 14) return '中午好 🌞'
  if (hours >= 14 && hours <= 18) return '下午好 🌞'
  if (hours >= 18 && hours <= 24) return '晚上好 🌛'
  if (hours >= 0 && hours <= 6) return '凌晨好 🌛'
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let defaultBrowserLang = ''
  if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
    defaultBrowserLang = 'zh'
  } else {
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
}

/**
 * @description 递归查询当前路由所对应的路由
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前地址
 * @return array
 */
export function getTabPane<T, U>(menuList: any[], path: U): T {
  let result: any
  for (let item of menuList || []) {
    if (item.path === path) result = item
    const res = getTabPane(item.children, path)
    if (res) result = res
  }
  return result
}

/**
 * 使用递归处理路由菜单
 * @param routerList
 * @returns
 */
export function handleRouter(routerList: AuthMenu.Item[]): [string[], AuthMenu.Item[]] {
  const routers: string[] = []

  function filter(routerList: AuthMenu.Item[]) {
    const _menuData: AuthMenu.Item[] = []
    routerList.forEach((item) => {
      if (typeof item === 'object' && item.path && item.auth_type === 1) {
        routers.push(item.path)
        if (!item.hidden) {
          const _tmp: AuthMenu.Item = { ...item, children: undefined }
          if (item.children && item.children.length) {
            const _itemChildrenMenuData = filter(item.children)
            _tmp.children = _itemChildrenMenuData.length ? _itemChildrenMenuData : undefined
          }
          _menuData.push(_tmp)
        }
      }
    })
    return _menuData
  }

  const menuData = filter(routerList)

  return [routers, menuData]
}

/**
 * @description 扁平化数组对象
 * @param {Array} arr 数组对象
 * @return array
 */
export function getFlatArr(arr: any) {
  return arr.reduce((pre: any, current: any) => {
    let flatArr = [...pre, current]
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
    return flatArr
  }, [])
}

/**
 * @description 格式化表格单元格默认值
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
  return callValue ?? '--'
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
  return callValue ?? '--'
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(callValue: any, enumData: any, searchProps?: { [key: string]: any }, type?: string): string {
  const value = searchProps?.value ?? 'value'
  const label = searchProps?.label ?? 'label'
  let filterData: any = {}
  if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue)
  if (type == 'tag') return filterData?.tagType ? filterData.tagType : ''
  return filterData ? filterData[label] : '--'
}

/**
 * 生成uuid
 * @returns
 */
export function uuid() {
  let s: any[] = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  let uuid = s.join('')
  return uuid
}

/**
 * 从html中找出所有的img
 * @param htmlStr
 * @returns
 */
export function findAllImg(htmlStr: string) {
  // 获取所有匹配的img元素
  // 这里只关心拿到<img>的整个标签，所以用非贪婪模式找到最近的关闭标签 >
  const imgStrs = htmlStr.match(/<img.*?>/g)

  // 获取每个img url
  if (imgStrs) {
    let urls = imgStrs
      .map((url) => {
        const res = url.match(/\ssrc=['"](.*?)['"]/)
        return res ? res[1] : null
      })
      .filter((item) => item)
    return urls as string[]
  }
  return []
}
