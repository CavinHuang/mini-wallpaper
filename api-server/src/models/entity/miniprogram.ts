/**
 * user model
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MiniProgram {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序名称'
  })
  name: string

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: '小程序appSecret'
  })
  appsecret: string

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: number

  @Column({
    type: 'datetime'
  })
  create_at: Date
}
