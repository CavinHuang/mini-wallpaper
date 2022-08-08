/**
 * user model
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
    comment: '最后签到的时间'
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
