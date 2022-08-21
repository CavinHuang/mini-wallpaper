import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Repo('AdminUser')
@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: '登录名',
    nullable: false
  })
  username: string

  @Column({
    comment: '登录密码',
    nullable: false
  })
  password: string

  @Column({
    comment: '昵称'
  })
  nickname: string

  @Column({
    comment: '加密盐'
  })
  slat: string

  @Column({
    comment: '是否是超级管理'
  })
  is_super: boolean

  @Column({
    comment: '状态'
  })
  status: number

  @CreateDateColumn({
    comment: '创建时间'
  })
  create_at: Date

  @UpdateDateColumn({
    comment: '最后更新时间'
  })
  update_at: Date

  @Column({
    comment: '最后操作人'
  })
  last_action_user: number
}