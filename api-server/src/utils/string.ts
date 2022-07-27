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
