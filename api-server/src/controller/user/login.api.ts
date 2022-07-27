import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

import { CoreController } from '../CoreController'
import { User } from '../../models/entity/user'
import { M } from '../../models'
import { secret } from '../../config'

interface LoginParmas {
  username: string
  password: string
}

export default class UserLogin extends CoreController {
  public method: string = 'post'

  public async handle(raw: LoginParmas) {
    const user = M(User)

    const result = await user.findOne({
      where: {
        username: raw.username
      }
    })

    if (!result) {
      return this.error('用户名错误!')
    }

    if (await bcrypt.compare(raw.password, result.password)) {
      return this.success(
        {
          user: result,
          token: jsonwebtoken.sign(
            {
              data: result,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
            },
            secret
          )
        },
        '登录成功!'
      )
    } else {
      return this.error('密码错误!')
    }
  }
}
