export * from './logger'
export * from './page'
export * from './string'
export * from './time'
export * from './number'
export * from './is'
export * from './array'
export * from './camelCase'

export function merge(target: any, src: any) {
  if (!target) {
    target = src;
    src = null;
  }
  if (!target) {
    return null;
  }
  if (Array.isArray(target)) {
    return target.concat(src || []);
  }
  if (typeof target === 'object') {
    return Object.assign({}, target, src);
  }
  throw new Error('can not merge meta that type of ' + typeof target);
}