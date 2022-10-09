/**
 * catgory model
 */
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Resource } from './resource'

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
