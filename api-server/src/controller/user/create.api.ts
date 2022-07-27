import bcrypt from 'bcrypt'

import { CoreController } from '../CoreController'
import { User } from '../../models/entity/user'
import { M } from '../../models'

interface CreateParmas {
  username: string
  password: string
  gender: number
  email: string
  status: number
  confirm_password: string
}

export default class UserCreate extends CoreController {
  public method: string = 'post'

  constructor() {
    super()
  }

  public async handle(raw: CreateParmas) {
    if (!raw.username || !raw.password) {
      return this.error('缺少用户名或者密码！')
    }

    if (raw.confirm_password !== raw.password) {
      return this.error('两次密码不一致')
    }

    raw.password = await bcrypt.hash(raw.password, 5)

    const user = M(User)
    const result = await user.findOne({
      where: {
        username: raw.username
      }
    })

    if (!result) {
      const UserInstance = new User()
      UserInstance.gender = raw.gender
      UserInstance.email = raw.email
      UserInstance.username = raw.username
      UserInstance.password = raw.password
      UserInstance.status = 1
      UserInstance.create_at = new Date()

      const userRes = await user.save(UserInstance)

      if (userRes) {
        return this.success({ id: userRes.id }, '创建用户成功!')
      }
    }

    return this.error('用户已经存在!')
  }
}
