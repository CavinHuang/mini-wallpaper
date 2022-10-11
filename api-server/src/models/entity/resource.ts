/**
 * resource model
 */

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Catgory } from './catgory'
import { Tag } from './tag'

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
    comment: 'name'
  })
  name: string

  @Column({
    length: 500,
    comment: 'info'
  })
  info: string

  @Column({
    length: 500,
    comment: '资源的地址'
  })
  url: string

  @Column({
    length: 500,
    comment: '资源的缩略图地址'
  })
  thumb_url: string

  @Column({
    length: 200,
    comment: '资源的上传方式, local/qiniu',
    default: 'local'
  })
  upload_type: string

  @Column({
    comment: '资源的单价',
    type: 'decimal'
  })
  price: number

  @Column({
    comment: '会员资源的单价',
    type: 'decimal'
  })
  vip_price: number

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

  @ManyToMany(type => Tag, tag => tag.resources, { cascade: true, createForeignKeyConstraints: false })
  tags: Tag[];

  @ManyToMany(type => Catgory, tag => tag.resources, { cascade: true, createForeignKeyConstraints: false })
  categories: Catgory[]

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
