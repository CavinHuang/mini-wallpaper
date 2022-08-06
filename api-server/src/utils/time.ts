export function createdTime() {
  var now = new Date()
  let year: number | string = now.getFullYear()  //得到年份
  let month: number | string = now.getMonth()    //得到月份
  let date: number | string = now.getDate()      //得到日期
  let day: number | string = now.getDay()        //得到周几
  let hour: number | string = now.getHours()     //得到小时
  let minu: number | string = now.getMinutes()   //得到分钟
  let sec: number | string = now.getSeconds()    //得到秒
  var MS: number | string = now.getMilliseconds()//获取毫秒
  let week
  month = month + 1
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  if (hour < 10) hour = '0' + hour
  if (minu < 10) minu = '0' + minu
  if (sec < 10) sec = '0' + sec
  if (MS < 100) MS = '0' + MS
  let arr_week = new Array(
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  )
  week = arr_week[day]
  let time = `${year}年${month}月${date}日${' '}${hour}${':'}${minu}${':'}${sec}${' '}${week}`
  let timeOne = `${year}-${month}-${date}${' '}${hour}${':'}${minu}${':'}${sec}${' '}${week}`
  let timeTwo = `${year}-${month}-${date}${' '}${hour}${':'}${minu}${':'}${sec}`
  let presenTdate = `${year}-${month}-${date}`
  let data = {
    time: time,
    timeOne: timeOne,
    timeTwo: timeTwo,
    now: new Date(now).getTime(),
    presenTdate: presenTdate
  }
  return data
}

export function formatDate(now) {
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()
  let MS = now.getMilliseconds() //获取毫秒
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  if (hour < 10) hour = '0' + hour
  if (minute < 10) minute = '0' + minute
  if (second < 10) second = '0' + second
  let time =
    year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  let timeOne = year + '-' + month + '-' + date
  let data = { time, timeOne }
  return data
}

export const afterOneDay = (date?: Date) => {
  //获取时间戳
  if (!date) {
    date = new Date()
   }
  const Time = date.getTime();//当前的毫秒数
  const oneDay = 1000*60*60*24;//一天的毫秒数

  const after = Time + oneDay;//计算后一天的毫秒数
  date.setTime(after);

  return date
}

export const beforeOneDay = (date?: Date) => {
  //获取时间戳
  if (!date) {
    date = new Date()
   }
  const Time = date.getTime();//当前的毫秒数
  const oneDay = 1000*60*60*24;//一天的毫秒数

  const after = Time - oneDay;//计算后一天的毫秒数
  date.setTime(after);

  return date
}

export const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()