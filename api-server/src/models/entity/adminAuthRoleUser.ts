import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Repo('AdminRole')
@Entity({})
@Index(['role_id', 'user_id'], { unique: true })
@Index('role_id', { unique: true })
@Index('user_id', { unique: true })
export class AdminAuthRole {
  @Column({
    unsigned: true,
    comment: '角色id'
  })
  role_id: number

  @Column({
    unsigned: true,
    comment: '用户id'
  })
  user_id: number
}