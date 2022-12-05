/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Resource } from './resource'
import { User } from './user';

@Repo('UserCollection')
@Entity()
export class UserCollection {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @Column({
    comment: '类型关联的id'
  })
  relation_id: number

  @Column({
    comment: '类型: resource post'
  })
  type: string

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date

  
  @Column({
    type: 'datetime',
    nullable: true
  })
  delete_at: Date
}
