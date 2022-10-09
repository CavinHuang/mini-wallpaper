/**
 * catgory model
 */

import { Repo } from '@/core/decorator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Repo('ContentBanner')
@Entity()
export class ContentBanner {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: 'banner位置'
  })
  position: string

  @Column({
    length: 500,
    comment: 'image src'
  })
  cover: string

  @Column({
    length: 500,
    comment: 'link src'
  })
  link: string

  @Column({
    length: 200,
    comment: 'title'
  })
  title: string

  @Column({
    length: 200,
    comment: 'background'
  })
  background: string

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: number

  @Column({
    type: 'int',
    default: 1
  })
  sort: number

  @Column({
    type: 'tinyint',
    default: 0
  })
  is_deleted: boolean

  @Column({
    type: 'datetime'
  })
  create_at: Date

  @Column({
    type: 'datetime'
  })
  update_at: Date
}
