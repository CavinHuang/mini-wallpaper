/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @ManyToOne(type => Resource, resource => resource.likes, { cascade: true, createForeignKeyConstraints: false })
  resources: Resource

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date
}
