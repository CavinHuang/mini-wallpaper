/**
 * @desc 根据对象数组中的指定属性进行数组元素排序
 * @param objArr 要进行排序操作的对象数组
 * @param attribute 排序属性
 * @param orderFlag 方式标识,true 为正序 false 为倒序 默认为 true
 * @returns 完成排序后的数组
 */
export function objectArraySortByAtr<T>(objArr: T[], attribute: string | number, orderFlag = true) {
  function compare(key,sortFlag) {
    let sortFlagRes;
    if(sortFlag){
      sortFlagRes=1;
    } else{
      sortFlagRes = sortFlag?1:-1;
    }
    return function(value1, value2) {
      const val1 = value1[key];
      const val2 = value2[key];
      if(val1<val2){
        return sortFlagRes*-1;
      }
      if(val1>val2){
        return sortFlagRes*1;
      }
      return 0;
    };
  }
  return objArr.sort(compare(`${attribute}`,orderFlag));
}
