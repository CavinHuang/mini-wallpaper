/**
 * user model
 */

import { Repo } from '@/core/decorator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Repo('UserSignInfo')
@Entity()
export class UserSignInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: 'user id',
    type: 'int',
    default: 0
  })
  uid: number

  @Column({
    comment: '本轮签到几天',
    default: 0
  })
  sign_this_max: number

  @Column({
    comment: '最大签到天数',
    default: 0
  })
  sign_max: number

  @Column({
    comment: '总签到天数',
    default: 0
  })
  sign_num: number

  @Column({
    comment: '最后签到的时间',
    nullable: true
  })
  last_sign_date: Date

  @Column({
    comment: '状态 1 正常 2 本轮结束'
  })
  status: number

  @Column({
    type: 'datetime'
  })
  create_at: Date
}
