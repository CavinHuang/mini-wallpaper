/**
 * catgory model
 */

import { Repo } from '@/core/decorator'
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Resource } from './resource'

@Repo('ResourceTag')
@Entity()
export class ResourceTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: 'tag name'
  })
  tag_name: string

  @Column({
    length: 200,
    comment: 'remark'
  })
  remark: string

  @Column({
    default: 1
  })
  sort: number

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: number

  @ManyToMany(type => Resource, r => r.tags, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'resource_with_tag',
    joinColumns: [
      { name: 'tag_id' }
    ],
    inverseJoinColumns: [
      { name: 'resource_id' }
    ]
  })
  resources: Resource[]

  @Column({
    type: 'datetime'
  })
  create_at: Date

  @Column({
    type: 'datetime'
  })
  update_at: Date
}
