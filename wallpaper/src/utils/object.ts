import { isArray } from './is'

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export function deepMerge(...args: any[]) {
  const result: Record<string | number, any> = {}
  function assignValue(val: any, key: string | number) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val)
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val)
    } else {
      result[key] = val
    }
  }
  for (let i = 0, l = args.length; i < l; i++) {
    // eslint-disable-next-line no-use-before-define
    forEach(args[i], assignValue)
  }
  return result
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
export function forEach<T>(
  obj: Array<T>,
  // eslint-disable-next-line no-unused-vars, no-shadow
  fn: (item: T, index: number | string, obj: Array<T>) => void
) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj]
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // Iterate over object keys
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}
