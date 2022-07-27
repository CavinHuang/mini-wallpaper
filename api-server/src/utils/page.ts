/** 处理返回的分页数据 */
export const handlePaging = (nowPage, pageSize, result) => {
  const obj: any = {}
  obj.nowPage = +nowPage
  obj.pageSize = +pageSize
  obj.hasMore = obj.nowPage * obj.pageSize - result.count < 0
  obj.total = result.count
  return { ...obj, ...result, count: undefined }
}
