/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Resource } from './resource'
import { User } from './user';

@Repo('ResourceLikeLog')
@Entity()
export class ResourceLikeLog {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @ManyToOne(type => Resource, resource => resource.likes, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'resource_id'
  })
  resources: Resource

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date
}
