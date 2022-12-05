/**
 * catgory model
 */

import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Posts } from './Posts'
import { Resource } from './resource'

@Repo('Category')
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: 'type'
  })
  type: string

  @Column({
    length: 200,
    comment: 'name'
  })
  name: string

  @Column({
    length: 200,
    comment: 'short name'
  })
  short_name: string

  @Column({
    length: 200,
    comment: 'covor'
  })
  cover: string

  @Column({
    length: 200,
    comment: 'keywords'
  })
  keywords: string

  @Column({
    length: 500,
    comment: 'keywords'
  })
  url: string

  @Column({
    length: 500,
    comment: 'description'
  })
  description: string

  @Column({
    comment: 'weigh'
  })
  sort: number

  @Column({
    comment: 'pid',
    default: 0
  })
  pid: number

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: number

  
  @ManyToMany(type => Resource, resource => resource.categories, { cascade: true, createForeignKeyConstraints: false })
  resources: Resource[]

  @ManyToMany(type => Posts, post => post.categories, { cascade: true, createForeignKeyConstraints: false })
  posts: Posts[]

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
