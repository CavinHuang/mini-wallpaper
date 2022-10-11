/**
 * catgory model
 */

import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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
    length: 20,
    comment: 'linkType'
  })
  linkType: string

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
