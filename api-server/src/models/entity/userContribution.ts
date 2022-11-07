/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Resource } from './resource'
import { User } from './user';

@Repo('UserContribution')
@Entity()
export class UserContribution {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @OneToOne(type => Resource, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'resource_id'
  })
  resources: Resource

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
