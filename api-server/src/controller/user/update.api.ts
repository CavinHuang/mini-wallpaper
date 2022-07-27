import bcrypt from 'bcrypt'

import { CoreController } from '../CoreController'
import { User } from '../../models/entity/user'
import { M } from '../../models'

interface IParmas {
  id: number
  username: string
  gender: number
  email: string
  status: number
}

export default class UserUpdate extends CoreController {
  public method: string = 'post'

  constructor() {
    super()
  }

  public async handle(raw: IParmas) {
    const user = M(User)
    const result = await user.findOne({
      where: {
        id: raw.id
      }
    })

    if (!result) {
      return this.error('用户不存在')
    }

    try {
      const res = user.create(raw)
      const result = await user.save(res)

      return this.success(true, '成功!')
    } catch (e) {
      return this.error('更新失败，请重试!')
    }
  }
}
