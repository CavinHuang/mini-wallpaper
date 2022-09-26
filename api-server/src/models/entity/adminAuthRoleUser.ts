import { Repo } from "@/core/decorator";
import { Entity, Index, PrimaryColumn } from "typeorm";

// @Index('role_id', { unique: true })
// @Index('user_id', { unique: true })
@Repo('AdminAuthRoleUser')
@Entity()
@Index(['role_id', 'user_id'])
export class AdminAuthRoleUser {
  @PrimaryColumn({
    unsigned: true,
    comment: '角色id'
  })
  @Index()
  role_id: number

  @PrimaryColumn({
    unsigned: true,
    comment: '用户id'
  })
  @Index()
  user_id: number
}