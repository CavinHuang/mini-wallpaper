/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Resource } from './resource'
import { Posts } from './Posts';

@Repo('Tag')
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: '标签类型：比如资源标签、文章标签、商品标签'
  })
  type: string

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

  @ManyToMany(type => Resource, resource => resource.tags, { cascade: true, createForeignKeyConstraints: false })
  resources: Resource[]

  @ManyToMany(type => Posts, post => post.tags, { cascade: true, createForeignKeyConstraints: false })
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
