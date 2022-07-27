import bcrypt from 'bcrypt'

import { CoreController } from '../CoreController'
import { User } from '../../models/entity/user'
import { M } from '../../models'

interface IParmas {
  id: number
  username: string
  password: string
  confirm_password: string
}

export default class UserRestPassword extends CoreController {
  public method: string = 'post'

  constructor() {
    super()
  }

  public async handle(raw: IParmas) {
    const user = M(User)

    if (raw.confirm_password !== raw.password) {
      return this.error('两次密码不一致')
    }
    const result = await user.findOne({
      where: {
        id: raw.id
      }
    })

    if (!result) {
      return this.error('用户不存在')
    }
    raw.password = await bcrypt.hash(raw.password, 5)

    try {
      const res = user.create(raw)
      const result = await user.save(res)

      return this.success(true, '成功!')
    } catch (e) {
      return this.error('更新失败，请重试!')
    }
  }
}
