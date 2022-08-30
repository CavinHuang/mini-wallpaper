/**
 * is 判断
 */
const originToString = Object.prototype.toString

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val: any) {
  return originToString.call(val) === '[object Array]'
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val: any) {
  return val !== null && typeof val === 'object'
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function isDate(val: any) {
  return originToString.call(val) === '[object Date]'
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
export function isURLSearchParams(val: any) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * 是否为boolean 值
 * @param val
 * @returns {boolean}
 */
export function isBoolean(val: any) {
  return typeof val === 'boolean'
}

/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否是undefined
 * @param val
 * @returns
 */
export function isUndefined(val: any) {
  return typeof val === 'undefined'
}
