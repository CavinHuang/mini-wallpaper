/**
 * user model
 */

import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Repo('MiniProgram')
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

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime'
  })
  update_at: Date

  @Column({
    comment: '删除时间',
    default: null
  })
  delete_at: Date
}
