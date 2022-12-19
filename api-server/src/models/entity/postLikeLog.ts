/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Posts } from './posts';
import { Resource } from './resource'
import { User } from './user';

@Repo('PostsLikeLog')
@Entity()
export class PostsLikeLog {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @ManyToOne(type => Posts, posts => posts.likes, { cascade: true, createForeignKeyConstraints: false })
  posts: Posts

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date
}
