/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Resource } from './resource'
import { User } from './user';

@Repo('LikeLog')
@Entity()
export class LikeLog {
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
    comment: '类型: resource'
  })
  type: 'post' | 'resource'

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date
}
