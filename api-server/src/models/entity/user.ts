/**
 * user model
 */

import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer';
import { UserProfile } from './userProfile';
import { Repo } from '@/core/decorator';
import { UserCreator } from './userCreator';

@Repo('User')
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: '父级pid',
    type: 'int',
    default: 0
  })
  pid: number

  @Column({
    comment: '所属组',
    type: 'int',
    default: 0
  })
  group_id: number

  @Column({
    comment: '用户VIP等级',
    default: 0
  })
  vip_level: number

  @Column({
    comment: '所属角色',
    type: 'int',
    default: 0
  })
  role: number

  @Column({
    length: 200,
    comment: '用户名'
  })
  username: string

  @Exclude()
  @Column({
    length: 200,
    comment: '用户密码',
    nullable: true
  })
  password: string

  @Exclude()
  @Column({
    length: 200,
    comment: '加密盐',
    nullable: true
  })
  salt: string

  @Column({
    length: 200,
    comment: '用户手机号',
    nullable: true
  })
  mobile: string

  @Column({
    comment: '积分',
    default: 0
  })
  score: number

  @OneToOne(() => UserProfile, profile => profile.user, {
    cascade: true
  })
  @JoinColumn()
  profile: UserProfile

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: number

  @OneToOne(() => UserCreator, creator => creator.user)
  creator: UserCreator

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
