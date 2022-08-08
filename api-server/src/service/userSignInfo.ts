import { M } from '@/models';
import { UserSignInfo } from '@/models/entity/userSignInfo';

export class UserSignInfoService {

  public static async saveInfo(data: Partial<UserSignInfo>) {
    const model = M(UserSignInfo)

    const raw = model.create(data)

    return await model.save(raw)
  }

  public static async nowSignInfo(uid: number) {
    const model = M(UserSignInfo)
    const allData = await model.find({
      where: {
        uid,
        status: 1
      }
    })
    const date = new Date().getTime()
    const lastSignDatas = allData.map(item => (new Date(item.last_sign_date)).getTime())

    //今天是本轮签到的第几天
	  const n = (date - Math.min(...lastSignDatas)) / 3600 / 24 / 1000 + 1
    //换成数字--第几天
    let days = allData.map(item => {
      return (n * 10000 - (date - (new Date(item.last_sign_date).getTime())) / 3600 / 24 / 1000 * 10000) / 10000 - 1
    })

    return days
  }
}