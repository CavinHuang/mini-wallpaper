/**
 * user model
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: '小程序用户openid'
  })
  openid: string

  @Column({
    comment: '父级pid',
    type: 'int',
    default: 0
  })
  pid: number

  @Column({
    comment: '所属组',
    type: 'int',
    default: 1
  })
  group_id: number

  @Column({
    length: 200,
    comment: '用户名'
  })
  username: string

  @Column({
    length: 200,
    comment: '用户手机号'
  })
  mobile: string

  @Column({
    comment: '积分'
  })
  score: number

  @Column({
    length: 200,
    comment: '用户昵称'
  })
  nickname: string

  @Column({
    length: 500,
    comment: '用户头像'
  })
  avatar: string

  @Column({
    type: 'tinyint',
    comment: '性别   0 男  1  女  2 人妖'
  })
  gender: number

  @Column({
    length: 40,
    comment: '所在国家'
  })
  country: string

  @Column({
    length: 40,
    comment: '省份'
  })
  province: string

  @Column({
    length: 40,
    comment: '城市'
  })
  city: string

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
