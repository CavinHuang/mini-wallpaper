/**
 * user model
 */

import { Repo } from '@/core/decorator'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user';

@Repo('UserProfile')
@Entity()
export class UserProfile {
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
    length: 200,
    comment: '用户昵称',
    default: ''
  })
  nickname: string

  @Column({
    length: 500,
    comment: '用户头像',
    default: ''
  })
  avatar: string

  @Column({
    type: 'tinyint',
    comment: '性别   0 男  1  女  2 保密',
    default: 2
  })
  gender: number

  @Column({
    length: 40,
    comment: '所在国家',
    default: ''
  })
  country: string

  @Column({
    length: 40,
    comment: '省份',
    default: ''
  })
  province: string

  @Column({
    length: 40,
    comment: '城市',
    default: ''
  })
  city: string

  @OneToOne(type => User, (user: User) => user.profile)
  user:User
}
