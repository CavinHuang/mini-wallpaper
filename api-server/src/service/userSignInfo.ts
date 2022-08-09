import { M } from '@/models';
import { UserSignInfo } from '@/models/entity/userSignInfo';
import { afterOneDay, datesAreOnSameDay, todayTimestamp } from '@/utils';
import { In } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class UserSignInfoService {

  public static async saveInfo(data: Partial<UserSignInfo>) {
    const model = M(UserSignInfo)
    const raw = model.create(data)
    return await model.save(raw)
  }

  public static async doSign(uid: number) {
    const model = M(UserSignInfo)
    // 1、判断是否是连续签到
    const allData = await model.find({
      where: {
        uid, status: 1
      }
    })

    if (allData.length >= 7) {
      await model.createQueryBuilder().update(UserSignInfo).set({ status: 2 }).where('uid = :uid', { uid }).execute()
    }

    const lastDate = allData.length ? new Date(allData[allData.length - 1].last_sign_date) : null
    const lastDateAfter = afterOneDay(lastDate)
    // 2、根据判断是否要更新数据表
    console.log(lastDateAfter, new Date(), datesAreOnSameDay(new Date(), lastDateAfter))
    if (!datesAreOnSameDay(new Date(), lastDateAfter) && allData.length) {
      const ids = allData.map(item => item.id)
      await model.createQueryBuilder().update(UserSignInfo).set({ status: 2 }).where('id IN (:...ids)', { ids: ids }).execute()
    }

    // 3、记录一条新的
    await UserSignInfoService.saveInfo({
      uid,
      last_sign_date: new Date(),
      create_at: new Date(),
      status: 1
    })
    const { days, n } = await UserSignInfoService.nowSignInfo(uid)

    return {
      days, n
    }
  }

  public static async nowSignInfo(uid: number) {
    const model = M(UserSignInfo)
    const allData = await model.find({
      where: {
        uid,
        status: 1
      }
    })
    const date = todayTimestamp()
    const lastSignDatas = allData.map(item => {
      const _item = todayTimestamp(new Date(item.last_sign_date))
      return _item
    })
    //今天是本轮签到的第几天
	  const n = (date - Math.min(...lastSignDatas)) / 3600 / 24 / 1000 + 1
    //换成数字--第几天
    let days = allData.map(item => {
      const _date = todayTimestamp(new Date(item.last_sign_date))
      return (n * 10000 - (date - _date) / 3600 / 24 / 1000 * 10000) / 10000 - 1
    })

    return {
      allData,
      days,
      n
    }
  }
}