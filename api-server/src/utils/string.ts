import * as crypto from 'crypto';

/**
 * 驼峰转
 * @param name
 * @returns
 */
export function camelToUnderline(camelStr, division = '_') {
  return camelStr
    .replace(/\s*/g, '')
    .replace(/[A-Z]/g, function (s) {
      return ' ' + s.toLowerCase()
    })
    .trim()
    .replace(/ /g, division)
}

/**
 * generate a lightweight 32 bit random id, enough for ioc container
 */
export function generateRandomId(): string {
  // => f9b327e70bbcf42494ccb28b2d98e00e
  return crypto.randomBytes(16).toString('hex');
}