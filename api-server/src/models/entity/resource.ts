/**
 * resource model
 */

import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './catgory'
import { Tag } from './tag'
import { ArrayStringTransformer } from '../transformer/arrayString';
import { ResourceLikeLog } from './resourceLikeLog';

@Repo('Resource')
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
    type: 'text',
    comment: '资源的地址',
    transformer: new ArrayStringTransformer([])
  })
  url: string[]

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
    comment: '点赞数',
  })
  like_num: number

  @Column({
    comment: '下载数',
  })
  download_num: number

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
    comment: '是否被置顶',
    default: 0,
    type: 'tinyint'
  })
  is_top: boolean

  @Column({
    comment: '作者id'
  })
  author: number

  @Column({
    comment: '状态 1 投稿成功 2 审核通过 3 驳回',
    default: 1
  })
  status: number

  @ManyToMany(type => Tag, tag => tag.resources, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'resource_with_tag',
    joinColumns: [
      { name: 'tag_id' }
    ],
    inverseJoinColumns: [
      { name: 'resource_id' }
    ]
  })
  tags: Tag[];

  @OneToMany(type => ResourceLikeLog, like => like.resources, { createForeignKeyConstraints: false })
  likes: ResourceLikeLog[];

  @ManyToMany(type => Category, cate => cate.resources, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'resource_with_category',
    joinColumns: [
      { name: 'category_id' }
    ],
    inverseJoinColumns: [
      { name: 'resource_id' }
    ]
  })
  categories: Category[]

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime'
  })
  update_at: Date

  @Column({
    type: 'datetime',
    nullable: true
  })
  delete_at: Date
}
