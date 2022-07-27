import { CoreController } from '../CoreController'
import { User } from '../../models/entity/user'
import { M } from '../../models'
import { Pagination } from '../../core/pagination/Pagination'

interface IParmas {
  username?: string
  gender?: string
  pageNum: number
  pageSize: number
}

export default class UserList extends CoreController {
  public method: string = 'post'

  public async handle(raw: IParmas) {
    const user = M(User)
    const { pageNum = 1, pageSize = 10, username, gender } = raw

    let query = user.createQueryBuilder('').where('1 = 1')

    if (username) {
      query = query.andWhere('user.username = :username', { username })
    }

    if (gender) {
      query.andWhere('user.gender = :gender', { gender })
    }

    const result = await Pagination.findByPage(query, { pageNum, pageSize })

    return this.success(result, '成功')
  }
}
