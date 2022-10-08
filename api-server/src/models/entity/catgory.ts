/**
 * catgory model
 */

import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Resource } from './resource'

@Entity()
export class Catgory {
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
  covor: string

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
  weigh: number

  @Column({
    length: 200,
    comment: 'type_text'
  })
  type_text: string

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

  @ManyToMany(type => Resource, r => r.categories, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'resource_with_tag',
    joinColumns: [
      { name: 'category_id' }
    ],
    inverseJoinColumns: [
      { name: 'resource_id' }
    ]
  })
  resources: Resource[]

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime'
  })
  update_at: Date
}
