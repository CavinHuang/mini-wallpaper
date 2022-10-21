/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Resource } from './resource'

@Repo('ResourceLikeLog')
@Entity()
export class ResourceLikeLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index()
  resource_id: number

  @Column({
    comment: '点赞人'
  })
  user_id: number

  @ManyToMany(type => Resource, resource => resource.likes, { cascade: true, createForeignKeyConstraints: false })
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
