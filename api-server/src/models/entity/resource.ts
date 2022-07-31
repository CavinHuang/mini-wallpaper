/**
 * resource model
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: '资源的枚举值: image/video/audio'
  })
  type: string

  @Column({
    length: 200,
    comment: '资源的地址'
  })
  url: string

  @Column({
    comment: '排序值'
  })
  sort: number

  @Column({
    comment: '是否热门'
  })
  is_hot: boolean

  @Column({
    comment: '是否推荐'
  })
  is_recommend: boolean

  @Column({
    comment: '作者id'
  })
  author: number

  @Column({
    comment: '是否删除'
  })
  is_deleted: boolean

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
